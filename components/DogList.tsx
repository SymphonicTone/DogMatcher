"use client";

import { useEffect, useState } from "react";
import {
  fetchDogBreeds,
  fetchDogsByIds,
  fetchDogIds,
  fetchDogMatch,
} from "@/app/api/dogApi";
import Dog, { SortOption } from "@/app/types";
import Image from "next/image";
import BreedSelector from "./BreedSelector";
import MatchModal from "./MatchModal";

export default function DogList() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [nextQuery, setNextQuery] = useState<number>(0);
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const [dogBreeds, setDogBreeds] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("breed:asc");
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [favoriteDogIds, setFavoriteDogIds] = useState<string[]>([]);
  const [dogMatch, setDogMatch] = useState<Dog>();
  const [isOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const data = await fetchDogBreeds();
        setDogBreeds(data);
      } catch (error) {
        console.error("Error fetching dog breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  const loadDogs = async (
    sort: SortOption,
    query: number,
    breeds: string[],
    filter: boolean = false
  ) => {
    try {
      const { resultIds, totalDogs } = await fetchDogIds(sort, query, breeds);
      setTotalDogs(totalDogs);

      const dogsData = await fetchDogsByIds(resultIds);

      if (filter) {
        setDogs(dogsData);
      } else {
        setDogs((prevDogs) => [...prevDogs, ...dogsData]);
      }

      setNextQuery(query + 25);
    } catch (error) {
      console.error("Failed to load dogs: " + error);
    }
  };

  const paginateDogs = () => {
    loadDogs(sort, nextQuery, selectedBreeds);
  };

  const favoriteDog = (dogId: string) => {
    if (favoriteDogIds.includes(dogId)) {
      setFavoriteDogIds(favoriteDogIds.filter((id) => id != dogId));
    } else {
      setFavoriteDogIds((prevIds) => [...prevIds, dogId]);
    }
  };

  const findMatch = async () => {
    const match = await fetchDogMatch(favoriteDogIds);
    setDogMatch(match[0]);
  };

  useEffect(() => {
    loadDogs(sort, nextQuery, selectedBreeds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dogMatch) {
      setModalOpen(true);
    }
  }, [dogMatch]);

  return (
    <div>
      <div className="w-full mb-4">
        <button
          onClick={findMatch}
          className={`fixed bottom-5 right-5 bg-black border-gray-500 p-5 rounded-md  transition duration-300 ${
            favoriteDogIds.length === 0 ? "bg-gray-500" : "hover:bg-blue-500"
          }`}
          disabled={favoriteDogIds.length === 0}
        >
          {favoriteDogIds.length === 0 ? "Pick some Dogs!" : "Find Match"}
        </button>
        <BreedSelector
          breeds={dogBreeds}
          sort={sort}
          setSort={setSort}
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
          loadDogs={loadDogs}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dogMatch && isOpen && (
          <MatchModal
            dogMatch={dogMatch}
            onClose={() => setModalOpen(false)}
            isOpen={isOpen}
          />
        )}
        {dogs.map((dog: Dog) => (
          <div
            key={dog.id}
            className={`rounded-lg p-4 shadow-lg transition duration-300 ${
              favoriteDogIds.includes(dog.id) ? "border-2 border-pink-500" : ""
            }`}
            onClick={() => favoriteDog(dog.id)}
          >
            <Image
              src={dog.img}
              alt={dog.name}
              width={500}
              height={500}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="mt-2 text-xl font-semibold text-center text-pink-500">
              {dog.name} -{" "}
              {dog.age === 0 ? "Under 1 year old" : dog.age + " years old"}
            </h3>
            <p className="text-gray-600 text-center">
              {dog.breed} - Zip Code {dog.zip_code}
            </p>
          </div>
        ))}
      </div>
      {totalDogs > nextQuery && (
        <div className="w-full text-center mt-5">
          <button
            className="bg-black border-2 border-gray-500 w-48 transition duration-300 hover:border-white text-white px-4 py-2 rounded"
            onClick={() => paginateDogs()}
            disabled={nextQuery >= totalDogs}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
