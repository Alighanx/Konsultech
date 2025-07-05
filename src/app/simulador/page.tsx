"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaProjectDiagram, FaChartLine, FaHistory, FaSearch, FaFilter } from "react-icons/fa";

interface ProyectoSimulado {
  id: string;
  nombre: string;
  descripcion: string;
  tipoProyecto: string;
  presupuestoEstimado: number;
  fechaCreacion: string;
  estado: 'borrador' | 'completado' | 'exportado';
  tecnologias: string[];
}

export default function SimuladorPage() {
  const { data: session, status } = useSession({
    required: false  // Permitir acceso sin autenticación para modo demo
  });
  const router = useRouter();
  const [proyectos, setProyectos] = useState<ProyectoSimulado[]>([]);
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Verificar si es modo demo (sin sesión)
    if (status !== 'loading' && !session) {
      setIsDemo(true);
    }
    cargarProyectos();
  }, [status, session]);

  const cargarProyectos = async () => {
    // Simulación de datos - en implementación real vendría de la API
    const proyectosEjemplo: ProyectoSimulado[] = [
      {
        id: '1',
        nombre: 'E-commerce Mediano',
        descripcion: 'Plataforma de comercio electrónico con 10,000 productos',
        tipoProyecto: 'Web Application',
        presupuestoEstimado: 166500, // 45000 EUR * 3.7 PEN/EUR aproximadamente
        fechaCreacion: '2025-01-15',
        estado: 'completado',
        tecnologias: ['React', 'Node.js', 'PostgreSQL', 'AWS']
      },
      {
        id: '2',
        nombre: 'App Móvil Delivery',
        descripcion: 'Aplicación móvil para delivery de comida',
        tipoProyecto: 'Mobile App',
        presupuestoEstimado: 118400, // 32000 EUR * 3.7 PEN/EUR aproximadamente
        fechaCreacion: '2025-01-10',
        estado: 'borrador',
        tecnologias: ['React Native', 'Firebase', 'Stripe']
      }
    ];
    setProyectos(proyectosEjemplo);
  };

  const proyectosFiltrados = proyectos.filter(proyecto => {
    const pasaFiltro = filtro === 'todos' || proyecto.estado === filtro;
    const pasaBusqueda = proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                        proyecto.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return pasaFiltro && pasaBusqueda;
  });

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0
    }).format(precio);
  };

  const getEstadoBadge = (estado: string) => {
    const estilos = {
      'borrador': 'bg-yellow-100 text-yellow-800',
      'completado': 'bg-green-100 text-green-800',
      'exportado': 'bg-blue-100 text-blue-800'
    };
    return estilos[estado as keyof typeof estilos] || 'bg-gray-100 text-gray-800';
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner de modo demo */}
      {isDemo && (
        <div className="bg-green-600 text-white px-4 py-3 text-center">
          <p className="font-medium">
            🎯 Estás en <strong>Modo Demo</strong> - Explora todas las funcionalidades. 
            <button 
              onClick={() => router.push('/register')}
              className="ml-2 underline hover:no-underline"
            >
              Crear cuenta gratis
            </button>
          </p>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Simulador de Presupuestos {isDemo && <span className="text-green-600">(Demo)</span>}
            </h1>
            <p className="text-gray-600 mt-2">
              {isDemo 
                ? "Explora el simulador con datos de ejemplo" 
                : "Gestiona y crea simulaciones de presupuestos para proyectos TI"
              }
            </p>
          </div>
          <button
            onClick={() => router.push('/simulador/nuevo')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            Nueva Simulación
          </button>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar proyectos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todos">Todos los estados</option>
                <option value="borrador">Borrador</option>
                <option value="completado">Completado</option>
                <option value="exportado">Exportado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectosFiltrados.map((proyecto) => (
            <div key={proyecto.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{proyecto.nombre}</h3>
                  <p className="text-sm text-gray-600 mb-2">{proyecto.descripcion}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <FaProjectDiagram className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{proyecto.tipoProyecto}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoBadge(proyecto.estado)}`}>
                  {proyecto.estado}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaChartLine className="w-4 h-4 text-green-500" />
                  <span className="text-lg font-semibold text-green-600">
                    {formatearPrecio(proyecto.presupuestoEstimado)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {proyecto.tecnologias.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {proyecto.tecnologias.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{proyecto.tecnologias.length - 3} más
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">
                  {new Date(proyecto.fechaCreacion).toLocaleDateString('es-ES')}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/simulador/${proyecto.id}/resultados`)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Ver detalles
                  </button>
                  <button
                    onClick={() => router.push(`/simulador/${proyecto.id}/configurar`)}
                    className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estado vacío */}
        {proyectosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <FaProjectDiagram className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {proyectos.length === 0 ? 'No hay proyectos simulados' : 'No se encontraron proyectos'}
            </h3>
            <p className="text-gray-600 mb-6">
              {proyectos.length === 0 
                ? 'Crea tu primera simulación para empezar a gestionar presupuestos de proyectos TI'
                : 'Prueba con otros filtros o términos de búsqueda'
              }
            </p>
            {proyectos.length === 0 && (
              <button
                onClick={() => router.push('/simulador/nuevo')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                <FaPlus className="w-4 h-4" />
                Crear Primera Simulación
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
