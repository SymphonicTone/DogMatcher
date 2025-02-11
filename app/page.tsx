"use client";

import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Image
        src="/huskies.png"
        alt="background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start z-10">
        <LoginForm />
      </main>
    </div>
  );
}
