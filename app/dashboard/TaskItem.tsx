"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface TaskItemProps {
  id: number;
  title: string;
}

export default function TaskItem({ id, title }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Eliminar tarea
  const handleDelete = async () => {
    if (!confirm("¿Seguro que quieres eliminar esta tarea?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al eliminar la tarea");
      } else {
        router.refresh();
      }
    } catch {
      setError("Error al eliminar la tarea");
    } finally {
      setLoading(false);
    }
  };

  // Guardar edición
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title: editTitle })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al actualizar la tarea");
      } else {
        setIsEditing(false);
        router.refresh();
      }
    } catch {
      setError("Error al actualizar la tarea");
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleEdit} className="flex flex-col gap-2 items-center bg-white p-4 rounded-lg shadow w-64">
        <input
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          disabled={loading}
          required
        />
        <div className="flex gap-2 w-full">
          <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 flex-1" disabled={loading}>
            Guardar
          </button>
          <button type="button" className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 flex-1" onClick={() => setIsEditing(false)} disabled={loading}>
            Cancelar
          </button>
        </div>
        {error && <span className="text-red-500 mt-2">{error}</span>}
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 bg-orange-50 p-4 rounded-lg shadow w-64 hover:shadow-md transition">
      <span className="text-gray-800 font-medium text-center">{title}</span>
      <div className="flex gap-2 w-full">
        <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex-1" onClick={() => setIsEditing(true)} disabled={loading}>
          Editar
        </button>
        <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex-1" onClick={handleDelete} disabled={loading}>
          Eliminar
        </button>
      </div>
      {error && <span className="text-red-500 mt-2">{error}</span>}
    </div>
  );
}
