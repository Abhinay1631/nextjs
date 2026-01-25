"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 text-white">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 bg-black/30 backdrop-blur-md border-b border-white/10 relative z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
          >
            ☰
          </button>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>

        <h2 className="text-lg font-semibold">Welcome Back 👋</h2>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition"
        >
          Logout
        </button>
      </nav>
      {/* OVERLAY */}
{menuOpen && (
  <div
    onClick={() => setMenuOpen(false)}
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity"
  />
)}

      {/* SIDE MENU */}
      <aside
  className={`fixed top-0 left-0 h-full w-80 z-40
  bg-gradient-to-b from-indigo-900 to-purple-900
  border-r border-white/10
  transform transition-transform duration-500
  ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
>



<div className="p-6 space-y-6">
  <h2 className="text-2xl font-bold mb-4">Menu</h2>

  <div className="space-y-5">
    {[
      {
        title: "My Profile",
        desc: "View & edit your profile",
        href: "/dashboard/menu/profile",

      },
      {
        title: "My Blogs",
        desc: "Manage all your posts",
        href: "/dashboard/menu/blogs",
      },
      {
        title: "Create Blog",
        desc: "Start writing a new blog",
        href: "/dashboard/menu/create",
      },
      {
        title: "Drafts",
        desc: "Continue unfinished blogs",
        href: "/dashboard/menu/drafts",
      },
      {
        title: "Analytics",
        desc: "Track views & engagement",
        href: "/dashboard/menu/analytics",
      },
    ].map((item, i) => (
      <Link
        key={i}
        href={item.href}
        onClick={() => setMenuOpen(false)}
        className="block" // closes menu on click
      >
      <div
        key={i}
        className="group rounded-xl p-5 bg-white/10 border border-white/20
        hover:border-pink-400 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]
        transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      >
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-300 mt-1">{item.desc}</p>
      </div>
      </Link>
    ))}
  </div>
</div>


      </aside>

      {/* MAIN CONTENT */}
      <main className="px-10 py-12 relative z-10">

        {/* HERO */}
        <div className="rounded-2xl p-10 bg-white/10 border border-white/20 shadow-xl mb-12">
          <h1 className="text-4xl font-extrabold mb-3">
            Share your ideas with the world 🌍
          </h1>
          <p className="text-gray-200 max-w-3xl">
            Write blogs, manage drafts, publish stories, and grow your audience —
            all from one beautiful dashboard.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            { title: "Total Blogs", value: "12", desc: "Published articles" },
            { title: "Drafts", value: "4", desc: "Work in progress" },
            { title: "Total Views", value: "2.4k", desc: "Audience reach" },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6 bg-white/10 border border-white/20
              hover:border-indigo-400 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]
              transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-sm text-gray-300">{item.title}</h3>
              <p className="text-3xl font-bold mt-2">{item.value}</p>
              <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* RECENT BLOGS */}
        <h2 className="text-2xl font-bold mb-6">Recent Blogs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl p-6 bg-white/10 border border-white/20
            hover:border-indigo-400 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]
            transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-lg font-bold">How I started blogging</h3>
            <p className="text-sm text-gray-300 mt-2">
              A personal journey into writing and creativity
            </p>
          </div>

          <div className="rounded-xl p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]
            transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-lg font-bold">
              Top 10 tips for writing better blogs
            </h3>
            <p className="text-sm text-gray-100 mt-2">
              Actionable advice to grow your audience
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
