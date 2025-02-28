'use client'
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Search() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts") // Asegúrate de tener este endpoint configurado
        if (!res.ok) throw new Error("Error al obtener las publicaciones")
        const data = await res.json()
        setPosts(data)
        setFilteredPosts(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    if (!query) {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(
        posts.filter((post) => 
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.username.toLowerCase().includes(query.toLowerCase())
        )
      )
    }
  }, [query, posts])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Buscar Publicaciones
      </h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar por descripción o usuario..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Cargando publicaciones...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-gray-600">No se encontraron publicaciones.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.post_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
            >
              <div className="relative h-48">
                <Image
                  src={post.url || "/placeholder.png"}
                  alt={post.content}
                  fill
                  style={{ objectFit: "cover" }}
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm">{post.content}</p>
                <p className="text-gray-500 text-xs mt-1">Por {post.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
