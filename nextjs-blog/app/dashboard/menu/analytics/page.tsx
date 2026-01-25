"use client"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Analytics</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Stat title="Total Views" value="2.4k" />
        <Stat title="Likes" value="320" />
        <Stat title="Comments" value="89" />
      </div>
    </div>
  )
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/10 border border-white/20 text-center hover:scale-105 transition">
      <p className="text-gray-300">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}
