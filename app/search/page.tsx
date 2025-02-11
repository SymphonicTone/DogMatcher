"use client";

import DogList from "@/components/DogList";
import { Comic_Neue } from "next/font/google";

const firaSans = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Search() {
  const handleLogout = async () => {
    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/auth/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      window.location.href = "/";
    } else {
      console.error("login failed");
    }
  };
  return (
    <>
      <ul className="w-full flex flex-row gap-12 justify-center bg-pink-500">
        <li>Adopt</li>
        <li>Volunteer</li>
        <li>Foster</li>
        <li>Shop</li>
        <li>About</li>
        <li>Events</li>
        <li>Donate</li>
        <li className="cursor-pointer" onClick={handleLogout}>
          Logout
        </li>
      </ul>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className={`text-9xl ${firaSans.className} w-full text-center`}>
            Find your furever d🐶g!
          </h1>

          <DogList />
        </main>
      </div>
    </>
  );
}
