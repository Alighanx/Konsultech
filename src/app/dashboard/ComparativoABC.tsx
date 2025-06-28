// Componente para visualizar comparativo de Costo ABC vs Presupuesto
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

interface ComparativoABC {
  proyecto: string;
  costoABC: number;
  presupuesto: number;
}

export default function ComparativoABC() {
  const [dataComparativo, setDataComparativo] = useState<ComparativoABC[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/actividades").then(res => res.json()),
      fetch("/api/presupuestos").then(res => res.json()),
    ]).then(([actividades, presupuestos]) => {
      const proyectos = Array.from(new Set([
        ...actividades.map((a: any) => a.proyecto),
        ...presupuestos.map((p: any) => p.nombre),
      ]));
      const comparativo = proyectos.map((proyecto: string) => {
        const costoABC = actividades.filter((a: any) => a.proyecto === proyecto)
          .reduce((acc: number, a: any) => acc + a.costo * a.cantidad, 0);
        const presupuesto = (presupuestos.find((p: any) => p.nombre === proyecto)?.montoTotal) || 0;
        return {
          proyecto,
          costoABC,
          presupuesto: Number(presupuesto),
        };
      });
      setDataComparativo(comparativo);
    });
  }, []);

  const data = {
    labels: dataComparativo.map(d => d.proyecto),
    datasets: [
      {
        label: "Costo ABC",
        data: dataComparativo.map(d => d.costoABC),
        backgroundColor: "#2563eb",
      },
      {
        label: "Presupuesto",
        data: dataComparativo.map(d => d.presupuesto),
        backgroundColor: "#facc15",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Comparativo Costo ABC vs Presupuesto" },
    },
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-4 text-blue-800">Comparativo Costo ABC vs Presupuesto</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
