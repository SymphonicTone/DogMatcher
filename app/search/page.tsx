"use client";

import { useEffect, useState } from "react";
import { getDogBreeds, fetchDogsByIds, fetchDogIds } from "../api/dogApi";
import Dog from "../types";

export default function Search() {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadDogs = async () => {
      try {
        setLoading(true);
        const dogIds = await fetchDogIds(25, "breed:asc");
        const dogsData = await fetchDogsByIds(dogIds);

        setDogs(dogsData);
      } catch (error) {
        console.error("Failed to load dogs: " + error);
      } finally {
        setLoading(false);
      }
    };

    loadDogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("dogBreeds", dogBreeds);
  console.log("dogs", dogs);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Available Dogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dogs.map((dog: Dog) => (
            <div key={dog.id} className="border rounded-lg p-4 shadow-lg">
              <img
                src={dog.img}
                alt={dog.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="mt-2 text-xl font-semibold">{dog.name}</h3>
              <p className="text-gray-600">{dog.breed}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
