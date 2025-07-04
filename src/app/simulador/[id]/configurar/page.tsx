"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCode, FaDatabase, FaCloud, FaTools, FaLock, FaPalette, FaDownload, FaChartBar, FaEdit, FaSave } from "react-icons/fa";

interface Tecnologia {
  id: string;
  nombre: string;
  categoria: string;
  tipo: 'licencia' | 'servicio' | 'desarrollo';
  precio: number;
  unidad: string;
  descripcion: string;
  recomendada: boolean;
  alternativas?: string[];
}

interface ConfiguracionSimulador {
  frontend: Tecnologia[];
  backend: Tecnologia[];
  database: Tecnologia[];
  infrastructure: Tecnologia[];
  tools: Tecnologia[];
  security: Tecnologia[];
  design: Tecnologia[];
  roles: {
    id: string;
    nombre: string;
    horas: number;
    tarifaHora: number;
    mesesTrabajo: number;
  }[];
  extras: {
    gestion: number;
    testing: number;
    deployment: number;
    maintenance: number;
    contingency: number;
  };
}

export default function ConfigurarSimuladorPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession({
    required: false  // Permitir acceso sin autenticación para modo demo
  });
  const router = useRouter();
  const [configuracion, setConfiguracion] = useState<ConfiguracionSimulador | null>(null);
  const [categoriaActiva, setCategoriaActiva] = useState('frontend');
  const [totalPresupuesto, setTotalPresupuesto] = useState(0);
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
    cargarConfiguracion();
  }, [status, session, router, params]);

  const cargarConfiguracion = async () => {
    try {
      // Simulación de datos - en implementación real vendría de la API
      const configEjemplo: ConfiguracionSimulador = {
        frontend: [
          {
            id: 'react',
            nombre: 'React + TypeScript',
            categoria: 'frontend',
            tipo: 'desarrollo',
            precio: 0,
            unidad: 'gratis',
            descripcion: 'Biblioteca de JavaScript para interfaces de usuario',
            recomendada: true,
            alternativas: ['Vue.js', 'Angular', 'Svelte']
          },
          {
            id: 'nextjs',
            nombre: 'Next.js',
            categoria: 'frontend',
            tipo: 'desarrollo',
            precio: 0,
            unidad: 'gratis',
            descripcion: 'Framework de React para producción',
            recomendada: true
          }
        ],
        backend: [
          {
            id: 'nodejs',
            nombre: 'Node.js + Express',
            categoria: 'backend',
            tipo: 'desarrollo',
            precio: 0,
            unidad: 'gratis',
            descripcion: 'Runtime de JavaScript para servidor',
            recomendada: true,
            alternativas: ['Python Django', 'Java Spring', 'C# .NET']
          }
        ],
        database: [
          {
            id: 'postgresql',
            nombre: 'PostgreSQL',
            categoria: 'database',
            tipo: 'servicio',
            precio: 25,
            unidad: 'mes',
            descripcion: 'Base de datos relacional avanzada',
            recomendada: true,
            alternativas: ['MySQL', 'MongoDB', 'Redis']
          }
        ],
        infrastructure: [
          {
            id: 'aws-ec2',
            nombre: 'AWS EC2',
            categoria: 'infrastructure',
            tipo: 'servicio',
            precio: 50,
            unidad: 'mes',
            descripcion: 'Servidores virtuales escalables',
            recomendada: true,
            alternativas: ['Google Cloud', 'Azure', 'DigitalOcean']
          }
        ],
        tools: [
          {
            id: 'github',
            nombre: 'GitHub Pro',
            categoria: 'tools',
            tipo: 'licencia',
            precio: 4,
            unidad: 'usuario/mes',
            descripcion: 'Control de versiones y colaboración',
            recomendada: true
          }
        ],
        security: [
          {
            id: 'ssl-cert',
            nombre: 'Certificado SSL',
            categoria: 'security',
            tipo: 'licencia',
            precio: 100,
            unidad: 'año',
            descripcion: 'Certificado de seguridad para HTTPS',
            recomendada: true
          }
        ],
        design: [
          {
            id: 'figma',
            nombre: 'Figma Professional',
            categoria: 'design',
            tipo: 'licencia',
            precio: 12,
            unidad: 'usuario/mes',
            descripcion: 'Herramienta de diseño UI/UX',
            recomendada: true
          }
        ],
        roles: [
          {
            id: 'fullstack',
            nombre: 'Desarrollador Full Stack Senior',
            horas: 160,
            tarifaHora: 45,
            mesesTrabajo: 4
          },
          {
            id: 'frontend',
            nombre: 'Desarrollador Frontend',
            horas: 120,
            tarifaHora: 35,
            mesesTrabajo: 3
          },
          {
            id: 'designer',
            nombre: 'UI/UX Designer',
            horas: 80,
            tarifaHora: 40,
            mesesTrabajo: 2
          }
        ],
        extras: {
          gestion: 15,
          testing: 20,
          deployment: 10,
          maintenance: 12,
          contingency: 10
        }
      };
      
      setConfiguracion(configEjemplo);
      calcularPresupuesto(configEjemplo);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar configuración:', error);
      setLoading(false);
    }
  };

  const calcularPresupuesto = (config: ConfiguracionSimulador) => {
    let total = 0;
    
    // Sumar costos de tecnologías
    const todasTecnologias = [
      ...config.frontend,
      ...config.backend,
      ...config.database,
      ...config.infrastructure,
      ...config.tools,
      ...config.security,
      ...config.design
    ];
    
    todasTecnologias.forEach(tech => {
      if (tech.unidad === 'mes') {
        total += tech.precio * 12; // Año completo
      } else if (tech.unidad === 'usuario/mes') {
        total += tech.precio * 5 * 12; // 5 usuarios por año
      } else if (tech.unidad === 'año') {
        total += tech.precio;
      }
    });
    
    // Sumar costos de roles
    config.roles.forEach(rol => {
      total += rol.horas * rol.tarifaHora * rol.mesesTrabajo;
    });
    
    // Aplicar extras
    const subtotal = total;
    total += (subtotal * config.extras.gestion) / 100;
    total += (subtotal * config.extras.testing) / 100;
    total += (subtotal * config.extras.deployment) / 100;
    total += (subtotal * config.extras.maintenance) / 100;
    total += (subtotal * config.extras.contingency) / 100;
    
    setTotalPresupuesto(total);
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(precio);
  };

  const categorias = [
    { id: 'frontend', nombre: 'Frontend', icon: FaCode },
    { id: 'backend', nombre: 'Backend', icon: FaCode },
    { id: 'database', nombre: 'Base de Datos', icon: FaDatabase },
    { id: 'infrastructure', nombre: 'Infraestructura', icon: FaCloud },
    { id: 'tools', nombre: 'Herramientas', icon: FaTools },
    { id: 'security', nombre: 'Seguridad', icon: FaLock },
    { id: 'design', nombre: 'Diseño', icon: FaPalette }
  ];

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!configuracion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar configuración</h2>
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
              onClick={() => router.push('/simulador')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Configurar Simulación</h1>
              <p className="text-gray-600 mt-2">Ajusta tecnologías, roles y costos para tu proyecto</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Presupuesto estimado</p>
              <p className="text-2xl font-bold text-green-600">{formatearPrecio(totalPresupuesto)}</p>
            </div>
            <button
              onClick={() => router.push(`/simulador/${projectId}/resultados`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaChartBar className="w-4 h-4" />
              Ver Resultados
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de categorías */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías</h3>
              <nav className="space-y-2">
                {categorias.map((categoria) => {
                  const Icon = categoria.icon;
                  return (
                    <button
                      key={categoria.id}
                      onClick={() => setCategoriaActiva(categoria.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        categoriaActiva === categoria.id
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{categoria.nombre}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {categorias.find(c => c.id === categoriaActiva)?.nombre}
                </h2>
                <button className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                  <FaEdit className="w-4 h-4" />
                  Personalizar
                </button>
              </div>

              <div className="space-y-4">
                {configuracion[categoriaActiva as keyof ConfiguracionSimulador] && 
                 Array.isArray(configuracion[categoriaActiva as keyof ConfiguracionSimulador]) && 
                 (configuracion[categoriaActiva as keyof ConfiguracionSimulador] as Tecnologia[]).map((tech) => (
                  <div key={tech.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${tech.recomendada ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <h3 className="font-medium text-gray-900">{tech.nombre}</h3>
                        {tech.recomendada && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Recomendada
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {tech.precio === 0 ? 'Gratis' : `${formatearPrecio(tech.precio)}/${tech.unidad}`}
                        </p>
                        <p className="text-sm text-gray-600 capitalize">{tech.tipo}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{tech.descripcion}</p>
                    {tech.alternativas && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-gray-500">Alternativas:</span>
                        {tech.alternativas.map((alt) => (
                          <span
                            key={alt}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                          >
                            {alt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sección de roles */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Equipo de Desarrollo</h2>
          <div className="space-y-4">
            {configuracion.roles.map((rol) => (
              <div key={rol.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{rol.nombre}</h3>
                    <p className="text-sm text-gray-600">
                      {rol.horas}h/mes × {rol.mesesTrabajo} meses = {rol.horas * rol.mesesTrabajo} horas totales
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatearPrecio(rol.tarifaHora * rol.horas * rol.mesesTrabajo)}
                    </p>
                    <p className="text-sm text-gray-600">{formatearPrecio(rol.tarifaHora)}/hora</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de extras */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Costos Adicionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(configuracion.extras).map(([key, value]) => (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {key === 'gestion' ? 'Gestión de Proyecto' :
                     key === 'testing' ? 'Testing y QA' :
                     key === 'deployment' ? 'Despliegue' :
                     key === 'maintenance' ? 'Mantenimiento' :
                     'Contingencias'}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => router.push('/simulador')}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <FaArrowLeft className="w-4 h-4" />
            Volver al Simulador
          </button>
          
          <div className="flex gap-4">
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
              <FaSave className="w-4 h-4" />
              Guardar Configuración
            </button>
            <button
              onClick={() => router.push(`/simulador/${projectId}/resultados`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <FaChartBar className="w-4 h-4" />
              Generar Reporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
