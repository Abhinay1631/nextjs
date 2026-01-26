"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function CreateBlogPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const searchParams = useSearchParams()
  const blogId = searchParams.get('id')

  useEffect(() => {
    if (blogId) {
      const token = localStorage.getItem("token")
      fetch(`http://localhost:3001/blogs/${blogId}`, { // Assuming generic GET /blogs/:id exists or needs to be added? 
        // Wait, I didn't verify if GET /blogs/:id exists for fetching single blog details.
        // The implementation plan implies fetching details. 
        // Let's assume for a moment it might not work if the endpoint is missing, but usually CRUD implies it.
        // Actually, looking at previous files, BlogsController had findAllByUser. 
        // I might need to add GET /blogs/:id to backend if it doesn't default exist.
        // Let's check backend controller again or just add client logic and see.
        // Backend changes only added PATCH. 
        // I should probably check if GET /blogs/:id exists.
        // Let me proceed with client code assuming standard REST, and if it fails I'll fix backend.
        // Actually, viewing BlogsController previously: 
        // @Get('my-blogs'), @Get('all-debug'). No param get.
        // I need to add GET /blogs/:id to backend too!
        // I'll add that to the plan/execution.
      })
    }
  }, [blogId])

  // Wait, I should verify backend first or during this.
  // I will write the component assuming the endpoint involves.

  // Let me Re-read BlogsController ...
  // It has create, findAllByUser, findAllDebug, update. NO findOne.
  // I MUST ADD `findOne` to Backend.

  // OK, I'll update this component to support the UI, and then immediately go fix the backend.

  useEffect(() => {
    if (blogId) {
      const fetchBlog = async () => {
        const token = localStorage.getItem("token")
        try {
          const res = await fetch(`http://localhost:3001/blogs/${blogId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (res.ok) {
            const data = await res.json()
            setTitle(data.title)
            setContent(data.content)
          }
        } catch (err) {
          console.error("Failed to load blog", err)
        }
      }
      fetchBlog()
    }
  }, [blogId])

  const handleSave = async (status: 'draft' | 'published') => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token")
      const method = blogId ? "PATCH" : "POST"
      const url = blogId
        ? `http://localhost:3001/blogs/${blogId}`
        : "http://localhost:3001/blogs"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, status }),
      })

      if (res.ok) {
        alert(status === 'published' ? "Blog published successfully!" : "Draft saved successfully!")
        if (status === 'published') {
          router.push("/dashboard/menu/blogs")
        } else {
          router.push("/dashboard/menu/drafts")
        }
      } else {
        const errorData = await res.json();
        alert(`Failed to save: ${errorData.message || res.statusText}`)
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">{blogId ? "Edit Blog" : "Create Blog"}</h1>

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

        <div className="flex gap-4">
          <button
            onClick={() => handleSave('draft')}
            disabled={loading}
            className="flex-1 px-6 py-2 rounded-lg border border-pink-500 text-pink-400 hover:bg-pink-500/10 transition"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={loading}
            className="flex-1 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition"
          >
            {blogId ? "Update & Publish" : "Publish Blog"}
          </button>
        </div>
      </div>
    </div>
  )
}
