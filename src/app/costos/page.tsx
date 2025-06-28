"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaPlusCircle, FaListUl, FaEdit, FaTrash, FaSave, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Loader from "@/components/ui/loader";
import { Alert } from "@/components/ui/alert";

// Cambiar any[] y any por tipos estrictos
interface Costo {
  id: string; // <-- ahora cada costo tiene id
  descripcion: string;
  monto: number;
  fecha: string;
  categoria: string;
  faseSprint: string;
  [key: string]: unknown;
}

export default function CostosPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = '/login';
    },
  });
  const router = useRouter();
  
  const [costos, setCostos] = useState<Costo[]>([]);
  const [form, setForm] = useState({
    descripcion: "",
    monto: "",
    fecha: "",
    categoria: "",
    faseSprint: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Costo>>({});
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const [isLoading, setIsLoading] = useState(true);

  // Redirigir si no hay sesión
  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/login');
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) {
        setIsLoading(false);
        return;
      }
      
      console.log('Iniciando carga de costos...');
      setLoading(true);
      setIsLoading(true);
      
      try {
        const response = await fetch(`/api/costos?email=${session.user.email}`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Respuesta de la API:', response.status);
        
        if (!response.ok) {
          throw new Error('Error al cargar los costos');
        }
        
        const data = await response.json();
        console.log('Datos recibidos:', data);
        setCostos(data);
        setError('');
      } catch (error) {
        console.error('Error al cargar costos:', error);
        setError('Error al cargar los costos. Por favor, recarga la página.');
        setCostos([]);
      } finally {
        setLoading(false);
        setIsLoading(false);
        console.log('Carga de costos finalizada');
      }
    };

    fetchData();
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (!session?.user?.email) {
      setError("No hay sesión activa");
      setLoading(false);
      return;
    }
    if (!form.descripcion || !form.monto || !form.fecha || !form.categoria) {
      setError("Completa todos los campos obligatorios.");
      setLoading(false);
      return;
    }
    if (Number(form.monto) <= 0) {
      setError("El monto debe ser mayor a 0.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/costos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, email: session.user.email }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setCostos([data, ...costos]);
        setForm({ descripcion: "", monto: "", fecha: "", categoria: "", faseSprint: "" });
        setSuccess("Costo registrado exitosamente.");
      }
    } catch (err) {
      setError("Error al guardar costo");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (i: number) => {
    setLoading(true);
    setError("");
    if (!session?.user?.email) {
      setError("No hay sesión activa");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/costos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editForm, id: costos[i].id, email: session.user.email }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else {
        const newCostos = [...costos];
        newCostos[i] = data;
        setCostos(newCostos);
        setEditIndex(null);
      }
    } catch (err) {
      setError("Error al guardar cambios");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (i: number) => {
    setLoading(true);
    setError("");
    if (!session?.user?.email) {
      setError("No hay sesión activa");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/costos?id=${costos[i].id}&email=${session.user.email}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setCostos(costos.filter((_, idx) => idx !== i));
    } catch (err) {
      setError("Error al eliminar");
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el formulario de edición
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Guardar edición
  const handleSave = async (i: number) => {
    await handleEdit(i);
    setEditIndex(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-100 via-blue-50 to-white py-10 px-2">
      <div className="w-full max-w-3xl bg-white/95 rounded-2xl shadow-2xl p-8 border border-blue-100">
        <h2 className="text-2xl font-extrabold text-blue-800 mb-6 flex items-center gap-2 drop-shadow"><FaPlusCircle /> Registro de Costos</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" aria-label="Formulario de registro de costos">
          <div className="flex flex-col">
            <input
              type="text"
              name="descripcion"
              placeholder="Concepto (ej. Servidor AWS, Licencia, etc.)"
              value={form.descripcion}
              onChange={handleChange}
              className="border border-blue-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow"
              required
              aria-label="Concepto"
            />
            <span className="text-xs text-gray-400 mt-1">Describe brevemente el gasto.</span>
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              name="monto"
              placeholder="Monto (solo números)"
              value={form.monto}
              onChange={handleChange}
              className="border border-blue-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow"
              required
              min={1}
              aria-label="Monto"
            />
            <span className="text-xs text-gray-400 mt-1">Ingresa el monto total del costo.</span>
          </div>
          <div className="flex flex-col">
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className="border border-blue-200 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow"
              required
              aria-label="Tipo de costo"
            >
              <option value="">Selecciona Tipo</option>
              <option value="Infraestructura">Infraestructura</option>
              <option value="Desarrollo">Desarrollo</option>
              <option value="Licencias">Licencias</option>
              <option value="Soporte">Soporte</option>
              <option value="Consultoría">Consultoría</option>
            </select>
            <span className="text-xs text-gray-400 mt-1">Selecciona la categoría del gasto.</span>
          </div>
          <div className="flex flex-col">
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className="border border-blue-200 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow"
              required
              aria-label="Fecha"
            />
            <span className="text-xs text-gray-400 mt-1">Fecha en que se realizó el gasto.</span>
          </div>
          <div className="flex flex-col md:col-span-2">
            <input
              type="text"
              name="faseSprint"
              placeholder="Fase / Sprint (opcional)"
              value={form.faseSprint}
              onChange={handleChange}
              className="border border-blue-200 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white shadow"
              aria-label="Fase o Sprint"
            />
            <span className="text-xs text-gray-400 mt-1">Puedes asociar el costo a una fase o sprint del proyecto.</span>
          </div>
          <button
            type="submit"
            disabled={loading || !form.descripcion || !form.monto || !form.fecha || !form.categoria || Number(form.monto) <= 0}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed md:col-span-2"
            aria-label="Agregar costo"
          >
            {loading ? <Loader text="Guardando..." /> : "Agregar Costo"}
          </button>
        </form>
        {error && <Alert title="Error" description={error} className="mb-4 animate-fade-in" />}
        {success && <Alert title="Éxito" description={success} className="mb-4 animate-fade-in" />}
        <h3 className="text-xl font-semibold mb-2 text-blue-800 flex items-center gap-2 drop-shadow"><FaListUl title="Lista de costos" /> Costos Ingresados</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-blue-200 rounded-xl shadow bg-white text-sm" aria-label="Tabla de costos">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-blue-200 px-4 py-2 text-blue-900 font-semibold">Concepto</th>
                <th className="border border-blue-200 px-4 py-2 text-blue-900 font-semibold">Monto</th>
                <th className="border border-blue-200 px-4 py-2 text-blue-900 font-semibold">Tipo</th>
                <th className="border border-blue-200 px-4 py-2 text-blue-900 font-semibold">Fecha</th>
                <th className="border border-blue-200 px-4 py-2 text-blue-900 font-semibold">Fase/Sprint</th>
                <th className="border border-blue-200 px-4 py-2 text-blue-900 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="py-8"><Loader text="Cargando costos..." /></td></tr>
              ) : costos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-8">
                    <div className="flex flex-col items-center gap-2">
                      <FaListUl className="text-4xl text-blue-200 mb-2" aria-hidden="true" />
                      <span className="font-medium">No hay costos registrados aún.</span>
                      <span className="text-xs text-gray-400">Agrega tu primer costo usando el formulario superior.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                costos.slice(page * pageSize, (page + 1) * pageSize).map((c, i) => (
                  <tr key={i} className="even:bg-blue-50 hover:bg-blue-100 transition border-b last:border-b-0">
                    {editIndex === i + page * pageSize ? (
                      <>
                        <td className="border border-blue-100 px-4 py-2"><input name="descripcion" value={editForm.descripcion} onChange={handleEditChange} className="w-full border border-blue-400 rounded px-2 py-1 text-blue-900 bg-blue-50/50 placeholder-blue-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow" placeholder="Concepto" aria-label="Editar concepto" /></td>
                        <td className="border border-blue-100 px-4 py-2"><input name="monto" type="number" value={editForm.monto} onChange={handleEditChange} className="w-full border border-blue-400 rounded px-2 py-1 text-blue-900 bg-blue-50/50 placeholder-blue-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow" placeholder="Monto" aria-label="Editar monto" /></td>
                        <td className="border border-blue-100 px-4 py-2"><input name="categoria" value={editForm.categoria} onChange={handleEditChange} className="w-full border border-blue-400 rounded px-2 py-1 text-blue-900 bg-blue-50/50 placeholder-blue-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow" placeholder="Tipo" aria-label="Editar tipo" /></td>
                        <td className="border border-blue-100 px-4 py-2"><input name="fecha" type="date" value={editForm.fecha?.slice(0,10)} onChange={handleEditChange} className="w-full border border-blue-400 rounded px-2 py-1 text-blue-900 bg-blue-50/50 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow" aria-label="Editar fecha" /></td>
                        <td className="border border-blue-100 px-4 py-2"><input name="faseSprint" value={editForm.faseSprint || ""} onChange={handleEditChange} className="w-full border border-blue-400 rounded px-2 py-1 text-blue-900 bg-blue-50/50 placeholder-blue-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow" placeholder="Fase/Sprint" aria-label="Editar fase o sprint" /></td>
                        <td className="border border-blue-100 px-4 py-2 flex gap-2 justify-center">
                          <button type="button" onClick={() => handleSave(i + page * pageSize)} className="text-green-600 hover:text-green-800" title="Guardar cambios" aria-label="Guardar cambios"><FaSave /></button>
                          <button type="button" onClick={() => setEditIndex(null)} className="text-gray-500 hover:text-gray-700" title="Cancelar edición" aria-label="Cancelar edición"><FaArrowLeft /></button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border border-blue-100 px-4 py-2 text-gray-900">{c.descripcion}</td>
                        <td className="border border-blue-100 px-4 py-2 text-gray-700">${c.monto}</td>
                        <td className="border border-blue-100 px-4 py-2 text-gray-700">{c.categoria}</td>
                        <td className="border border-blue-100 px-4 py-2 text-gray-700">{new Date(c.fecha).toLocaleDateString()}</td>
                        <td className="border border-blue-100 px-4 py-2 text-gray-700">{c.faseSprint}</td>
                        <td className="border border-blue-100 px-4 py-2 flex gap-2 justify-center">
                          <button type="button" onClick={() => handleEdit(i + page * pageSize)} className="text-blue-600 hover:text-blue-800" title="Editar" aria-label="Editar"><FaEdit /></button>
                          <button type="button" onClick={() => handleDelete(i + page * pageSize)} className="text-red-600 hover:text-red-800" title="Eliminar" aria-label="Eliminar"><FaTrash /></button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded shadow disabled:opacity-50" aria-label="Página anterior"><FaArrowLeft /> Anterior</button>
          <span className="text-blue-900 font-semibold">Página {page + 1}</span>
          <button onClick={() => setPage(p => (p + 1) * pageSize < costos.length ? p + 1 : p)} disabled={(page + 1) * pageSize >= costos.length} className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded shadow disabled:opacity-50" aria-label="Página siguiente">Siguiente <FaArrowRight /></button>
        </div>
      </div>
    </div>
  );
}
