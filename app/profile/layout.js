import Link from "next/link"

export default function ProfileLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-12 px-4">
      {/* Header Superior */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-lg">
          <nav className="flex space-x-8">
            <Link 
              href="/profile" 
              className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200"
            >
              Perfil
            </Link>
            <Link 
              href="/profile/likes" 
              className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200"
            >
              Me gusta
            </Link>
            <Link 
              href="/profile/comments" 
              className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200"
            >
              Comentarios
            </Link>
          </nav>
          <div>
            {/* Aquí podrías agregar un icono de usuario o enlace a configuraciones */}
          </div>
        </div>
      </header>
      {/* Contenido Principal */}
      <main className="max-w-6xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
