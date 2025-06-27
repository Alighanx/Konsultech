"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { LineChart, Line } from "recharts";

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

  // Agrupar costos y presupuestos por fase/sprint para el gráfico
  const fases = Array.from(new Set([
    ...costos.map((c) => c.faseSprint || "Sin Fase"),
    ...presupuestos.map((p) => p.nombre)
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

  // Datos para gráfico de líneas: evolución mensual de gasto real y planificado
  const meses = Array.from(new Set([
    ...costos.map(c => new Date(c.fecha).toLocaleString('default', { month: 'short', year: 'numeric' })),
    ...presupuestos.map(p => new Date(p.fechaInicio).toLocaleString('default', { month: 'short', year: 'numeric' }))
  ])).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const dataLine = meses.map(mes => {
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
      GastoReal: gastoRealMes,
      GastoPlanificado: gastoPlanificadoMes,
    };
  });

  // Mostrar mensaje si no hay datos para el gráfico
  const hayDatosGraficos = data.some(d => d.GastoReal > 0 || d.GastoPlanificado > 0);

  return (
    <Card className="max-w-4xl mx-auto bg-gradient-to-br from-slate-100 via-blue-50 to-white shadow-xl">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 drop-shadow flex items-center gap-2">Reportes Analíticos</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {hayDatosGraficos ? (
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="GastoReal" fill="#2563eb" radius={[8, 8, 0, 0]} />
              <Bar dataKey="GastoPlanificado" fill="#60a5fa" radius={[8, 8, 0, 0]} />
            </BarChart>
          ) : (
            <Alert title="No hay datos suficientes para mostrar el gráfico." description="Registra costos y presupuestos para visualizar el análisis." className="mt-10" />
          )}
        </ResponsiveContainer>
      </div>
      <div className="w-full h-[300px] mt-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataLine} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="GastoReal" stroke="#2563eb" strokeWidth={3} />
            <Line type="monotone" dataKey="GastoPlanificado" stroke="#60a5fa" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto mt-8">
        <table className="w-full border border-blue-200 rounded-xl shadow bg-white">
          <thead className="bg-blue-100">
            <tr>
              <th className="border border-blue-200 px-4 py-2 text-blue-900 font-semibold">Título</th>
              <th className="border border-blue-200 px-4 py-2 text-blue-900 font-semibold">Contenido</th>
              <th className="border border-blue-200 px-4 py-2 text-blue-900 font-semibold">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((reporte: any) => (
              <tr key={reporte.id} className="even:bg-blue-50 hover:bg-blue-100 transition">
                <td className="border border-blue-100 px-4 py-2 text-blue-900 font-medium bg-blue-50/30">{reporte.titulo}</td>
                <td className="border border-blue-100 px-4 py-2 text-blue-800 bg-blue-50/10">{reporte.contenido}</td>
                <td className="border border-blue-100 px-4 py-2 text-blue-700 bg-blue-50/10">{reporte.fecha ? new Date(reporte.fecha).toLocaleDateString() : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
