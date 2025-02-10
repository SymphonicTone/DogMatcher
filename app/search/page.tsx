"use client";

import DogList from "@/components/DogList";
import { Arimo } from "next/font/google";

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Search() {
  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className={`text-9xl ${arimo.className} w-full text-center`}>
            Find your forever dog
          </h1>
          <DogList />
        </main>
      </div>
    </>
  );
}
