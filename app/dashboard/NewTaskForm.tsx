'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function NewTaskForm() {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error || 'Error al crear la tarea');
            } else {
                setTitle("");
                router.refresh(); // Refresca el dashboard para mostrar la nueva tarea
            }
        } catch {
            setError('Error al crear la tarea');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleCreate} className="mb-6 flex items-center gap-4 bg-orange-50 p-4 rounded-lg shadow">
            <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título de la tarea"
                className="border border-orange-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                disabled={loading}
            />
            <button 
                type="submit" 
                className={`px-4 py-2 rounded text-white ${
                    loading ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'
                }`} 
                disabled={loading}
            >
                {loading ? 'Añadiendo...' : 'Añadir Tarea'}
            </button>
            {error && <span className="text-red-500 ml-2">{error}</span>}
        </form>
    );
}
