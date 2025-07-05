"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCode, FaDatabase, FaCloud, FaTools, FaLock, FaPalette, FaDownload, FaChartBar, FaEdit, FaSave, FaUsers, FaMobileAlt, FaGamepad } from "react-icons/fa";
import { getTecnologiasPorTipoProyecto, type Tecnologia } from "../../../../data/tecnologias";

interface TecnologiaLocal {
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
  mobile: Tecnologia[];
  gaming: Tecnologia[];
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
  const [tecnologiasDisponibles, setTecnologiasDisponibles] = useState<{
    frontend: Tecnologia[];
    backend: Tecnologia[];
    database: Tecnologia[];
    mobile: Tecnologia[];
    gaming: Tecnologia[];
    infrastructure: Tecnologia[];
    tools: Tecnologia[];
    security: Tecnologia[];
    design: Tecnologia[];
  } | null>(null);

  useEffect(() => {
    const initializeParams = async () => {
      const resolvedParams = await params;
      setProjectId(resolvedParams.id);
    };
    
    initializeParams();
    
    // Permitir acceso en modo demo - no redirigir a login
    // if (status !== 'loading' && !session) {
    //   router.push('/login');
    // }
    cargarConfiguracion();
  }, [status, session, router, params]);

  // Recalcular presupuesto cuando cambie la configuración
  useEffect(() => {
    if (configuracion) {
      calcularPresupuesto(configuracion);
    }
  }, [configuracion]);

  const obtenerRequerimientosProyecto = () => {
    // Obtener requerimientos guardados o usar valores por defecto
    try {
      const requerimientos = localStorage.getItem(`requerimientos_${projectId}`);
      if (requerimientos) {
        return JSON.parse(requerimientos);
      }
    } catch (error) {
      console.error('Error al obtener requerimientos:', error);
    }

    // Valores por defecto
    return {
      nombre: `Proyecto ${projectId}`,
      descripcion: 'Descripción del proyecto',
      tipoProyecto: 'web-app',
      alcance: 'completo',
      usuarios: '100-1000',
      complejidad: 'media',
      plazo: '3-6',
      presupuestoReferencia: '50000-100000',
      caracteristicasEspeciales: []
    };
  };

  const cargarConfiguracion = async () => {
    try {
      setLoading(true);
      
      // Obtener requerimientos del proyecto para conocer el tipo
      const requerimientos = obtenerRequerimientosProyecto();
      
      // Cargar tecnologías disponibles desde la API, filtradas por tipo de proyecto
      const response = await fetch(`/api/tecnologias?tipoProyecto=${requerimientos.tipoProyecto || 'web-app'}`);
      if (response.ok) {
        const resultado = await response.json();
        const tecnologiasDisponibles = resultado.data || [];
        
        // Filtrar tecnologías según el tipo de proyecto usando la función local
        const tecnologiasFiltradas = getTecnologiasPorTipoProyecto(requerimientos.tipoProyecto || 'web-app');
        
        // Cargar configuración existente o crear nueva
        const configExistente = obtenerConfiguracionGuardada();
        
        if (configExistente) {
          setConfiguracion(configExistente);
        } else {
          // Crear configuración inicial con tecnologías recomendadas según el tipo de proyecto
          const configInicial = crearConfiguracionInicial(tecnologiasFiltradas);
          setConfiguracion(configInicial);
        }
        
        // Establecer tecnologías disponibles para cada categoría
        setTecnologiasDisponibles(tecnologiasFiltradas);
      } else {
        console.error('Error al cargar tecnologías');
        // Fallback: usar tecnologías locales
        const tecnologiasFiltradas = getTecnologiasPorTipoProyecto(requerimientos.tipoProyecto || 'web-app');
        setTecnologiasDisponibles(tecnologiasFiltradas);
        
        const configExistente = obtenerConfiguracionGuardada();
        if (configExistente) {
          setConfiguracion(configExistente);
        } else {
          const configInicial = crearConfiguracionInicial(tecnologiasFiltradas);
          setConfiguracion(configInicial);
        }
      }
    } catch (error) {
      console.error('Error al cargar configuración:', error);
      // Usar configuración de ejemplo si hay error
      setConfiguracion(obtenerConfiguracionEjemplo());
    } finally {
      setLoading(false);
    }
  };

  const obtenerConfiguracionGuardada = () => {
    try {
      const configuracionGuardada = localStorage.getItem(`configuracion_${projectId}`);
      return configuracionGuardada ? JSON.parse(configuracionGuardada) : null;
    } catch (error) {
      console.error('Error al obtener configuración guardada:', error);
      return null;
    }
  };

  const crearConfiguracionInicial = (tecnologiasPorCategoria: any) => {
    const config: ConfiguracionSimulador = {
      frontend: [],
      backend: [],
      database: [],
      mobile: [],
      gaming: [],
      infrastructure: [],
      tools: [],
      security: [],
      design: [],
      roles: [],
      extras: {
        gestion: 15,
        testing: 10,
        deployment: 5,
        maintenance: 8,
        contingency: 5
      }
    };

    // Agregar tecnologías recomendadas por defecto según el tipo de proyecto
    Object.keys(tecnologiasPorCategoria).forEach(categoria => {
      const tecnologiasCategoria = tecnologiasPorCategoria[categoria];
      if (Array.isArray(tecnologiasCategoria) && tecnologiasCategoria.length > 0) {
        // Verificar que la categoría existe en la configuración
        if (config[categoria as keyof ConfiguracionSimulador] && Array.isArray(config[categoria as keyof ConfiguracionSimulador])) {
          const tecnologiasRecomendadas = tecnologiasCategoria.filter((tech: any) => tech.recomendada).slice(0, 2);
          (config[categoria as keyof ConfiguracionSimulador] as any[]).push(...tecnologiasRecomendadas);
        }
      }
    });

    return config;
  };

