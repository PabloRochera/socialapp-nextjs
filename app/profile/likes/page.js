'use client'
import { useEffect, useState } from "react"
import PostList from "../../ui/post-list"

export default function LikesPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Reemplaza con el ID real del usuario
  const currentUserId = "currentUserId"

  useEffect(() => {
    async function fetchLikedPosts() {
      try {
        const res = await fetch("/api/user/likes")
        if (!res.ok) throw new Error("Error al obtener tus likes")
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchLikedPosts()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Mis Likes</h1>
      {loading ? (
        <p className="text-center text-gray-600">Cargando tus likes...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-600">No has dado like a ninguna publicación.</p>
      ) : (
        <PostList
          posts={posts}
          user_id={currentUserId}
          // Marcamos todos los posts como "likeados"
          likes={posts.map(post => ({ post_id: post.post_id }))}
        />
      )}
    </div>
  )
}
