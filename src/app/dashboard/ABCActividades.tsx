// Componente para registrar actividades ABC y mostrar costos por proyecto
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface ActividadABC {
  id: string;
  nombre: string;
  costo: number;
  driver: string;
  cantidad: number;
  proyecto: string;
}

interface Presupuesto {
  nombre: string;
  montoTotal: number | string;
  fechaInicio: string;
}

export default function ABCActividades() {
  const { data: session } = useSession();
  const [actividades, setActividades] = useState<ActividadABC[]>([]);
  const [form, setForm] = useState({ nombre: "", costo: "", driver: "", cantidad: "", proyecto: "" });
  const [proyectos, setProyectos] = useState<string[]>([]);
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
  const [filtroProyecto, setFiltroProyecto] = useState("");
  const [filtroDriver, setFiltroDriver] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ nombre: "", costo: "", driver: "", cantidad: "", proyecto: "" });

  useEffect(() => {
    fetch("/api/actividades")
      .then(res => res.json())
      .then(data => setActividades(data));
    if (session?.user?.email) {
      fetch(`/api/presupuestos?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => setPresupuestos(Array.isArray(data) ? data : []));
    }
  }, [session]);

  useEffect(() => {
    // Extraer proyectos únicos
    setProyectos(Array.from(new Set(actividades.map(a => a.proyecto))));
  }, [actividades]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/actividades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const nueva = await res.json();
    setActividades([...actividades, nueva]);
    setForm({ nombre: "", costo: "", driver: "", cantidad: "", proyecto: "" });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/actividades?id=${id}`, { method: "DELETE" });
    setActividades(actividades.filter(a => a.id !== id));
  };

  const handleEdit = (actividad: ActividadABC) => {
    setEditId(actividad.id);
    setEditForm({
      nombre: actividad.nombre,
      costo: String(actividad.costo),
      driver: actividad.driver,
      cantidad: String(actividad.cantidad),
      proyecto: actividad.proyecto,
    });
  };

  const handleSave = async (id: string) => {
    const res = await fetch("/api/actividades", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...editForm }),
    });
    const actualizada = await res.json();
    setActividades(actividades.map(a => a.id === id ? actualizada : a));
    setEditId(null);
  };

  // Filtros
  const actividadesFiltradas = actividades.filter(a =>
    (!filtroProyecto || a.proyecto === filtroProyecto) &&
    (!filtroDriver || a.driver === filtroDriver)
  );

  // Cálculo de costos ABC por proyecto
  const costosPorProyecto = proyectos.map(proyecto => {
    const acts = actividades.filter(a => a.proyecto === proyecto);
    const total = acts.reduce((acc, a) => acc + a.costo * a.cantidad, 0);
    const presupuesto = presupuestos.find(p => p.nombre === proyecto);
    const montoPresupuesto = presupuesto ? Number(presupuesto.montoTotal) : 0;
    const desviacion = montoPresupuesto > 0 ? ((total - montoPresupuesto) / montoPresupuesto) * 100 : 0;
    return { proyecto, total, montoPresupuesto, desviacion, actividades: acts };
  });

  // Drivers únicos para filtro
  const drivers = Array.from(new Set(actividades.map(a => a.driver)));

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-800">Registro de Actividades ABC</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre actividad" className="border p-2 rounded" required />
        <input name="costo" value={form.costo} onChange={handleChange} placeholder="Costo unitario" type="number" className="border p-2 rounded" required />
        <input name="driver" value={form.driver} onChange={handleChange} placeholder="Driver (ej: horas)" className="border p-2 rounded" required />
        <input name="cantidad" value={form.cantidad} onChange={handleChange} placeholder="Cantidad driver" type="number" className="border p-2 rounded" required />
        <input name="proyecto" value={form.proyecto} onChange={handleChange} placeholder="Proyecto/Producto" className="border p-2 rounded" required />
        <button type="submit" className="col-span-1 md:col-span-2 bg-blue-700 text-white rounded p-2 font-semibold">Agregar actividad</button>
      </form>
      <div className="flex gap-4 mb-4">
        <select value={filtroProyecto} onChange={e => setFiltroProyecto(e.target.value)} className="border p-2 rounded">
          <option value="">Todos los proyectos</option>
          {proyectos.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={filtroDriver} onChange={e => setFiltroDriver(e.target.value)} className="border p-2 rounded">
          <option value="">Todos los drivers</option>
          {drivers.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <h3 className="text-lg font-bold mb-2 text-blue-700">Costos ABC por Proyecto</h3>
      <table className="w-full border rounded mb-6">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 border">Proyecto</th>
            <th className="p-2 border">Costo Total ABC</th>
            <th className="p-2 border">Presupuesto</th>
            <th className="p-2 border">Desviación (%)</th>
            <th className="p-2 border">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {costosPorProyecto.map((p, i) => (
            <tr key={i} className="even:bg-blue-50">
              <td className="border p-2 font-medium">{p.proyecto}</td>
              <td className="border p-2">${p.total.toFixed(2)}</td>
              <td className="border p-2">${p.montoPresupuesto.toFixed(2)}</td>
              <td className={`border p-2 font-semibold ${p.desviacion > 0 ? "text-red-600" : "text-green-600"}`}>{p.desviacion.toFixed(2)}%</td>
              <td className="border p-2">
                <ul className="list-disc pl-4">
                  {p.actividades.map(a => (
                    <li key={a.id}>{a.nombre}: {a.cantidad} x ${a.costo} ({a.driver}) = {(a.costo * a.cantidad).toFixed(2)}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-lg font-bold mb-2 text-blue-700">Actividades Registradas</h3>
      <table className="w-full border rounded">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2 border">Actividad</th>
            <th className="p-2 border">Driver</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Costo Unitario</th>
            <th className="p-2 border">Proyecto</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {actividadesFiltradas.map(a => (
            <tr key={a.id} className="even:bg-blue-50">
              {editId === a.id ? (
                <>
                  <td className="border p-2"><input name="nombre" value={editForm.nombre} onChange={handleEditChange} className="border p-1 rounded w-full" /></td>
                  <td className="border p-2"><input name="driver" value={editForm.driver} onChange={handleEditChange} className="border p-1 rounded w-full" /></td>
                  <td className="border p-2"><input name="cantidad" value={editForm.cantidad} onChange={handleEditChange} type="number" className="border p-1 rounded w-full" /></td>
                  <td className="border p-2"><input name="costo" value={editForm.costo} onChange={handleEditChange} type="number" className="border p-1 rounded w-full" /></td>
                  <td className="border p-2"><input name="proyecto" value={editForm.proyecto} onChange={handleEditChange} className="border p-1 rounded w-full" /></td>
                  <td className="border p-2">
                    <button onClick={() => handleSave(a.id)} className="text-green-600 font-bold mr-2">Guardar</button>
                    <button onClick={() => setEditId(null)} className="text-gray-600 font-bold">Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border p-2">{a.nombre}</td>
                  <td className="border p-2">{a.driver}</td>
                  <td className="border p-2">{a.cantidad}</td>
                  <td className="border p-2">${a.costo}</td>
                  <td className="border p-2">{a.proyecto}</td>
                  <td className="border p-2">
                    <button onClick={() => handleEdit(a)} className="text-blue-600 font-bold mr-2">Editar</button>
                    <button onClick={() => handleDelete(a.id)} className="text-red-600 font-bold">Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
