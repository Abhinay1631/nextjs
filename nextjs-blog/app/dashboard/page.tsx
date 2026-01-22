export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome! You have successfully logged in.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="p-4 border rounded">
          <h2 className="font-semibold">My Profile</h2>
          <p>View and edit your profile</p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold">My Blogs</h2>
          <p>Manage your blog posts</p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold">Create Blog</h2>
          <p>Write a new blog post</p>
        </div>
      </div>
    </div>
  )
}
