"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaDownload, FaEdit, FaChartPie, FaChartBar, FaUsers, FaCode, FaCloud, FaLock, FaShare, FaCopy } from "react-icons/fa";

interface DesglocePresupuesto {
  categoria: string;
  items: {
    nombre: string;
    precio: number;
    unidad: string;
    cantidad: number;
    subtotal: number;
  }[];
  total: number;
}

interface ResultadosSimulacion {
  id: string;
  nombreProyecto: string;
  fechaGeneracion: string;
  presupuestoTotal: number;
  desglose: DesglocePresupuesto[];
  comparativa: {
    escenario: string;
    presupuesto: number;
    plazo: string;
    descripcion?: string;
  }[];
  recomendaciones: string[];
  justificacion: string;
  riesgos?: {
    tipo: string;
    descripcion: string;
    probabilidad: string;
    impacto: string;
    mitigacion: string;
  }[];
  metricas?: {
    roiEstimado: string;
    tiempoRecuperacion: string;
    indicadoresClave: string[];
    comparativaMercado: string;
  };
}

export default function ResultadosSimuladorPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session } = useSession({ required: false });
  const router = useRouter();
  const [resultados, setResultados] = useState<ResultadosSimulacion | null>(null);
  const [vistaActiva, setVistaActiva] = useState<'desglose' | 'comparativa' | 'recomendaciones' | 'riesgos'>('desglose');
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState<string>('');
  const [esModoDemo, setEsModoDemo] = useState(false);

  useEffect(() => {
    const initializeParams = async () => {
      const resolvedParams = await params;
      setProjectId(resolvedParams.id);
      setEsModoDemo(!session);
    };
    
    initializeParams();
  }, [params, session]);

  useEffect(() => {
    if (projectId) {
      cargarResultados();
    }
  }, [projectId]);

  const cargarResultados = async () => {
    try {
      setLoading(true);
      
      // Obtener datos de simulación almacenados
      const simulacionData = obtenerDatosSimulacion();
      
      if (simulacionData) {
        // Llamar a la API con los datos reales de la simulación
        const response = await fetch('/api/simulador', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(simulacionData)
        });
        
        if (response.ok) {
          const data = await response.json();
          const presupuestoData = data.data.presupuesto;
          
          // Transformar datos de la API al formato esperado por la UI
          const resultadosTransformados: ResultadosSimulacion = {
            id: projectId,
            nombreProyecto: presupuestoData.resumen?.titulo || 'Proyecto Sin Nombre',
            fechaGeneracion: presupuestoData.resumen?.fechaGeneracion || new Date().toISOString(),
            presupuestoTotal: presupuestoData.costoTotal,
            desglose: presupuestoData.desglose,
            comparativa: presupuestoData.comparativa || [],
            recomendaciones: presupuestoData.recomendaciones || [],
            justificacion: presupuestoData.resumen?.recomendacion || 'Análisis detallado del proyecto',
            riesgos: data.data.riesgos || [],
            metricas: data.data.metricas || undefined
          };
          
          setResultados(resultadosTransformados);
        } else {
          console.error('Error al obtener resultados de la API');
          setResultados(obtenerResultadosEjemplo());
        }
      } else {
        // Si no hay datos de simulación, usar datos de ejemplo
        setResultados(obtenerResultadosEjemplo());
      }
    } catch (error) {
      console.error('Error al cargar resultados:', error);
      setResultados(obtenerResultadosEjemplo());
    } finally {
      setLoading(false);
    }
  };

  const obtenerDatosSimulacion = () => {
    // Intentar obtener datos desde localStorage
    try {
      const datosGuardados = localStorage.getItem(`simulacion_${projectId}`);
      if (datosGuardados) {
        return JSON.parse(datosGuardados);
      }
    } catch (error) {
      console.error('Error al obtener datos de simulación:', error);
    }
    return null;
  };

  const obtenerResultadosEjemplo = (): ResultadosSimulacion => {
    return {
      id: projectId,
      nombreProyecto: "Proyecto Ejemplo",
      fechaGeneracion: new Date().toISOString(),
      presupuestoTotal: 85000,
      desglose: [
        {
          categoria: "Desarrollo",
          items: [
            { nombre: "Desarrollador Full Stack Senior", precio: 150, unidad: "hora", cantidad: 400, subtotal: 60000 },
            { nombre: "Desarrollador Frontend", precio: 120, unidad: "hora", cantidad: 200, subtotal: 24000 },
            { nombre: "UI/UX Designer", precio: 100, unidad: "hora", cantidad: 80, subtotal: 8000 }
          ],
          total: 92000
        },
        {
          categoria: "Licencias y Servicios",
          items: [
            { nombre: "AWS EC2 (12 meses)", precio: 200, unidad: "mes", cantidad: 12, subtotal: 2400 },
            { nombre: "Base de Datos PostgreSQL", precio: 100, unidad: "mes", cantidad: 12, subtotal: 1200 },
            { nombre: "CDN CloudFlare", precio: 80, unidad: "mes", cantidad: 12, subtotal: 960 }
          ],
          total: 4560
        },
        {
          categoria: "Impuestos",
          items: [
            { nombre: "IGV (18%)", precio: 0, unidad: "porcentaje", cantidad: 18, subtotal: 15300 }
          ],
          total: 15300
        }
      ],
      comparativa: [
        { escenario: "Básico", presupuesto: 65000, plazo: "4-5 meses", descripcion: "Funcionalidades esenciales" },
        { escenario: "Estándar", presupuesto: 85000, plazo: "4-6 meses", descripcion: "Desarrollo completo" },
        { escenario: "Premium", presupuesto: 115000, plazo: "6-8 meses", descripcion: "Características avanzadas" }
      ],
      recomendaciones: [
        "Considere desarrollo por fases para mitigar riesgos",
        "Implemente metodología ágil con sprints cortos",
        "Priorice funcionalidades core en el MVP",
        "Incluya pruebas automatizadas desde el inicio"
      ],
      justificacion: "Proyecto bien estructurado con tecnologías apropiadas para los objetivos planteados. Los costos están alineados con el mercado peruano.",
      riesgos: [
        {
          tipo: "Técnico",
          descripcion: "Complejidad en la integración de sistemas",
          probabilidad: "Media",
          impacto: "Alto",
          mitigacion: "Desarrollo por fases y pruebas continuas"
        }
      ],
      metricas: {
        roiEstimado: "150% anual estimado",
        tiempoRecuperacion: "12 meses",
        indicadoresClave: ["Tiempo de respuesta", "Usuarios activos", "Satisfacción del usuario"],
        comparativaMercado: "Dentro del rango promedio del mercado"
      }
    };
  };

  const formatearMoneda = (valor: number): string => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor);
  };

  const formatearFecha = (fecha: string): string => {
    return new Date(fecha).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const exportarPDF = () => {
    // Implementar exportación a PDF
    console.log('Exportando a PDF...');
  };

  const compartirResultados = () => {
    // Implementar compartir resultados
    console.log('Compartiendo resultados...');
  };

  const editarSimulacion = () => {
    router.push(`/simulador/${projectId}/configurar`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  if (!resultados) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No se encontraron resultados para esta simulación</p>
          <button
            onClick={() => router.push('/simulador')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Volver al simulador
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner modo demo */}
      {esModoDemo && (
        <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-800 font-medium">Modo Demo</span>
              <span className="text-yellow-700">- Datos de ejemplo</span>
            </div>
            <button
              onClick={() => router.push('/login')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Crear Cuenta
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/simulador')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft className="h-5 w-5" />
                <span>Volver al Simulador</span>
              </button>
              <div className="border-l border-gray-300 h-6"></div>
              <h1 className="text-2xl font-bold text-gray-900">{resultados.nombreProyecto}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={editarSimulacion}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
              >
                <FaEdit className="h-4 w-4" />
                <span>Editar</span>
              </button>
              <button
                onClick={compartirResultados}
                className="flex items-center space-x-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg"
              >
                <FaShare className="h-4 w-4" />
                <span>Compartir</span>
              </button>
              <button
                onClick={exportarPDF}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                <FaDownload className="h-4 w-4" />
                <span>Exportar PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumen ejecutivo */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatearMoneda(resultados.presupuestoTotal)}
              </div>
              <div className="text-sm text-gray-600">Presupuesto Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {resultados.metricas?.roiEstimado || 'N/A'}
              </div>
              <div className="text-sm text-gray-600">ROI Estimado</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {resultados.metricas?.tiempoRecuperacion || 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Tiempo de Recuperación</div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              <strong>Generado:</strong> {formatearFecha(resultados.fechaGeneracion)} |
              <strong className="ml-2">Comparativa:</strong> {resultados.metricas?.comparativaMercado || 'N/A'}
            </p>
          </div>
        </div>

        {/* Navegación de pestañas */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setVistaActiva('desglose')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  vistaActiva === 'desglose'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaChartPie className="inline h-4 w-4 mr-2" />
                Desglose Detallado
              </button>
              <button
                onClick={() => setVistaActiva('comparativa')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  vistaActiva === 'comparativa'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaChartBar className="inline h-4 w-4 mr-2" />
                Comparativa de Escenarios
              </button>
              <button
                onClick={() => setVistaActiva('recomendaciones')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  vistaActiva === 'recomendaciones'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaCode className="inline h-4 w-4 mr-2" />
                Recomendaciones
              </button>
              {resultados.riesgos && resultados.riesgos.length > 0 && (
                <button
                  onClick={() => setVistaActiva('riesgos')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    vistaActiva === 'riesgos'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FaLock className="inline h-4 w-4 mr-2" />
                  Análisis de Riesgos
                </button>
              )}
            </nav>
          </div>

          <div className="p-6">
            {/* Contenido según la vista activa */}
            {vistaActiva === 'desglose' && (
              <div className="space-y-6">
                {resultados.desglose.map((categoria, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">{categoria.categoria}</h3>
                      <p className="text-sm text-gray-600">
                        Total: {formatearMoneda(categoria.total)}
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Concepto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Precio Unit.
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cantidad
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {categoria.items.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.nombre}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.precio > 0 ? `${formatearMoneda(item.precio)}/${item.unidad}` : 'Incluido'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.cantidad} {item.unidad}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {formatearMoneda(item.subtotal)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {vistaActiva === 'comparativa' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {resultados.comparativa.map((escenario, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{escenario.escenario}</h3>
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {formatearMoneda(escenario.presupuesto)}
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        Plazo: {escenario.plazo}
                      </div>
                      {escenario.descripcion && (
                        <p className="text-sm text-gray-700">{escenario.descripcion}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {vistaActiva === 'recomendaciones' && (
              <div className="space-y-4">
                {resultados.recomendaciones.map((recomendacion, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{recomendacion}</p>
                  </div>
                ))}
                
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Justificación del Presupuesto</h3>
                  <p className="text-gray-700">{resultados.justificacion}</p>
                </div>
              </div>
            )}

            {vistaActiva === 'riesgos' && resultados.riesgos && (
              <div className="space-y-4">
                {resultados.riesgos.map((riesgo, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{riesgo.tipo}</h3>
                        <p className="text-gray-600 mt-1">{riesgo.descripcion}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          Probabilidad: <span className="font-medium">{riesgo.probabilidad}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Impacto: <span className="font-medium">{riesgo.impacto}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Estrategia de Mitigación</h4>
                      <p className="text-green-800">{riesgo.mitigacion}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
