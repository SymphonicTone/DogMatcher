import { useState } from "react";
import { Fira_Sans } from "next/font/google";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function LoginForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email }),
      }
    );

    if (response.ok) {
      window.location.href = "/search";
    } else {
      console.error("login failed");
    }
  };

  return (
    <div
      className={`border-[1px] border-white p-12 rounded-lg backdrop-blur-2xl w-96 ${firaSans.className}`}
    >
      <h1 className="text-5xl text-center mb-4">Sign In</h1>
      <p className="text-center">There&apos;s a Pup waiting for you!</p>
      <form onSubmit={handleLogin} className="grid grid-cols-1 gap-6">
        <div className="relative">
          <input
            type="text"
            id="name"
            placeholder=""
            className="peer w-full px-2 pt-5 pb-2 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label
            htmlFor="name"
            className="absolute left-2 peer-placeholder-shown:text-white peer-placeholder-shown:text-base transition-all duration-200 ease-in-out 
                   peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-sm text-sm peer-focus:text-black text-black"
          >
            Name
          </label>
        </div>
        <div className="relative">
          <input
            type="email"
            id="email"
            placeholder=""
            className="peer w-full px-2 pt-5 pb-2 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label
            htmlFor="email"
            className="absolute left-2 peer-placeholder-shown:text-white peer-placeholder-shown:text-base transition-all duration-200 ease-in-out 
                   peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-sm text-sm peer-focus:text-black text-black"
          >
            Email
          </label>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="w-1/2 relative py-2 text-white font-semibold rounded-lg border-2 border-transparent
                   hover:border-blue-500 hover:text-blue-500 focus:outline-none transition-all duration-300"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
