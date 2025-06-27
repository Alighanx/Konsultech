"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from "recharts";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";

export default function Reportes() {
  const { data: session } = useSession();
  const [reportes, setReportes] = useState([]);
  const [costos, setCostos] = useState<any[]>([]);
  const [presupuestos, setPresupuestos] = useState<any[]>([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/reportes?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => setReportes(data))
        .catch(() => setReportes([]));
      fetch(`/api/costos?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => setCostos(Array.isArray(data) ? data : []))
        .catch(() => setCostos([]));
      fetch(`/api/presupuestos?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => setPresupuestos(Array.isArray(data) ? data : []))
        .catch(() => setPresupuestos([]));
    }
  }, [session]);

  // Datos para gráfico de barras: gasto total vs presupuestado por proyecto
  const proyectos = Array.from(new Set([
    ...costos.map(c => c.proyecto || "Sin Proyecto"),
    ...presupuestos.map(p => p.nombre)
  ]));

  const dataBar = proyectos.map(proyecto => {
    const gastoReal = costos.filter(c => (c.proyecto || "Sin Proyecto") === proyecto)
      .reduce((acc, c) => acc + Number(c.monto), 0);
    const planificado = presupuestos.filter(p => p.nombre === proyecto)
      .reduce((acc, p) => acc + Number(p.montoTotal), 0);
    return {
      name: proyecto,
      GastoReal: gastoReal,
      GastoPlanificado: planificado,
      Desviacion: planificado > 0 ? ((gastoReal - planificado) / planificado) * 100 : 0
    };
  });

  // Datos para gráfico de líneas: costos por fase/sprint
  const fases = Array.from(new Set([
    ...costos.map(c => c.faseSprint || "Sin Fase"),
    ...presupuestos.map(p => p.nombre)
  ]));

  const dataLine = fases.map(fase => {
    const gastoReal = costos.filter(c => (c.faseSprint || "Sin Fase") === fase)
      .reduce((acc, c) => acc + Number(c.monto), 0);
    const planificado = presupuestos.filter(p => p.nombre === fase)
      .reduce((acc, p) => acc + Number(p.montoTotal), 0);
    return {
      name: fase,
      GastoReal: gastoReal,
      GastoPlanificado: planificado
    };
  });

  // Datos para gráfico de área: tendencias de desviación mensual
  const meses = Array.from(new Set([
    ...costos.map(c => new Date(c.fecha).toLocaleString('default', { month: 'short', year: 'numeric' })),
    ...presupuestos.map(p => new Date(p.fechaInicio).toLocaleString('default', { month: 'short', year: 'numeric' }))
  ])).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const dataArea = meses.map(mes => {
    const gastoRealMes = costos.filter(c => {
      const fecha = new Date(c.fecha);
      const mesStr = fecha.toLocaleString('default', { month: 'short', year: 'numeric' });
      return mesStr === mes;
    }).reduce((acc, c) => acc + Number(c.monto), 0);

    const gastoPlanificadoMes = presupuestos.filter(p => {
      const fecha = new Date(p.fechaInicio);
      const mesStr = fecha.toLocaleString('default', { month: 'short', year: 'numeric' });
      return mesStr === mes;
    }).reduce((acc, p) => acc + Number(p.montoTotal), 0);

    return {
      mes,
      Desviacion: gastoPlanificadoMes > 0 ? ((gastoRealMes - gastoPlanificadoMes) / gastoPlanificadoMes) * 100 : 0
    };
  });

  // Mostrar mensaje si no hay datos para los gráficos
  const hayDatosGraficos = dataBar.some(d => d.GastoReal > 0 || d.GastoPlanificado > 0);

  return (
    <Card className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-slate-100 via-blue-50 to-white shadow-xl">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Reportes Analíticos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hayDatosGraficos ? (
          <BarChart data={dataBar} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} className="bg-white rounded-xl shadow p-4">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="GastoReal" fill="#2563eb" radius={[8, 8, 0, 0]} />
            <Bar dataKey="GastoPlanificado" fill="#60a5fa" radius={[8, 8, 0, 0]} />
          </BarChart>
        ) : (
          <Alert title="No hay datos suficientes para mostrar el gráfico." description="Registra costos y presupuestos para visualizar el análisis." />
        )}
        {hayDatosGraficos ? (
          <LineChart data={dataLine} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} className="bg-white rounded-xl shadow p-4">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="GastoReal" stroke="#2563eb" strokeWidth={3} />
            <Line type="monotone" dataKey="GastoPlanificado" stroke="#60a5fa" strokeWidth={3} />
          </LineChart>
        ) : (
          <Alert title="No hay datos suficientes para mostrar el gráfico." description="Registra costos y presupuestos para visualizar el análisis." />
        )}
      </div>
      <div className="mt-6">
        {hayDatosGraficos ? (
          <AreaChart data={dataArea} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} className="bg-white rounded-xl shadow p-4">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="Desviacion" stroke="#facc15" fill="#fde68a" />
          </AreaChart>
        ) : (
          <Alert title="No hay datos suficientes para mostrar el gráfico." description="Registra costos y presupuestos para visualizar el análisis." />
        )}
      </div>
      <div className="overflow-x-auto mt-8">
        <h3 className="text-lg font-bold text-blue-800 mb-4">Comparativa entre Proyectos</h3>
        <table className="w-full border border-blue-200 rounded-xl shadow bg-white">
          <thead className="bg-blue-100">
            <tr>
              <th className="border border-blue-200 px-4 py-2 text-blue-900 font-semibold">Proyecto</th>
              <th className="border border-blue-200 px-4 py-2 text-blue-900 font-semibold">Gasto Real</th>
              <th className="border border-blue-200 px-4 py-2 text-blue-900 font-semibold">Presupuesto</th>
              <th className="border border-blue-200 px-4 py-2 text-blue-900 font-semibold">Desviación (%)</th>
            </tr>
          </thead>
          <tbody>
            {dataBar.length === 0 ? (
              <tr><td colSpan={4} className="text-center text-gray-400 py-4">No hay datos aún.</td></tr>
            ) : (
              dataBar.map((d, i) => (
                <tr key={i} className="even:bg-blue-50 hover:bg-blue-100 transition">
                  <td className="border border-blue-100 px-4 py-2 text-blue-900 font-medium">{d.name}</td>
                  <td className="border border-blue-100 px-4 py-2 text-blue-800">${d.GastoReal.toFixed(2)}</td>
                  <td className="border border-blue-100 px-4 py-2 text-blue-800">${d.GastoPlanificado.toFixed(2)}</td>
                  <td className={`border border-blue-100 px-4 py-2 font-semibold ${d.Desviacion > 0 ? "text-red-600" : "text-green-600"}`}>{d.Desviacion.toFixed(2)}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
