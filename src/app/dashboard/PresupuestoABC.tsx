// Componente para generar y visualizar presupuestos ABC
"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PresupuestoABC {
  proyecto: string;
  monto: number;
}

export default function PresupuestoABC() {
  const [presupuestos, setPresupuestos] = useState<PresupuestoABC[]>([]);
  const [form, setForm] = useState({ proyecto: "", monto: "" });
  const [proyectos, setProyectos] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/actividades")
      .then(res => res.json())
      .then(data => setProyectos(Array.from(new Set(data.map((a: any) => a.proyecto)))));
    fetch("/api/presupuestos")
      .then(res => res.json())
      .then(data => setPresupuestos(Array.isArray(data) ? data : []));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/presupuestos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: form.proyecto, montoTotal: form.monto, fechaInicio: new Date().toISOString() }),
    });
    const nuevo = await res.json();
    setPresupuestos([...presupuestos, { proyecto: nuevo.nombre, monto: Number(nuevo.montoTotal) }]);
    setForm({ proyecto: "", monto: "" });
  };

  // Datos para gráfica
  const data = {
    labels: presupuestos.map(p => p.proyecto),
    datasets: [
      {
        label: "Presupuesto ABC",
        data: presupuestos.map(p => p.monto),
        backgroundColor: "#2563eb",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Presupuestos ABC por Proyecto" },
    },
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-4 text-blue-800">Generar Presupuesto ABC</h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
        <select name="proyecto" value={form.proyecto} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Selecciona un proyecto</option>
          {proyectos.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <input name="monto" value={form.monto} onChange={handleChange} placeholder="Monto presupuesto" type="number" className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-700 text-white rounded p-2 font-semibold">Agregar presupuesto</button>
      </form>
      <Bar data={data} options={options} />
    </div>
  );
}
