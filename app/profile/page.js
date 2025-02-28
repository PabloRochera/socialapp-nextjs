'use client'
import { useEffect, useState } from "react"
import Image from "next/image"

export default function ProfilePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  // Reemplaza con el ID real del usuario (por ejemplo, obtenido de la sesión)
  const currentUserId = "currentUserId"

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const res = await fetch("/api/user/posts")
        if (!res.ok) throw new Error("Error al obtener tus publicaciones")
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserPosts()
  }, [])

  const openImageModal = (url) => {
    setSelectedImage(url)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Mi Perfil</h1>
      {loading ? (
        <p className="text-center text-gray-600">Cargando tu perfil...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-600">No has subido ninguna imagen todavía.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map(post => (
            <div 
              key={post.post_id} 
              className="relative h-48 cursor-pointer" 
              onClick={() => openImageModal(post.url)}
            >
              <Image
                src={post.url}
                alt={post.content}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
              />
            </div>
          ))}
        </div>
      )}
      {/* Modal para imagen ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" 
          onClick={closeImageModal}
        >
          <div className="relative w-11/12 max-w-4xl">
            <Image 
              src={selectedImage} 
              alt="Imagen ampliada" 
              width={800} 
              height={600} 
              className="object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}
