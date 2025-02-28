export default function LandingPage() {
    return (
      <div className="min-h-screen relative">
        {/* Fondo de imagen */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }} // Reemplaza por la ruta de tu imagen
        ></div>
        {/* Overlay gris difuminado */}
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        {/* Contenido centrado */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-6xl font-extrabold text-white uppercase tracking-wide drop-shadow-lg">
            ACCEDE A MI SOCIAL APP
          </h1>
        </div>
      </div>
    );
  }
  