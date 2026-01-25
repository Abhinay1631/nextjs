"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log("LOGIN DATA:", formData); // 🔴 IMPORTANT

  const res = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier: formData.identifier, // ✅ FIX
      password: formData.password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Login failed");
    return;
  }

  localStorage.setItem("token", data.token);
  router.push("/dashboard");
};


  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:block">
        <Image
          src="/image.png"
          alt="Blog"
          fill
          className="object-cover"
          priority
        />
  
        <div className="absolute -inset-[5px] bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 animate-pulse"></div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-10 text-center">
          <h2 className="text-4xl font-extrabold mb-3">
            Welcome Back
          </h2>
          <p className="text-lg text-gray-200">
            Login and continue your journey 🚀
          </p>
        </div>
      </div>

      
      <div className="flex items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl px-10 py-12"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Login
            </h1>
            <p className="text-gray-500 mt-2">
              Access your dashboard 🚀
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-600 mb-2">
                Email or Username
              </label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full py-4 text-lg font-semibold text-white
            rounded-xl
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
            hover:opacity-90 transition"
          >
            Login
          </button>

          <p className="mt-6 text-center text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
