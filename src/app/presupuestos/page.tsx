"use client";

import { useState } from "react";
import { FaFileInvoiceDollar, FaListOl, FaClipboardList } from "react-icons/fa";

export default function PresupuestosPage() {
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [presupuestos, setPresupuestos] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipo || !nombre || !monto) {
      setError("Completa todos los campos.");
      return;
    }
    setPresupuestos([
      ...presupuestos,
      { tipo, nombre, monto }
    ]);
    setTipo("");
    setNombre("");
    setMonto("");
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-700 py-10 px-2">
      <div className="w-full max-w-2xl bg-white/95 rounded-2xl shadow-2xl p-8 border border-blue-100">
        <h1 className="text-2xl font-extrabold text-blue-700 mb-6 flex items-center gap-2"><FaFileInvoiceDollar /> Generación de Presupuestos</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Proyecto</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" required>
              <option value="">Selecciona</option>
              <option value="tradicional">Tradicional (por fase)</option>
              <option value="agil">Ágil (por sprint)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{tipo === "agil" ? "Sprint" : tipo === "tradicional" ? "Fase" : "Fase/Sprint"}</label>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monto Estimado</label>
            <input type="number" min="0" value={monto} onChange={e => setMonto(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" required />
          </div>
          {error && <div className="md:col-span-2 text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2 text-sm text-center animate-pulse font-medium shadow">{error}</div>}
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
              <FaFileInvoiceDollar className="inline mr-2" /> Agregar Presupuesto
            </button>
          </div>
        </form>
        <h2 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2"><FaClipboardList /> Presupuestos Ingresados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow text-sm">
            <thead>
              <tr className="bg-blue-100 text-blue-700">
                <th className="px-3 py-2">Tipo</th>
                <th className="px-3 py-2">Fase/Sprint</th>
                <th className="px-3 py-2">Monto Estimado</th>
              </tr>
            </thead>
            <tbody>
              {presupuestos.length === 0 ? (
                <tr><td colSpan={3} className="text-center text-gray-400 py-4">No hay presupuestos registrados aún.</td></tr>
              ) : (
                presupuestos.map((p, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="px-3 py-2">{p.tipo === "agil" ? "Ágil" : "Tradicional"}</td>
                    <td className="px-3 py-2">{p.nombre}</td>
                    <td className="px-3 py-2">${p.monto}</td>
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
