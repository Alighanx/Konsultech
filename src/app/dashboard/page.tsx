"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import DemoButton from "./DemoButton";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChartPie, FaExclamationTriangle, FaMoneyBillWave, FaUserTie, FaUsers, FaPlusCircle, FaFileInvoiceDollar, FaFileAlt, FaCog, FaQuestionCircle } from "react-icons/fa";

// Componentes gráficos para dashboard
function CostosPorFase({ costos, presupuestos }: { costos: any[]; presupuestos: any[] }) {
  const fases = Array.from(new Set([
    ...costos.map((c) => c.faseSprint || "Sin Fase"),
    ...presupuestos.map((p) => p.nombre),
  ]));

  const data = fases.map((fase) => {
    const gastos = costos.filter((c) => (c.faseSprint || "Sin Fase") === fase)
      .reduce((acc, c) => acc + Number(c.monto), 0);
    const planificado = presupuestos.filter((p) => p.nombre === fase)
      .reduce((acc, p) => acc + Number(p.montoTotal), 0);
    return {
      name: fase,
      GastoReal: gastos,
      GastoPlanificado: planificado,
    };
  });

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="GastoReal" fill="#2563eb" radius={[8, 8, 0, 0]} />
          <Bar dataKey="GastoPlanificado" fill="#60a5fa" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function CostosPorSprint({ costos, presupuestos }: { costos: any[]; presupuestos: any[] }) {
  const sprints = Array.from(new Set(costos.map((c) => c.faseSprint || "Sin Sprint")));

  const data = sprints.map((sprint) => {
    const gastos = costos.filter((c) => (c.faseSprint || "Sin Sprint") === sprint)
      .reduce((acc, c) => acc + Number(c.monto), 0);
    const planificado = presupuestos.filter((p) => p.nombre === sprint)
      .reduce((acc, p) => acc + Number(p.montoTotal), 0);
    return {
      name: sprint,
      GastoReal: gastos,
      GastoPlanificado: planificado,
    };
  });

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="GastoReal" stroke="#2563eb" strokeWidth={3} />
          <Line type="monotone" dataKey="GastoPlanificado" stroke="#60a5fa" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [costos, setCostos] = useState<any[]>([]);
  const [presupuestos, setPresupuestos] = useState<any[]>([]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) return;
    fetch(`/api/costos?email=${session.user.email}`)
      .then(res => res.json())
      .then(data => setCostos(data))
      .catch(() => setCostos([]));
    fetch(`/api/presupuestos?email=${session.user.email}`)
      .then(res => res.json())
      .then(data => setPresupuestos(data))
      .catch(() => setPresupuestos([]));
  }, [session, status]);

  if (status === "loading" || !session) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  const user = session.user as any;
  const isAdmin = user.role === "ADMIN";

  // Saludo según la hora
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "¡Buenos días";
    if (hour < 19) return "¡Buenas tardes";
    return "¡Buenas noches";
  };
  // Avatar con iniciales
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map((n: string) => n[0]).join("").toUpperCase();
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-slate-700">
      {/* Sidebar navegación */}
      <aside className="hidden md:flex flex-col w-64 bg-white/95 border-r border-blue-100 shadow-lg min-h-screen py-8 px-4">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-blue-700 rounded-full p-4 mb-2 text-white text-2xl font-bold shadow-lg">
            {getInitials(user.name)}
          </div>
          <h2 className="text-xl font-bold text-blue-700">Konsultech</h2>
          <span className="text-xs text-gray-500">{isAdmin ? "Admin" : "Cliente"}</span>
        </div>
        <nav className="flex flex-col gap-4">
          <button onClick={() => router.push("/dashboard")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-700 font-semibold hover:bg-blue-50 transition group" title="Inicio">
            <FaChartPie className="group-hover:scale-110 transition" /> Dashboard
          </button>
          <button onClick={() => router.push("/costos")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-700 font-semibold hover:bg-blue-50 transition group" title="Registrar costos">
            <FaPlusCircle className="group-hover:scale-110 transition" /> Registro de Costos
          </button>
          <button onClick={() => router.push("/presupuestos")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-700 font-semibold hover:bg-blue-50 transition group" title="Presupuestos">
            <FaFileInvoiceDollar className="group-hover:scale-110 transition" /> Presupuestos
          </button>
          <button onClick={() => router.push("/reportes")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-700 font-semibold hover:bg-blue-50 transition group" title="Reportes">
            <FaFileAlt className="group-hover:scale-110 transition" /> Reportes
          </button>
        </nav>
        <div className="mt-auto pt-10 flex flex-col items-center gap-2">
          <button onClick={() => router.push("/perfil")}
            className="flex items-center gap-2 text-blue-700 hover:underline text-sm mb-2"><FaCog /> Perfil</button>
          <button onClick={() => router.push("/ayuda")}
            className="flex items-center gap-2 text-blue-700 hover:underline text-sm mb-2"><FaQuestionCircle /> Ayuda</button>
          <button
            onClick={() => signOut({ callbackUrl: window.location.origin + "/" })}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            Cerrar sesión
          </button>
        </div>
      </aside>
      {/* Main dashboard */}
      <main className="flex-1 flex flex-col items-center py-10 px-2 w-full">
        <div className="w-full max-w-6xl">
          {/* Botón demo y banner si usuario demo */}
          <DemoButton />
          {user.email === "demo@demo.com" && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-6 rounded shadow text-center">
              <strong>Estás usando el modo demo.</strong> Todos los datos que ves son ficticios y sirven para mostrar las funcionalidades de la plataforma.
            </div>
          )}
          <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full p-2 shadow-md flex items-center justify-center w-12 h-12 text-blue-700 font-extrabold text-xl border-2 border-blue-200">
                {getInitials(user.name)}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white drop-shadow">{getGreeting()}, {user.name}!</h1>
                <span className="text-blue-100 text-sm font-medium">Rol: {isAdmin ? "Admin" : "Cliente"}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => router.push("/perfil")} className="flex items-center gap-1 text-blue-100 hover:text-white text-sm"><FaCog /> Perfil</button>
              <button onClick={() => router.push("/ayuda")} className="flex items-center gap-1 text-blue-100 hover:text-white text-sm"><FaQuestionCircle /> Ayuda</button>
            </div>
          </header>
          {/* Tarjetas resumen */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center group hover:scale-105 transition-all relative">
              <FaMoneyBillWave className="text-blue-700 text-3xl mb-2 group-hover:scale-110 transition" />
              <span className="text-gray-500 text-xs">Gasto Real</span>
              <span className="text-2xl font-bold text-gray-900">$120,000</span>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center group hover:scale-105 transition-all relative">
              <FaChartPie className="text-blue-700 text-3xl mb-2 group-hover:scale-110 transition" />
              <span className="text-gray-500 text-xs">Gasto Planificado</span>
              <span className="text-2xl font-bold text-gray-900">$100,000</span>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center group hover:scale-105 transition-all relative">
              <FaExclamationTriangle className="text-yellow-500 text-3xl mb-2 group-hover:scale-110 transition" />
              <span className="text-gray-500 text-xs">Desviación</span>
              <span className="text-2xl font-bold text-gray-900">+20%</span>
              <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">¡Alerta!</span>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center group hover:scale-105 transition-all relative">
              <FaUsers className="text-blue-700 text-3xl mb-2 group-hover:scale-110 transition" />
              <span className="text-gray-500 text-xs">Alertas activas</span>
              <span className="text-2xl font-bold text-gray-900">2</span>
            </div>
          </section>
          {/* Accesos rápidos */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div onClick={() => router.push("/costos")}
              className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow p-6 flex flex-col items-center transition group hover:scale-105" title="Registrar costos">
              <FaPlusCircle className="text-3xl mb-2 group-hover:scale-110 transition" />
              <span className="font-bold text-lg">Registrar Costos</span>
              <span className="text-xs text-blue-200 mt-1 text-center">Ingresa gastos del proyecto y actualiza los costos reales en tiempo real.</span>
            </div>
            <div onClick={() => router.push("/presupuestos")}
              className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow p-6 flex flex-col items-center transition group hover:scale-105" title="Generar presupuesto">
              <FaFileInvoiceDollar className="text-3xl mb-2 group-hover:scale-110 transition" />
              <span className="font-bold text-lg">Generar Presupuesto</span>
              <span className="text-xs text-blue-200 mt-1 text-center">Crea y gestiona presupuestos iniciales por fase o sprint.</span>
            </div>
            <div onClick={() => router.push("/reportes")}
              className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow p-6 flex flex-col items-center transition group hover:scale-105" title="Ver reportes">
              <FaFileAlt className="text-3xl mb-2 group-hover:scale-110 transition" />
              <span className="font-bold text-lg">Ver Reportes</span>
              <span className="text-xs text-blue-200 mt-1 text-center">Visualiza informes gráficos y tabulares sobre los costos y desviaciones.</span>
            </div>
          </section>
          {/* Gráficos y acciones por rol */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center min-h-[300px]">
              <h2 className="text-lg font-bold text-blue-700 mb-2">Costos por Fase del Proyecto</h2>
              <CostosPorFase costos={costos} presupuestos={presupuestos} />
              <p className="text-xs text-gray-500 mt-2 text-center">Visualiza en qué fases del ciclo de vida se concentran los gastos.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center min-h-[300px]">
              <h2 className="text-lg font-bold text-blue-700 mb-2">Costos por Sprint</h2>
              <CostosPorSprint costos={costos} presupuestos={presupuestos} />
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
          <footer className="mt-12 text-xs text-gray-400 text-center w-full border-t pt-3 pb-4 px-8 bg-white/80 rounded-b-2xl">
            <span className="block font-semibold text-gray-500 mb-1">Soporte: soporte@konsultech.com</span>
            <span className="block">© {new Date().getFullYear()} Konsultech. Todos los derechos reservados.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
