'use client'

import { useState, useEffect } from "react";
import { getComments } from "../lib/actions";
import { useRouter } from "next/navigation";

export default function CommentSection({ post_id, showList }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const router = useRouter();
  // Reemplaza este valor con el ID real del usuario autenticado.
  const currentUserId = "currentUserId";

  useEffect(() => {
    if (showList) {
      async function fetchComments() {
        const data = await getComments(post_id);
        setComments(data);
      }
      fetchComments();
    }
  }, [post_id, showList]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post_id", post_id);
    formData.append("content", content);
    
    await fetch("/api/insert-comment", {
      method: "POST",
      body: formData
    });
    
    setContent("");
    router.refresh();
  }

  async function handleDeleteComment(comment_id, commentUserId) {
    if (currentUserId !== commentUserId) {
      alert("No tienes permiso para eliminar este comentario.");
      return;
    }
    const confirmed = confirm("¿Estás seguro de eliminar este comentario?");
    if (!confirmed) return;
    try {
      const res = await fetch("/api/delete-comment", {
        method: "POST",
        body: JSON.stringify({ comment_id }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        alert("Comentario eliminado.");
        router.refresh();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el comentario.");
    }
  }

  return (
    <div className="mt-4">
      {showList && (
        <div>
          <h3 className="font-bold">Comentarios</h3>
          <div>
            {comments.map(c => (
              <div key={c.comment_id} className="py-1 border-b flex items-center justify-between">
                <p className="text-sm">
                  <span className="font-bold">{c.username}:</span> {c.content}
                </p>
                {currentUserId === c.user_id && (
                  <button 
                    onClick={() => handleDeleteComment(c.comment_id, c.user_id)}
                    className="text-red-600 hover:text-red-800 transition-colors ml-2 text-xs"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Formulario para añadir comentario, siempre visible */}
      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <input 
          type="text" 
          placeholder="Añadir comentario" 
          className="flex-grow border p-1"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 px-3 text-white">
          Enviar
        </button>
      </form>
    </div>
  );
}
