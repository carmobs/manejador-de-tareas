// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-orange-100">
      <h1 className="text-4xl font-bold mb-4 text-orange-600">Gestor de Tareas</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Bienvenido a tu gestor de tareas. Organiza tus pendientes y mejora tu productividad.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/login" 
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
        >
          Iniciar Sesión
        </Link>
        <Link 
          href="/register" 
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
        >
          Registrarse
        </Link>
      </div>
    </main>
  );
}