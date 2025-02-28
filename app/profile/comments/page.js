import { getAllComments } from "@/app/lib/actions";

export default async function CommentsPage() {
  const comments = await getAllComments();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Comentarios
      </h1>
      {comments.length === 0 ? (
        <p className="text-center text-gray-600">No hay comentarios para mostrar.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.comment_id} className="bg-white shadow-sm rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              {/* Mostrar la foto del usuario si está disponible */}
              {comment.picture && (
                <img
                  src={comment.picture}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                />
              )}
              <div>
                <span className="font-semibold text-gray-800">{comment.username}</span>
                <span className="block text-xs text-gray-500">
                  {new Date(comment.created_at).toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
