"use client"

export default function MyBlogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">My Blogs</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {["How I started blogging", "Top 10 writing tips", "Next.js Journey"].map(
          (title, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/10 border border-white/20 hover:border-pink-400 hover:scale-[1.02] transition"
            >
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-gray-300 mt-2">
                Click to view, edit or delete this blog
              </p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
