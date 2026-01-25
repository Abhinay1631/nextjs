"use client"

export default function DraftsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Drafts</h1>

      <div className="space-y-4">
        {["Unfinished Story", "React Notes"].map((draft, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-white/10 border border-white/20 hover:border-indigo-400 transition"
          >
            <h2 className="text-lg font-semibold">{draft}</h2>
            <p className="text-gray-300">Continue editing this draft</p>
          </div>
        ))}
      </div>
    </div>
  )
}
