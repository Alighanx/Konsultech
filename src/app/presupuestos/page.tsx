"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaFileInvoiceDollar, FaListOl, FaClipboardList } from "react-icons/fa";

export default function PresupuestosPage() {
  const { data: session } = useSession();
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [presupuestos, setPresupuestos] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/presupuestos?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => setPresupuestos(Array.isArray(data) ? data : []))
        .catch(() => setPresupuestos([]));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!tipo || !nombre || !monto || !fechaInicio || !fechaFin) {
      setError("Completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/presupuestos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          nombre,
          montoTotal: monto,
          fechaInicio,
          fechaFin,
        }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else {
        setPresupuestos([data, ...presupuestos]);
        // Crear reporte automáticamente al registrar presupuesto
        await fetch("/api/reportes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session.user.email,
            titulo: `Presupuesto registrado: ${nombre}`,
            contenido: `Se registró un presupuesto de $${monto} para ${tipo === "agil" ? "el sprint" : "la fase"} '${nombre}' del ${fechaInicio} al ${fechaFin}.`,
            fecha: new Date().toISOString(),
          }),
        });
        setTipo("");
        setNombre("");
        setMonto("");
        setFechaInicio("");
        setFechaFin("");
      }
    } catch {
      setError("Error al guardar presupuesto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-100 via-blue-50 to-white py-10 px-2">
      <div className="w-full max-w-3xl bg-white/95 rounded-2xl shadow-2xl p-8 border border-blue-100">
        <h1 className="text-2xl font-extrabold text-blue-800 mb-6 flex items-center gap-2 drop-shadow"><FaFileInvoiceDollar /> Generación de Presupuestos</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-blue-900 mb-1">Tipo de Proyecto</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)} className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow text-blue-900 placeholder-blue-400" required>
              <option value="">Selecciona</option>
              <option value="tradicional">Tradicional (por fase)</option>
              <option value="agil">Ágil (por sprint)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">{tipo === "agil" ? "Sprint" : tipo === "tradicional" ? "Fase" : "Fase/Sprint"}</label>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow text-blue-900 placeholder-blue-400" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Monto Estimado</label>
            <input type="number" min="0" value={monto} onChange={e => setMonto(e.target.value)} className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow text-blue-900 placeholder-blue-400" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Fecha de Inicio</label>
            <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow text-blue-900 placeholder-blue-400" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Fecha de Fin</label>
            <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow text-blue-900 placeholder-blue-400" required />
          </div>
          {error && <div className="md:col-span-2 text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2 text-sm text-center animate-pulse font-medium shadow">{error}</div>}
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" disabled={loading} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <FaFileInvoiceDollar className="inline mr-2" /> {loading ? "Guardando..." : "Agregar Presupuesto"}
            </button>
          </div>
        </form>
        <h2 className="text-lg font-bold text-blue-800 mb-2 flex items-center gap-2 drop-shadow"><FaClipboardList /> Presupuestos Ingresados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow text-sm border border-blue-200">
            <thead>
              <tr className="bg-blue-100 text-blue-900">
                <th className="px-4 py-2 font-semibold border border-blue-200">Nombre</th>
                <th className="px-4 py-2 font-semibold border border-blue-200">Monto</th>
                <th className="px-4 py-2 font-semibold border border-blue-200">Fecha Inicio</th>
                <th className="px-4 py-2 font-semibold border border-blue-200">Fecha Fin</th>
              </tr>
            </thead>
            <tbody>
              {presupuestos.length === 0 ? (
                <tr><td colSpan={4} className="text-center text-gray-400 py-4">No hay presupuestos registrados aún.</td></tr>
              ) : (
                presupuestos.map((p, i) => (
                  <tr key={p.id || i} className="even:bg-blue-50 hover:bg-blue-100 transition border-b last:border-b-0">
                    <td className="px-4 py-2 border border-blue-100 text-blue-900 font-medium">{p.nombre}</td>
                    <td className="px-4 py-2 border border-blue-100 text-blue-800">${p.montoTotal}</td>
                    <td className="px-4 py-2 border border-blue-100 text-blue-700">{p.fechaInicio ? new Date(p.fechaInicio).toLocaleDateString() : ""}</td>
                    <td className="px-4 py-2 border border-blue-100 text-blue-700">{p.fechaFin ? new Date(p.fechaFin).toLocaleDateString() : ""}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
