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
  }[];
  recomendaciones: string[];
  justificacion: string;
}

export default function ResultadosSimuladorPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession({
    required: false  // Permitir acceso sin autenticación para modo demo
  });
  const router = useRouter();
  const [resultados, setResultados] = useState<ResultadosSimulacion | null>(null);
  const [vistaActiva, setVistaActiva] = useState<'desglose' | 'comparativa' | 'recomendaciones'>('desglose');
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState<string>('');

  useEffect(() => {
    const initializeParams = async () => {
      const resolvedParams = await params;
      setProjectId(resolvedParams.id);
    };
    
    initializeParams();
    
    if (status !== 'loading' && !session) {
      router.push('/login');
    }
    cargarResultados();
  }, [status, session, router, params]);

  const cargarResultados = async () => {
    try {
      // Simulación de datos - en implementación real vendría de la API
      const resultadosEjemplo: ResultadosSimulacion = {
        id: projectId,
        nombreProyecto: "E-commerce Mediano",
        fechaGeneracion: "2025-07-04T17:00:00.000Z", // Fecha fija para evitar problemas de hidratación
        presupuestoTotal: 52750,
        desglose: [
          {
            categoria: "Desarrollo",
            items: [
              { nombre: "Desarrollador Full Stack Senior", precio: 45, unidad: "hora", cantidad: 640, subtotal: 28800 },
              { nombre: "Desarrollador Frontend", precio: 35, unidad: "hora", cantidad: 360, subtotal: 12600 },
              { nombre: "UI/UX Designer", precio: 40, unidad: "hora", cantidad: 160, subtotal: 6400 }
            ],
            total: 47800
          },
          {
            categoria: "Licencias y Servicios",
            items: [
              { nombre: "AWS EC2 (12 meses)", precio: 50, unidad: "mes", cantidad: 12, subtotal: 600 },
              { nombre: "PostgreSQL Cloud", precio: 25, unidad: "mes", cantidad: 12, subtotal: 300 },
              { nombre: "GitHub Pro", precio: 4, unidad: "usuario/mes", cantidad: 60, subtotal: 240 },
              { nombre: "Figma Professional", precio: 12, unidad: "usuario/mes", cantidad: 24, subtotal: 288 },
              { nombre: "Certificado SSL", precio: 100, unidad: "año", cantidad: 1, subtotal: 100 }
            ],
            total: 1528
          },
          {
            categoria: "Gestión y Extras",
            items: [
              { nombre: "Gestión de Proyecto (15%)", precio: 0, unidad: "porcentaje", cantidad: 15, subtotal: 7402 },
              { nombre: "Testing y QA (10%)", precio: 0, unidad: "porcentaje", cantidad: 10, subtotal: 4935 },
              { nombre: "Contingencias (5%)", precio: 0, unidad: "porcentaje", cantidad: 5, subtotal: 2467 }
            ],
            total: 14804
          }
        ],
        comparativa: [
          { escenario: "Básico", presupuesto: 35000, plazo: "4-5 meses" },
          { escenario: "Estándar", presupuesto: 52750, plazo: "4-6 meses" },
          { escenario: "Premium", presupuesto: 75000, plazo: "6-8 meses" }
        ],
        recomendaciones: [
          "Utilizar React con Next.js para el frontend por su ecosistema maduro y rendimiento",
          "Implementar PostgreSQL como base de datos principal por su robustez y escalabilidad",
          "Desplegar en AWS EC2 con auto-scaling para manejar picos de tráfico",
          "Incluir un 15% adicional para gestión de proyecto y coordinación del equipo",
          "Reservar un 10% para testing exhaustivo y aseguramiento de calidad",
          "Mantener un 5% de contingencia para imprevistos o cambios de alcance"
        ],
        justificacion: "El presupuesto estimado se basa en un análisis detallado de los requerimientos del proyecto. Se han seleccionado tecnologías modernas y probadas en el mercado que garantizan escalabilidad, mantenibilidad y rendimiento. Los costos de desarrollo incluyen profesionales senior con experiencia en proyectos similares, lo que reduce riesgos y acelera la entrega."
      };
      
      setResultados(resultadosEjemplo);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar resultados:', error);
      setLoading(false);
    }
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(precio);
  };

  const exportarPDF = () => {
    // Implementar exportación a PDF
    alert('Funcionalidad de exportación a PDF en desarrollo');
  };

  const compartirResultados = () => {
    // Implementar compartir resultados
    navigator.clipboard.writeText(window.location.href);
    alert('Enlace copiado al portapapeles');
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria.toLowerCase()) {
      case 'desarrollo':
        return FaCode;
      case 'licencias y servicios':
        return FaCloud;
      case 'gestión y extras':
        return FaUsers;
      default:
        return FaChartBar;
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria.toLowerCase()) {
      case 'desarrollo':
        return 'bg-blue-100 text-blue-800';
      case 'licencias y servicios':
        return 'bg-green-100 text-green-800';
      case 'gestión y extras':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!resultados) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar resultados</h2>
          <button
            onClick={() => router.push('/simulador')}
            className="text-blue-600 hover:text-blue-800"
          >
            Volver al simulador
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(`/simulador/${projectId}/configurar`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{resultados.nombreProyecto}</h1>
              <p className="text-gray-600 mt-2">Resultados de la simulación de presupuesto</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={compartirResultados}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaShare className="w-4 h-4" />
              Compartir
            </button>
            <button
              onClick={exportarPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaDownload className="w-4 h-4" />
              Exportar PDF
            </button>
          </div>
        </div>

        {/* Resumen ejecutivo */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Presupuesto Total</h3>
              <p className="text-3xl font-bold text-green-600">{formatearPrecio(resultados.presupuestoTotal)}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Desarrollo</h3>
              <p className="text-2xl font-bold text-blue-600">
                {formatearPrecio(resultados.desglose.find(d => d.categoria === 'Desarrollo')?.total || 0)}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Servicios</h3>
              <p className="text-2xl font-bold text-purple-600">
                {formatearPrecio(resultados.desglose.find(d => d.categoria === 'Licencias y Servicios')?.total || 0)}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fecha</h3>
              <p className="text-sm text-gray-600">
                {new Date(resultados.fechaGeneracion).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Navegación de vistas */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'desglose', nombre: 'Desglose Detallado', icon: FaChartPie },
                { id: 'comparativa', nombre: 'Comparativa', icon: FaChartBar },
                { id: 'recomendaciones', nombre: 'Recomendaciones', icon: FaLock }
              ].map((vista) => {
                const Icon = vista.icon;
                return (
                  <button
                    key={vista.id}
                    onClick={() => setVistaActiva(vista.id as any)}
                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm ${
                      vistaActiva === vista.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {vista.nombre}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {vistaActiva === 'desglose' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Desglose Detallado del Presupuesto</h2>
                
                {resultados.desglose.map((categoria, index) => {
                  const Icon = getCategoriaIcon(categoria.categoria);
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Icon className="w-6 h-6 text-gray-400" />
                          <h3 className="text-lg font-semibold text-gray-900">{categoria.categoria}</h3>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoriaColor(categoria.categoria)}`}>
                          {formatearPrecio(categoria.total)}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        {categoria.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{item.nombre}</h4>
                              {item.unidad !== 'porcentaje' && (
                                <p className="text-sm text-gray-600">
                                  {formatearPrecio(item.precio)} × {item.cantidad} {item.unidad}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="font-semibold text-gray-900">
                                {formatearPrecio(item.subtotal)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {vistaActiva === 'comparativa' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Comparativa de Escenarios</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {resultados.comparativa.map((escenario, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-lg p-6 ${
                        escenario.escenario === 'Estándar'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{escenario.escenario}</h3>
                        {escenario.escenario === 'Estándar' && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3 inline-block">
                            Recomendado
                          </span>
                        )}
                        <p className="text-2xl font-bold text-gray-900 mb-2">
                          {formatearPrecio(escenario.presupuesto)}
                        </p>
                        <p className="text-sm text-gray-600">{escenario.plazo}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis Comparativo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Escenario Básico</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Funcionalidades esenciales</li>
                        <li>• Tecnologías estándar</li>
                        <li>• Equipo reducido</li>
                        <li>• Menor tiempo de desarrollo</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Escenario Premium</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Funcionalidades avanzadas</li>
                        <li>• Tecnologías cutting-edge</li>
                        <li>• Equipo completo</li>
                        <li>• Desarrollo exhaustivo</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {vistaActiva === 'recomendaciones' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Recomendaciones y Justificación</h2>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Justificación del Presupuesto</h3>
                  <p className="text-blue-800 leading-relaxed">{resultados.justificacion}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendaciones Técnicas</h3>
                  <div className="space-y-3">
                    {resultados.recomendaciones.map((recomendacion, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-sm font-semibold">{index + 1}</span>
                        </div>
                        <p className="text-gray-700">{recomendacion}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-4">Consideraciones Importantes</h3>
                  <ul className="text-yellow-800 space-y-2">
                    <li>• Los precios pueden variar según la fluctuación del mercado</li>
                    <li>• Se recomienda revisar la cotización cada 3 meses</li>
                    <li>• Los costos de mantenimiento no están incluidos en el presupuesto inicial</li>
                    <li>• Cambios en el alcance pueden afectar significativamente el presupuesto</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Acciones finales */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.push(`/simulador/${projectId}/configurar`)}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <FaEdit className="w-4 h-4" />
            Modificar Configuración
          </button>
          
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/simulador')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
            >
              Volver al Simulador
            </button>
            <button
              onClick={exportarPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <FaDownload className="w-4 h-4" />
              Descargar Propuesta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
