"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaChartPie, FaExclamationTriangle, FaMoneyBillWave, FaUserTie, FaUsers, FaPlusCircle, FaFileInvoiceDollar, FaFileAlt } from "react-icons/fa";

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

  const user = session.user as any;
  const isAdmin = user.role === "ADMIN";

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-slate-700">
      {/* Sidebar navegación */}
      <aside className="hidden md:flex flex-col w-64 bg-white/95 border-r border-blue-100 shadow-lg min-h-screen py-8 px-4">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-blue-700 rounded-full p-2 mb-2">
            <FaUserTie className="text-white text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-blue-700">Konsultech</h2>
          <span className="text-xs text-gray-500">{isAdmin ? "Admin" : "Cliente"}</span>
        </div>
        <nav className="flex flex-col gap-4">
          <button onClick={() => router.push("/dashboard")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-700 font-semibold hover:bg-blue-50 transition">
            <FaChartPie /> Dashboard
          </button>
          <button onClick={() => router.push("/costos")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-700 font-semibold hover:bg-blue-50 transition">
            <FaPlusCircle /> Registro de Costos
          </button>
          <button onClick={() => router.push("/presupuestos")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-700 font-semibold hover:bg-blue-50 transition">
            <FaFileInvoiceDollar /> Presupuestos
          </button>
          <button onClick={() => router.push("/reportes")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-700 font-semibold hover:bg-blue-50 transition">
            <FaFileAlt /> Reportes
          </button>
        </nav>
        <div className="mt-auto pt-10 flex flex-col items-center">
          <button onClick={() => router.push("/api/auth/signout")}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            Cerrar sesión
          </button>
        </div>
      </aside>
      {/* Main dashboard */}
      <main className="flex-1 flex flex-col items-center py-10 px-2 w-full">
        <div className="w-full max-w-6xl">
          <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-white drop-shadow">Bienvenido, {user.name}</h1>
              <span className="text-blue-100 text-sm font-medium">Rol: {isAdmin ? "Admin" : "Cliente"}</span>
            </div>
          </header>
          {/* Tarjetas resumen */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <FaMoneyBillWave className="text-blue-700 text-3xl mb-2" />
              <span className="text-gray-500 text-xs">Gasto Real</span>
              <span className="text-2xl font-bold text-gray-800">$120,000</span>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <FaChartPie className="text-blue-700 text-3xl mb-2" />
              <span className="text-gray-500 text-xs">Gasto Planificado</span>
              <span className="text-2xl font-bold text-gray-800">$100,000</span>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <FaExclamationTriangle className="text-yellow-500 text-3xl mb-2" />
              <span className="text-gray-500 text-xs">Desviación</span>
              <span className="text-2xl font-bold text-gray-800">+20%</span>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <FaUsers className="text-blue-700 text-3xl mb-2" />
              <span className="text-gray-500 text-xs">Alertas activas</span>
              <span className="text-2xl font-bold text-gray-800">2</span>
            </div>
          </section>
          {/* Accesos rápidos */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div onClick={() => router.push("/costos")}
              className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow p-6 flex flex-col items-center transition group">
              <FaPlusCircle className="text-3xl mb-2 group-hover:scale-110 transition" />
              <span className="font-bold text-lg">Registrar Costos</span>
              <span className="text-xs text-blue-100 mt-1 text-center">Ingresa gastos del proyecto y actualiza los costos reales en tiempo real.</span>
            </div>
            <div onClick={() => router.push("/presupuestos")}
              className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow p-6 flex flex-col items-center transition group">
              <FaFileInvoiceDollar className="text-3xl mb-2 group-hover:scale-110 transition" />
              <span className="font-bold text-lg">Generar Presupuesto</span>
              <span className="text-xs text-blue-100 mt-1 text-center">Crea y gestiona presupuestos iniciales por fase o sprint.</span>
            </div>
            <div onClick={() => router.push("/reportes")}
              className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow p-6 flex flex-col items-center transition group">
              <FaFileAlt className="text-3xl mb-2 group-hover:scale-110 transition" />
              <span className="font-bold text-lg">Ver Reportes</span>
              <span className="text-xs text-blue-100 mt-1 text-center">Visualiza informes gráficos y tabulares sobre los costos y desviaciones.</span>
            </div>
          </section>
          {/* Gráficos y acciones por rol */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center min-h-[300px]">
              <h2 className="text-lg font-bold text-blue-700 mb-2">Costos por Fase del Proyecto</h2>
              <div className="w-full h-48 flex items-center justify-center text-gray-400">[Gráfico de barras aquí]</div>
              <p className="text-xs text-gray-500 mt-2 text-center">Visualiza en qué fases del ciclo de vida se concentran los gastos.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center min-h-[300px]">
              <h2 className="text-lg font-bold text-blue-700 mb-2">Costos por Sprint</h2>
              <div className="w-full h-48 flex items-center justify-center text-gray-400">[Gráfico de líneas aquí]</div>
              <p className="text-xs text-gray-500 mt-2 text-center">Monitorea el presupuesto y gasto real en cada sprint.</p>
            </div>
          </section>
          {/* Acciones y mensajes por rol */}
          <section className="mt-10">
            {isAdmin ? (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-blue-900 text-center shadow">
                <h3 className="text-lg font-bold mb-2">Acciones rápidas para Admin</h3>
                <ul className="flex flex-col gap-2 text-left max-w-md mx-auto">
                  <li>• Definir y ajustar presupuestos por fase o sprint</li>
                  <li>• Asignar recursos y aprobar gastos</li>
                  <li>• Analizar reportes globales y exportar datos</li>
                  <li>• Configurar alertas de desviación</li>
                </ul>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-blue-900 text-center shadow">
                <h3 className="text-lg font-bold mb-2">Acciones rápidas para Cliente</h3>
                <ul className="flex flex-col gap-2 text-left max-w-md mx-auto">
                  <li>• Registrar horas y costos por tarea o fase</li>
                  <li>• Consultar tareas asignadas y su presupuesto</li>
                  <li>• Visualizar alertas de sobrecostos en tu área</li>
                </ul>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
