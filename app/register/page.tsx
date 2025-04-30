'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en el registro");
      }

      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-orange-600">Registro</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              minLength={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded text-white ${
              loading ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'
            }`}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-orange-600 hover:underline">
            Inicia sesión, si es que ya tienes cuenta
          </Link>
        </div>

        <div className="mt-2 text-center">
          <Link href="/" className="text-orange-600 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}