"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect if not logged in
      return;
    }

    fetch('http://localhost:3001/blogs/my-blogs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        // Filter for drafts
        const draftBlogs = data.filter((blog: any) => blog.status === 'draft');
        setDrafts(draftBlogs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch drafts', err);
        setLoading(false);
      });
  }, [router]);

  const handlePublish = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:3001/blogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'published' })
      });

      if (res.ok) {
        // Remove the published draft from the list
        setDrafts(drafts.filter(d => d._id !== id));
        alert("Blog published successfully!");
      } else {
        alert("Failed to publish blog");
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Error publishing blog");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this draft?")) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:3001/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setDrafts(drafts.filter(d => d._id !== id));
        alert("Draft deleted successfully");
      } else {
        alert("Failed to delete draft");
      }
    } catch (error) {
      console.error("Error deleting draft", error);
      alert("Error deleting draft");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Drafts</h1>

      {loading ? (
        <p>Loading drafts...</p>
      ) : drafts.length === 0 ? (
        <p>No drafts found.</p>
      ) : (
        <div className="space-y-4">
          {drafts.map((draft) => (
            <div
              key={draft._id}
              className="p-5 rounded-xl bg-white/10 border border-white/20 hover:border-indigo-400 transition flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{draft.title}</h2>
                <p className="text-gray-300">{draft.content.substring(0, 100)}...</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/dashboard/menu/create?id=${draft._id}`)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(draft._id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
