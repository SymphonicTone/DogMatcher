import { useState } from "react";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      console.log("login success");
      window.location.href = "/search";
    } else {
      console.error("login failed");
    }
  };

  return (
    <div className="border-2 p-12 rounded-lg">
      <h1 className="text-3xl text-center mb-4">
        Theres a Pup waiting for you
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="relative">
          <input
            type="text"
            id="name"
            className="peer w-full px-2 pt-5 pb-2 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label
            htmlFor="name"
            className="absolute left-2 top-5 text-white text-base transition-all duration-200 ease-in-out 
                   peer-placeholder-shown:top-10 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Name
          </label>
        </div>
        <div className="relative">
          <input
            type="email"
            id="email"
            className="peer w-full px-2 pt-5 pb-2 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label
            htmlFor="email"
            className="absolute left-2 top-5 text-white text-base transition-all duration-200 ease-in-out 
                   peer-placeholder-shown:top-10 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
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
