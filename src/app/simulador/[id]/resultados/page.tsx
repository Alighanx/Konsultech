"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaDownload, FaEdit, FaChartPie, FaChartBar, FaUsers, FaShare, FaCheck, FaMobile, FaGlobe, FaShoppingCart, FaDatabase, FaCloud, FaGamepad } from "react-icons/fa";

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
  tipoProyecto: string;
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
  tecnologias: {
    categoria: string;
    items: string[];
  }[];
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
      cargarResultados(resolvedParams.id);
    };
    
    initializeParams();
  }, [params]);

  const cargarResultados = async (id: string) => {
    try {
      setLoading(true);
      
      // Obtener requerimientos del proyecto
      const requerimientos = obtenerRequerimientosProyecto(id);
      const tipoProyecto = requerimientos.tipoProyecto || 'web-app';
      
      // Generar resultados dinámicos basados en el tipo de proyecto
      const resultadosDinamicos = generarResultadosPorTipo(id, tipoProyecto, requerimientos);
      
      setResultados(resultadosDinamicos);
    } catch (error) {
      console.error('Error al cargar resultados:', error);
    } finally {
      setLoading(false);
    }
  };

  const obtenerRequerimientosProyecto = (id: string) => {
    try {
      const requerimientos = localStorage.getItem(`requerimientos_${id}`);
      if (requerimientos) {
        return JSON.parse(requerimientos);
      }
    } catch (error) {
      console.error('Error al obtener requerimientos:', error);
    }

    // Valores por defecto basados en ejemplos
    if (id === "1") {
      return {
        nombre: "E-commerce Mediano",
        descripcion: "Plataforma de comercio electrónico con 10,000 productos",
        tipoProyecto: "ecommerce",
        alcance: "completo",
        usuarios: "1000-10000",
        complejidad: "media",
        plazo: "6-12",
        presupuestoReferencia: "150000-200000",
        caracteristicasEspeciales: ["Pagos online", "Análisis y reportes", "Gestión de usuarios"]
      };
    } else if (id === "2") {
      return {
        nombre: "App Móvil Delivery",
        descripcion: "Aplicación móvil para delivery de comida",
        tipoProyecto: "mobile-app",
        alcance: "completo",
        usuarios: "100-1000",
        complejidad: "media",
        plazo: "3-6",
        presupuestoReferencia: "100000-150000",
        caracteristicasEspeciales: ["Geolocalización", "Pagos online", "Notificaciones push"]
      };
    }

    return {
      nombre: `Proyecto ${id}`,
      descripcion: "Descripción del proyecto",
      tipoProyecto: "web-app",
      alcance: "completo",
      usuarios: "100-1000",
      complejidad: "media",
      plazo: "3-6",
      presupuestoReferencia: "100000-150000",
      caracteristicasEspeciales: []
    };
  };

  const generarResultadosPorTipo = (id: string, tipoProyecto: string, requerimientos: any): ResultadosSimulacion => {
    let desglose: DesglocePresupuesto[] = [];
    let presupuestoTotal = 0;
    let tecnologias: { categoria: string; items: string[] }[] = [];
    let recomendaciones: string[] = [];
    let nombreProyecto = requerimientos.nombre || `Proyecto ${id}`;

    switch (tipoProyecto) {
      case 'mobile-app':
        desglose = [
          {
            categoria: "Desarrollo Móvil",
            items: [
              { nombre: "Desarrollador React Native Senior", precio: 185, unidad: "hora", cantidad: 480, subtotal: 88800 },
              { nombre: "Desarrollador Backend Mobile", precio: 165, unidad: "hora", cantidad: 240, subtotal: 39600 },
              { nombre: "UI/UX Designer Mobile", precio: 148, unidad: "hora", cantidad: 120, subtotal: 17760 }
            ],
            total: 146160
          },
          {
            categoria: "Tecnologías y Servicios Móviles",
            items: [
              { nombre: "Firebase Premium", precio: 111, unidad: "mes", cantidad: 12, subtotal: 1332 },
              { nombre: "React Native Development Tools", precio: 0, unidad: "gratis", cantidad: 1, subtotal: 0 },
              { nombre: "Apple Developer Program", precio: 370, unidad: "año", cantidad: 1, subtotal: 370 },
              { nombre: "Google Play Console", precio: 93, unidad: "único", cantidad: 1, subtotal: 93 },
              { nombre: "Push Notifications Service", precio: 37, unidad: "mes", cantidad: 12, subtotal: 444 },
              { nombre: "App Analytics", precio: 74, unidad: "mes", cantidad: 12, subtotal: 888 }
            ],
            total: 3127
          },
          {
            categoria: "Testing y Despliegue Móvil",
            items: [
              { nombre: "Testing en dispositivos reales", precio: 2000, unidad: "proyecto", cantidad: 1, subtotal: 2000 },
              { nombre: "CI/CD para apps móviles", precio: 500, unidad: "proyecto", cantidad: 1, subtotal: 500 },
              { nombre: "App Store optimization", precio: 1500, unidad: "proyecto", cantidad: 1, subtotal: 1500 }
            ],
            total: 4000
          }
        ];
        tecnologias = [
          { categoria: "Frontend/Mobile", items: ["React Native", "Expo", "React Navigation", "React Native Elements"] },
          { categoria: "Backend", items: ["Firebase", "Node.js", "Express.js", "Socket.io"] },
          { categoria: "Base de Datos", items: ["Firestore", "Firebase Realtime Database", "AsyncStorage"] },
          { categoria: "Servicios", items: ["Firebase Auth", "Firebase Cloud Functions", "Push Notifications"] },
          { categoria: "Testing", items: ["Jest", "Detox", "Firebase Test Lab"] }
        ];
        recomendaciones = [
          "Utilizar React Native para desarrollo cross-platform eficiente",
          "Implementar Firebase para backend escalable y tiempo real",
          "Incluir testing automatizado en dispositivos reales",
          "Configurar analytics desde el primer día para métricas de usuario",
          "Planificar estrategia de actualización OTA (Over-The-Air)"
        ];
        break;

      case 'ecommerce':
        desglose = [
          {
            categoria: "Desarrollo E-commerce",
            items: [
              { nombre: "Desarrollador Full Stack E-commerce", precio: 185, unidad: "hora", cantidad: 640, subtotal: 118400 },
              { nombre: "Desarrollador Frontend E-commerce", precio: 165, unidad: "hora", cantidad: 360, subtotal: 59400 },
              { nombre: "Desarrollador Backend E-commerce", precio: 170, unidad: "hora", cantidad: 280, subtotal: 47600 },
              { nombre: "Especialista en Pagos Online", precio: 200, unidad: "hora", cantidad: 80, subtotal: 16000 }
            ],
            total: 241400
          },
          {
            categoria: "Plataforma E-commerce",
            items: [
              { nombre: "Next.js + Comercio", precio: 0, unidad: "gratis", cantidad: 1, subtotal: 0 },
              { nombre: "Stripe/PayPal Integration", precio: 0, unidad: "comisión", cantidad: 1, subtotal: 0 },
              { nombre: "PostgreSQL E-commerce", precio: 185, unidad: "mes", cantidad: 12, subtotal: 2220 },
              { nombre: "Redis Cache", precio: 74, unidad: "mes", cantidad: 12, subtotal: 888 },
              { nombre: "CDN para imágenes", precio: 111, unidad: "mes", cantidad: 12, subtotal: 1332 },
              { nombre: "SSL Certificate E-commerce", precio: 740, unidad: "año", cantidad: 1, subtotal: 740 }
            ],
            total: 5180
          },
          {
            categoria: "Marketing y Analytics",
            items: [
              { nombre: "Google Analytics E-commerce", precio: 0, unidad: "gratis", cantidad: 1, subtotal: 0 },
              { nombre: "Email Marketing Integration", precio: 148, unidad: "mes", cantidad: 12, subtotal: 1776 },
              { nombre: "SEO Optimization", precio: 3000, unidad: "proyecto", cantidad: 1, subtotal: 3000 }
            ],
            total: 4776
          }
        ];
        tecnologias = [
          { categoria: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
          { categoria: "Backend", items: ["Node.js", "Express.js", "Prisma ORM"] },
          { categoria: "Base de Datos", items: ["PostgreSQL", "Redis"] },
          { categoria: "Pagos", items: ["Stripe", "PayPal", "MercadoPago"] },
          { categoria: "Infraestructura", items: ["Vercel", "AWS S3", "CloudFront CDN"] }
        ];
        recomendaciones = [
          "Implementar arquitectura headless para flexibilidad",
          "Integrar múltiples pasarelas de pago para mayor conversión",
          "Configurar CDN para optimización de imágenes de productos",
          "Implementar search avanzado con filtros y facetas",
          "Incluir sistema de reseñas y rating de productos"
        ];
        break;

      case 'api':
        desglose = [
          {
            categoria: "Desarrollo API",
            items: [
              { nombre: "Desarrollador Backend API Senior", precio: 185, unidad: "hora", cantidad: 320, subtotal: 59200 },
              { nombre: "Arquitecto de Software", precio: 220, unidad: "hora", cantidad: 120, subtotal: 26400 },
              { nombre: "DevOps Engineer", precio: 200, unidad: "hora", cantidad: 160, subtotal: 32000 }
            ],
            total: 117600
          },
          {
            categoria: "Infraestructura API",
            items: [
              { nombre: "AWS API Gateway", precio: 37, unidad: "mes", cantidad: 12, subtotal: 444 },
              { nombre: "Docker + Kubernetes", precio: 148, unidad: "mes", cantidad: 12, subtotal: 1776 },
              { nombre: "Base de datos escalable", precio: 370, unidad: "mes", cantidad: 12, subtotal: 4440 },
              { nombre: "Monitoring y Logs", precio: 111, unidad: "mes", cantidad: 12, subtotal: 1332 }
            ],
            total: 7992
          }
        ];
        tecnologias = [
          { categoria: "Backend", items: ["Node.js", "FastAPI", "Go", "GraphQL"] },
          { categoria: "Base de Datos", items: ["PostgreSQL", "MongoDB", "Redis"] },
          { categoria: "Infraestructura", items: ["Docker", "Kubernetes", "AWS", "NGINX"] },
          { categoria: "Monitoring", items: ["Prometheus", "Grafana", "ELK Stack"] }
        ];
        recomendaciones = [
          "Diseñar API RESTful con versionado desde el inicio",
          "Implementar autenticación JWT y rate limiting",
          "Configurar monitoring y alertas proactivas",
          "Usar containerización para deployment consistente",
          "Implementar tests automatizados e integración continua"
        ];
        break;

      default: // web-app y otros
        desglose = [
          {
            categoria: "Desarrollo Web",
            items: [
              { nombre: "Desarrollador Full Stack Senior", precio: 165, unidad: "hora", cantidad: 480, subtotal: 79200 },
              { nombre: "Desarrollador Frontend", precio: 130, unidad: "hora", cantidad: 240, subtotal: 31200 },
              { nombre: "UI/UX Designer", precio: 148, unidad: "hora", cantidad: 120, subtotal: 17760 }
            ],
            total: 128160
          },
          {
            categoria: "Tecnologías Web",
            items: [
              { nombre: "React + Next.js", precio: 0, unidad: "gratis", cantidad: 1, subtotal: 0 },
              { nombre: "PostgreSQL", precio: 93, unidad: "mes", cantidad: 12, subtotal: 1116 },
              { nombre: "Vercel Hosting", precio: 74, unidad: "mes", cantidad: 12, subtotal: 888 },
              { nombre: "GitHub Pro", precio: 15, unidad: "usuario/mes", cantidad: 60, subtotal: 900 }
            ],
            total: 2904
          }
        ];
        tecnologias = [
          { categoria: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
          { categoria: "Backend", items: ["Node.js", "Express.js", "Prisma"] },
          { categoria: "Base de Datos", items: ["PostgreSQL", "Redis"] },
          { categoria: "Infraestructura", items: ["Vercel", "GitHub", "Vercel Analytics"] }
        ];
        recomendaciones = [
          "Usar Next.js para optimización automática y SEO",
          "Implementar TypeScript para mayor robustez del código",
          "Configurar CI/CD con GitHub Actions",
          "Incluir testing unitario y de integración"
        ];
    }

    // Calcular total
    presupuestoTotal = Math.round(desglose.reduce((sum, categoria) => sum + categoria.total, 0) * 1.25); // 25% adicional para gestión, testing, etc.

    // Generar comparativa dinámica
    const comparativa = [
      {
        escenario: "MVP",
        presupuesto: Math.round(presupuestoTotal * 0.6),
        plazo: tipoProyecto === 'mobile-app' ? "2-3 meses" : "1-2 meses"
      },
      {
        escenario: "Estándar",
        presupuesto: presupuestoTotal,
        plazo: tipoProyecto === 'mobile-app' ? "4-6 meses" : "3-4 meses"
      },
      {
        escenario: "Enterprise",
        presupuesto: Math.round(presupuestoTotal * 1.5),
        plazo: tipoProyecto === 'mobile-app' ? "6-8 meses" : "5-6 meses"
      }
    ];

    return {
      id,
      nombreProyecto,
      tipoProyecto,
      fechaGeneracion: new Date().toISOString(),
      presupuestoTotal,
      desglose,
      comparativa,
      recomendaciones,
      justificacion: `Presupuesto personalizado para ${getTipoProyectoLabel(tipoProyecto)}. Incluye desarrollo especializado, tecnologías específicas y costos adicionales de gestión y testing.`,
      tecnologias
    };
  };

  const getTipoProyectoLabel = (tipo: string) => {
    const labels: { [key: string]: string } = {
      'mobile-app': 'Aplicación Móvil',
      'web-app': 'Aplicación Web',
      'ecommerce': 'E-commerce',
      'api': 'API/Backend',
      'crm-erp': 'CRM/ERP',
      'analytics': 'Análisis de Datos',
      'game': 'Videojuego'
    };
    return labels[tipo] || 'Aplicación Web';
  };

  const getTipoProyectoIcon = (tipo: string) => {
    const icons: { [key: string]: any } = {
      'mobile-app': FaMobile,
      'web-app': FaGlobe,
      'ecommerce': FaShoppingCart,
      'api': FaDatabase,
      'crm-erp': FaUsers,
      'analytics': FaChartBar,
      'game': FaGamepad
    };
    return icons[tipo] || FaGlobe;
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0
    }).format(precio);
  };

  const exportarPDF = async () => {
    alert('Funcionalidad de exportación PDF en desarrollo. Los datos se guardarán en el navegador.');
  };

  const compartirResultados = async () => {
    try {
      const url = `${window.location.origin}/simulador/${projectId}/resultados`;
      await navigator.clipboard.writeText(url);
      alert('Enlace copiado al portapapeles');
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  if (loading) {
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No se pudieron cargar los resultados</h2>
          <p className="text-gray-600 mb-6">Verifica que la simulación existe y está configurada correctamente.</p>
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

  const IconComponent = getTipoProyectoIcon(resultados.tipoProyecto);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/simulador')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <IconComponent className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{resultados.nombreProyecto}</h1>
                <p className="text-gray-600 mt-1">{getTipoProyectoLabel(resultados.tipoProyecto)} - Resultados de la simulación</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Presupuesto total</p>
              <p className="text-3xl font-bold text-green-600">{formatearPrecio(resultados.presupuestoTotal)}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/simulador/${projectId}/configurar`)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaEdit className="w-4 h-4" />
                Configurar
              </button>
              <button
                onClick={exportarPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaDownload className="w-4 h-4" />
                Exportar PDF
              </button>
              <button
                onClick={compartirResultados}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaShare className="w-4 h-4" />
                Compartir
              </button>
            </div>
          </div>
        </div>

        {/* Navegación de secciones */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'desglose', name: 'Desglose Especializado', icon: FaChartPie },
                { id: 'comparativa', name: 'Comparativa', icon: FaChartBar },
                { id: 'recomendaciones', name: 'Recomendaciones', icon: FaUsers }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setVistaActiva(tab.id as any)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      vistaActiva === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Contenido de las secciones */}
        <div className="space-y-6">
          {vistaActiva === 'desglose' && (
            <div className="space-y-6">
              {/* Resumen de tecnologías */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tecnologías Recomendadas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resultados.tecnologias.map((categoria, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">{categoria.categoria}</h3>
                      <div className="space-y-1">
                        {categoria.items.map((item, itemIndex) => (
                          <span key={itemIndex} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desglose de costos */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Desglose de Costos Especializado</h2>
                  <button
                    onClick={() => router.push(`/simulador/${projectId}/configurar`)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                  >
                    <FaEdit className="w-4 h-4" />
                    Personalizar
                  </button>
                </div>
                
                <div className="space-y-6">
                  {resultados.desglose.map((categoria, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">{categoria.categoria}</h3>
                        <span className="text-lg font-semibold text-gray-900">
                          {formatearPrecio(categoria.total)}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        {categoria.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.nombre}</p>
                              <p className="text-sm text-gray-600">
                                {formatearPrecio(item.precio)} × {item.cantidad} {item.unidad}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">{formatearPrecio(item.subtotal)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t-2 border-gray-300 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-gray-900">Total del Proyecto</span>
                      <span className="text-2xl font-bold text-green-600">
                        {formatearPrecio(resultados.presupuestoTotal)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{resultados.justificacion}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {vistaActiva === 'comparativa' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Comparativa de Escenarios</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resultados.comparativa.map((escenario, index) => (
                  <div key={index} className={`border-2 rounded-lg p-6 ${
                    escenario.escenario === 'Estándar' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{escenario.escenario}</h3>
                      {escenario.escenario === 'Estándar' && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3 inline-block">
                          Recomendado
                        </span>
                      )}
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        {formatearPrecio(escenario.presupuesto)}
                      </p>
                      <p className="text-sm text-gray-600">Plazo: {escenario.plazo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {vistaActiva === 'recomendaciones' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recomendaciones Especializadas</h2>
              
              <div className="space-y-4">
                {resultados.recomendaciones.map((recomendacion, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <FaCheck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-900">{recomendacion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
