"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    fetch("http://localhost:3001/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setUser)
  }, [])

  if (!user) return <div>Loading profile...</div>

  return (
    <div>
      <button onClick={() => router.push("/dashboard")}>← Back</button>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>@{user.username}</p>
    </div>
  )
}
