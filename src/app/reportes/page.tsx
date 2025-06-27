"use client";

import { FaChartBar, FaTable, FaExclamationTriangle } from "react-icons/fa";

export default function ReportesPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-700 py-10 px-2">
      <div className="w-full max-w-5xl bg-white/95 rounded-2xl shadow-2xl p-8 border border-blue-100">
        <h1 className="text-2xl font-extrabold text-blue-700 mb-6 flex items-center gap-2"><FaChartBar /> Reportes Analíticos</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center min-h-[250px]">
            <h2 className="text-lg font-bold text-blue-700 mb-2">Gasto Total vs Presupuestado</h2>
            <div className="w-full h-40 flex items-center justify-center text-gray-400">[Gráfico de barras aquí]</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center min-h-[250px]">
            <h2 className="text-lg font-bold text-blue-700 mb-2">Costos por Fase/Sprint</h2>
            <div className="w-full h-40 flex items-center justify-center text-gray-400">[Gráfico de líneas aquí]</div>
          </div>
        </section>
        <section className="mb-10">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center min-h-[200px]">
            <h2 className="text-lg font-bold text-blue-700 mb-2">Tendencias de Desviación</h2>
            <div className="w-full h-32 flex items-center justify-center text-gray-400">[Gráfico de área aquí]</div>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2"><FaTable /> Comparativa entre Proyectos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow text-sm">
              <thead>
                <tr className="bg-blue-100 text-blue-700">
                  <th className="px-3 py-2">Proyecto</th>
                  <th className="px-3 py-2">Gasto Real</th>
                  <th className="px-3 py-2">Presupuesto</th>
                  <th className="px-3 py-2">Desviación</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan={4} className="text-center text-gray-400 py-4">No hay datos aún.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="mb-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-yellow-900 text-center shadow flex flex-col items-center">
            <FaExclamationTriangle className="text-2xl mb-2 text-yellow-500" />
            <span className="font-bold">Alertas visuales</span>
            <p className="text-sm mt-1">Aquí se mostrarán alertas cuando se detecten desviaciones significativas en los costos.</p>
          </div>
        </section>
        <div className="flex justify-end mt-6">
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            Exportar Reporte (PDF/Excel)
          </button>
        </div>
      </div>
    </div>
  );
}
