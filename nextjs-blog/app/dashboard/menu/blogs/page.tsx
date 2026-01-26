"use client"
import { useState, useEffect } from "react"

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:3001/blogs/my-blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        if (Array.isArray(data)) {
          setBlogs(data)
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">My Blogs</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.length === 0 ? (
          <p>No blogs found. Create one!</p>
        ) : (
          blogs.map((blog, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/10 border border-white/20 hover:border-pink-400 hover:scale-[1.02] transition"
            >
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-300 mt-2 line-clamp-3">{blog.content}</p>
              <p className="text-xs text-gray-400 mt-4">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
