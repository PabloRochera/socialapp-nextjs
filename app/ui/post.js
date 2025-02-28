'use client'
import { useState } from "react"
import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import LikeButton from "./like-button"
import CommentSection from "./comment-section"

export default function Post({ user_id, post, isLikedInitial }) {
  const [showComments, setShowComments] = useState(false);

  function toggleComments() {
    setShowComments(prev => !prev);
  }

  async function handleDelete() {
    const confirmed = confirm("¿Estás seguro de eliminar esta publicación?");
    if (!confirmed) return;

    try {
      const res = await fetch("/api/delete-post", {
        method: "POST",
        body: JSON.stringify({ post_id: post.post_id }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        alert("Publicación eliminada exitosamente.");
        // Opcional: recargar la página o actualizar el estado global
        window.location.reload();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la publicación.");
    }
  }

  return (
    <div className="flex flex-col max-w-sm gap-2">
      <div className="flex gap-2 items-center">
        <Image 
          src={post.picture} 
          alt="Avatar" 
          className="rounded-full" 
          width={24} 
          height={24} 
        />
        <span>{post.username}</span>
        <span>1 dia</span>
      </div>

      <div>
        <Link href={`/post/${post.post_id}`}>
          <Image 
            src={post.url} 
            alt="Imagen de la publicación" 
            width={284} 
            height={284} 
          />
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <LikeButton post_id={post.post_id} user_id={user_id} isLikedInitial={isLikedInitial} />
          <ChatBubbleLeftIcon className="w-8" />
        </div>
        {/* Mostrar botón de eliminar solo si el usuario es el dueño de la publicación */}
        {user_id === post.user_id && (
          <button 
            onClick={handleDelete} 
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            Eliminar
          </button>
        )}
      </div>

      <div>
        <p>
          <span className="font-bold">{post.username}</span> {post.content}
        </p>
      </div>

      <div>
        <button onClick={toggleComments} className="text-blue-600">
          {showComments ? "Ocultar comentarios" : "Ver comentarios"}
        </button>
      </div>

      <CommentSection post_id={post.post_id} showList={showComments} />
    </div>
  );
}
