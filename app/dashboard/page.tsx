import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import NewTaskForm from './NewTaskForm';
import TaskItem from './TaskItem';
import LogoutButton from './LogoutButton';

const prisma = new PrismaClient();

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    console.log('[DASHBOARD] session:', session);

    if (!session?.user?.email) {
        redirect('/login');
    }

    const tasks = await prisma.task.findMany({
        where: { 
            user: { 
                email: session.user.email 
            } 
        }
    });

    return (
        <div className="min-h-screen p-6 bg-orange-100">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-orange-600">ADMINISTRADOR DE TAREAS</h1>
                <LogoutButton />
            </div>
            <p className="text-gray-700 mb-4">Bienvenido, {session.user.name}!  Aqui podras gestionar tus tareas</p>
            <NewTaskForm />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tasks.map((t: { id: number; title: string }) => (
                    <TaskItem key={t.id} id={t.id} title={t.title} />
                ))}
            </div>
        </div>
    );
}