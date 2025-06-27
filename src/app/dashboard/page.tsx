"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type UserWithRole = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/login");
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  const user = session.user as UserWithRole;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.name}</h1>
        <p className="mb-2">Rol: <span className="font-semibold">{user.role}</span></p>
        {user.role === "GERENTE" ? (
          <div>
            <p className="mb-4">Panel de Gerente</p>
            <ul className="text-left list-disc ml-6">
              <li>Definir presupuestos</li>
              <li>Asignar recursos</li>
              <li>Ver reportes globales</li>
            </ul>
          </div>
        ) : (
          <div>
            <p className="mb-4">Panel de Equipo Técnico</p>
            <ul className="text-left list-disc ml-6">
              <li>Registrar horas y costos</li>
              <li>Ver tareas asignadas</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