  const guardarConfiguracion = async () => {
    try {
      if (!configuracion) return;

      // Guardar en localStorage
      localStorage.setItem(`configuracion_${projectId}`, JSON.stringify(configuracion));

      // Obtener requerimientos del proyecto
      const requerimientos = obtenerRequerimientosProyecto();
      
      // Crear estructura de datos para el motor de cálculo
      const configuracionTecnologica = {
        frontend: configuracion.frontend.map(t => t.id),
        backend: configuracion.backend.map(t => t.id),
        database: configuracion.database.map(t => t.id),
        mobile: configuracion.mobile.map(t => t.id),
        gaming: configuracion.gaming.map(t => t.id),
        infrastructure: configuracion.infrastructure.map(t => t.id),
        tools: configuracion.tools.map(t => t.id),
        security: configuracion.security.map(t => t.id),
        design: configuracion.design.map(t => t.id)
      };

      // Guardar datos completos para la simulación
      const datosSimulacion = {
        requerimientos,
        configuracion: configuracionTecnologica
      };

      localStorage.setItem(`simulacion_${projectId}`, JSON.stringify(datosSimulacion));

      // Redirigir a resultados
      router.push(`/simulador/${projectId}/resultados`);
    } catch (error) {
      console.error('Error al guardar configuración:', error);
    }
  };

  const obtenerConfiguracionEjemplo = (): ConfiguracionSimulador => {
    // Obtener requerimientos del proyecto
    const requerimientos = obtenerRequerimientosProyecto();
    
    // Obtener tecnologías filtradas según el tipo de proyecto
    const tecnologiasFiltradas = getTecnologiasPorTipoProyecto(requerimientos.tipoProyecto || 'web-app');
    
    // Crear configuración inicial con las tecnologías filtradas
    return crearConfiguracionInicial(tecnologiasFiltradas);
  };

  const calcularPresupuesto = (config: ConfiguracionSimulador) => {
    let total = 0;
    
    // Sumar costos de tecnologías (convertir a soles peruanos)
    const todasTecnologias = [
      ...config.frontend,
      ...config.backend,
      ...config.database,
      ...config.mobile,
      ...config.gaming,
      ...config.infrastructure,
      ...config.tools,
      ...config.security,
      ...config.design
    ];
    
    todasTecnologias.forEach(tech => {
      let costoTech = 0;
      if (tech.unidad === 'mes') {
        costoTech = tech.precio * 12; // Año completo
      } else if (tech.unidad === 'usuario/mes') {
        costoTech = tech.precio * 5 * 12; // 5 usuarios por año
      } else if (tech.unidad === 'año') {
        costoTech = tech.precio;
      } else if (tech.unidad === 'proyecto') {
        costoTech = tech.precio;
      }
      
      // Convertir a soles peruanos si es necesario
      total += costoTech;
    });
    
    // Sumar costos de roles (ya en soles peruanos)
    config.roles.forEach(rol => {
      total += rol.horas * rol.tarifaHora * rol.mesesTrabajo;
    });
    
    // Aplicar extras como porcentajes
    const subtotal = total;
    total += (subtotal * config.extras.gestion) / 100;
    total += (subtotal * config.extras.testing) / 100;
    total += (subtotal * config.extras.deployment) / 100;
    total += (subtotal * config.extras.maintenance) / 100;
    total += (subtotal * config.extras.contingency) / 100;
    
    setTotalPresupuesto(Math.round(total));
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0
    }).format(precio);
  };

  const obtenerCategorias = () => {
    const requerimientos = obtenerRequerimientosProyecto();
    const tipoProyecto = requerimientos.tipoProyecto || 'web-app';
    
    const categoriasBase = [
      { id: 'frontend', nombre: 'Frontend', icon: FaCode },
      { id: 'backend', nombre: 'Backend', icon: FaCode },
      { id: 'database', nombre: 'Base de Datos', icon: FaDatabase },
      { id: 'infrastructure', nombre: 'Infraestructura', icon: FaCloud },
      { id: 'tools', nombre: 'Herramientas', icon: FaTools },
      { id: 'security', nombre: 'Seguridad', icon: FaLock },
      { id: 'design', nombre: 'Diseño', icon: FaPalette },
      { id: 'roles', nombre: 'Equipo de Desarrollo', icon: FaUsers }
    ];
    
    // Agregar categoría mobile para proyectos móviles
    if (tipoProyecto === 'mobile-app') {
      categoriasBase.splice(2, 0, { id: 'mobile', nombre: 'Desarrollo Móvil', icon: FaMobileAlt });
    }
    
    // Agregar categoría gaming para proyectos de videojuegos
    if (tipoProyecto === 'game') {
      categoriasBase.splice(2, 0, { id: 'gaming', nombre: 'Gaming/Videojuegos', icon: FaGamepad });
      // También mostrar mobile para gaming móvil
      categoriasBase.splice(3, 0, { id: 'mobile', nombre: 'Gaming Móvil', icon: FaMobileAlt });
    }
    
    return categoriasBase;
  };

  const categorias = obtenerCategorias();

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
                {categoriaActiva === 'roles' ? (
                  // Mostrar equipo de desarrollo
                  configuracion.roles.map((rol) => (
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
                  ))
                ) : (
                  // Mostrar tecnologías
                  configuracion[categoriaActiva as keyof ConfiguracionSimulador] && 
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
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sección de costos adicionales */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Costos Adicionales (Porcentajes)</h2>
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
            <button 
              onClick={guardarConfiguracion}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <FaSave className="w-4 h-4" />
              Guardar Configuración
            </button>
            <button
              onClick={guardarConfiguracion}
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
