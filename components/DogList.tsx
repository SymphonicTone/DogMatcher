"use client";

import { useEffect, useState } from "react";
import { getDogBreeds, fetchDogsByIds, fetchDogIds } from "@/app/api/dogApi";
import Dog from "@/app/types";
import Image from "next/image";

export default function DogList() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextQuery, setNextQuery] = useState<number>(0);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const data = await getDogBreeds();
        setDogBreeds(data);
      } catch (error) {
        console.error("Error fetching dog breeds:", error);
      } finally {
        setLoading(false);
      }
    };

    getBreeds();
  }, []);

  const loadDogs = async (query: number, breeds: string[]) => {
    try {
      setLoading(true);
      const resultIds = await fetchDogIds("breed:asc", query, breeds);

      const dogsData = await fetchDogsByIds(resultIds);

      setDogs((prevDogs) => [...prevDogs, ...dogsData]);
      setNextQuery((prev) => prev + 25);
    } catch (error) {
      console.error("Failed to load dogs: " + error);
    } finally {
      setLoading(false);
    }
  };

  const filterDogs = async (query: number, breeds: string[]) => {
    try {
      setLoading(true);
      const resultIds = await fetchDogIds("breed:asc", query, breeds);

      const dogsData = await fetchDogsByIds(resultIds);

      setDogs(dogsData);
      setNextQuery(0);
    } catch (error) {
      console.error("Failed to load dogs: " + error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreDogs = () => {
    loadDogs(nextQuery, selectedBreeds);
  };

  useEffect(() => {
    loadDogs(nextQuery, selectedBreeds);
  }, []);

  const handleBreedChange = (e) => {
    const isChecked = e.target.checked;
    const option = e.target.value;

    const selectedBreedSet = new Set(selectedBreeds);

    if (isChecked) {
      selectedBreedSet.add(option);
    } else {
      selectedBreedSet.delete(option);
    }

    const newSelectedBreeds = Array.from(selectedBreedSet);
    setSelectedBreeds(newSelectedBreeds);

    filterDogs(0, selectedBreeds);
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  console.log("selectedBreeds", selectedBreeds);
  return (
    <div>
      <div className="w-full mb-4">
        <label className="relative">
          <input type="checkbox" className="hidden peer" />
          {"Show the dropdown"}

          <div className="absolute bg-black border border-gray-200 transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
            <ul>
              {dogBreeds.map((breed, index) => {
                return (
                  <li key={index}>
                    <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                      <input
                        type="checkbox"
                        name={"Breeds"}
                        value={breed}
                        className="cursor-pointer"
                        onChange={handleBreedChange}
                      />
                      <span className="ml-1">{breed}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dogs.map((dog: Dog) => (
          <div key={dog.id} className="border rounded-lg p-4 shadow-lg">
            <Image
              src={dog.img}
              alt={dog.name}
              width={500}
              height={500}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="mt-2 text-xl font-semibold">{dog.name}</h3>
            <p className="text-gray-600">{dog.breed}</p>
          </div>
        ))}
        {nextQuery && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => loadMoreDogs()}
            disabled={nextQuery >= 10000} // remove this hardcode later
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
