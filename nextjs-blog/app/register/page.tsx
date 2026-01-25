"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { registerUser } from '@/lib/api';


export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    // 🔐 LIVE TOKEN STORAGE
    localStorage.setItem("token", data.token);

    alert("Registration successful 🎉");
    router.push("/login");
  } catch (error) {
    alert("Backend server not reachable");
  }
};



  return (
    <div className="h-[710px] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      <div className="relative hidden md:flex items-center justify-center bg-black h-full">
        <Image
          src="/image.png"
          alt="Blog illustration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center px-10">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Share Your Ideas
          </h2>
          <p className="text-gray-200 text-base">
            Write, publish, and inspire readers
          </p>
        </div>
      </div>

      {/* <div className="relative h-full bg-gradient-to-br from-gray-900 via-black to-gray-900"> */}
        <div className="absolute -inset-[5px] bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 animate-pulse"></div>

        <form
          onSubmit={handleSubmit}
          className="relative bg-white h-full pl-12 pr-0 py-20 shadow-2xl"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Create Account
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Join our blogging community 🚀
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
            <Input label="Username" name="username" value={formData.username} onChange={handleChange} />
            <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
            <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
            <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="px-4 py-2.5 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
            <Input label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
          </div>

          <div className="mt-4 flex items-center gap-3">
            {/* <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="h-4 w-4 accent-indigo-600"
            /> */}
            {/* <span className="text-gray-600 text-sm">
              I agree to the{" "}
              <span className="text-indigo-600 font-medium">
                Terms & Conditions
              </span>
            </span> */}
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-3 text-base font-semibold text-white
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
            hover:scale-[1.02] transition-all"
          >
           Register
          </button>

          <p className="mt-4 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    // </div>
  )
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string
  name: string
  value: string
  onChange: any
  type?: string
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="px-4 py-2.5 rounded-lg border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>
  )
}
