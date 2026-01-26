"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateBlogPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const router = useRouter()

  const handlePublish = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:3001/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      })

      if (res.ok) {
        alert("Blog published successfully!")
        router.push("/dashboard/menu/blogs")
      } else {
        const errorData = await res.json();
        alert(`Failed to publish blog: ${errorData.message || res.statusText}`)
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Create Blog</h1>

      <div className="max-w-3xl bg-white/10 p-6 rounded-xl border border-white/20 space-y-4">
        <input
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/40 border border-white/20 focus:outline-none"
        />

        <textarea
          placeholder="Write your blog..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full p-3 rounded-lg bg-black/40 border border-white/20 focus:outline-none"
        />

        <button
          onClick={handlePublish}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition"
        >
          Publish Blog
        </button>
      </div>
    </div>
  )
}
