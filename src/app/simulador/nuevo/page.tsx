"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaRocket, FaMobile, FaGlobe, FaDatabase, FaCloud, FaShoppingCart, FaUsers, FaChartLine, FaGamepad } from "react-icons/fa";

interface FormularioRequerimientos {
  nombre: string;
  descripcion: string;
  tipoProyecto: string;
  alcance: string;
  usuarios: string;
  complejidad: string;
  plazo: string;
  presupuestoReferencia: string;
  caracteristicasEspeciales: string[];
}

export default function NuevaSimulacionPage() {
  const { data: session, status } = useSession({
    required: false  // Permitir acceso sin autenticación para modo demo
  });
  const router = useRouter();
  const [paso, setPaso] = useState(1);
  const [formulario, setFormulario] = useState<FormularioRequerimientos>({
    nombre: '',
    descripcion: '',
    tipoProyecto: '',
    alcance: '',
    usuarios: '',
    complejidad: '',
    plazo: '',
    presupuestoReferencia: '',
    caracteristicasEspeciales: []
  });

  const tiposProyecto = [
    { id: 'web-app', nombre: 'Aplicación Web', icon: FaGlobe, descripcion: 'Aplicaciones web modernas con backend y frontend' },
    { id: 'mobile-app', nombre: 'Aplicación Móvil', icon: FaMobile, descripcion: 'Apps nativas o híbridas para iOS y Android' },
    { id: 'ecommerce', nombre: 'E-commerce', icon: FaShoppingCart, descripcion: 'Tiendas online y plataformas de comercio electrónico' },
    { id: 'crm-erp', nombre: 'CRM/ERP', icon: FaUsers, descripcion: 'Sistemas de gestión empresarial y relaciones con clientes' },
    { id: 'analytics', nombre: 'Análisis de Datos', icon: FaChartLine, descripcion: 'Plataformas de BI, dashboards y análisis' },
    { id: 'game', nombre: 'Videojuego', icon: FaGamepad, descripcion: 'Desarrollo de videojuegos y aplicaciones interactivas' },
    { id: 'api', nombre: 'API/Backend', icon: FaDatabase, descripcion: 'Servicios web, APIs y sistemas backend' },
    { id: 'cloud', nombre: 'Migración Cloud', icon: FaCloud, descripcion: 'Migración y modernización de infraestructura' }
  ];

  const caracteristicasDisponibles = [
    'Autenticación y autorización',
    'Pagos online',
    'Notificaciones push',
    'Integración con terceros',
    'Análisis y reportes',
    'Gestión de usuarios',
    'Búsqueda avanzada',
    'Funcionalidades offline',
    'Escalabilidad automática',
    'Seguridad avanzada',
    'Integración con redes sociales',
    'Geolocalización',
    'Procesamiento en tiempo real',
    'Machine Learning/IA',
    'Blockchain',
    'IoT Integration'
  ];

  const handleInputChange = (campo: string, valor: string) => {
    setFormulario(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleCaracteristicaToggle = (caracteristica: string) => {
    setFormulario(prev => ({
      ...prev,
      caracteristicasEspeciales: prev.caracteristicasEspeciales.includes(caracteristica)
        ? prev.caracteristicasEspeciales.filter(c => c !== caracteristica)
        : [...prev.caracteristicasEspeciales, caracteristica]
    }));
  };

  const siguientePaso = () => {
    if (paso < 3) {
      setPaso(paso + 1);
    } else {
      // Crear simulación
      crearSimulacion();
    }
  };

  const pasoAnterior = () => {
    if (paso > 1) {
      setPaso(paso - 1);
    }
  };

  const crearSimulacion = async () => {
    try {
      // Aquí iría la lógica para crear la simulación
      console.log('Creando simulación:', formulario);
      // Redirigir al simulador con el ID del proyecto
      router.push('/simulador/1/configurar');
    } catch (error) {
      console.error('Error al crear simulación:', error);
    }
  };

  const puedeAvanzar = () => {
    switch (paso) {
      case 1:
        return formulario.nombre && formulario.descripcion && formulario.tipoProyecto;
      case 2:
        return formulario.alcance && formulario.usuarios && formulario.complejidad;
      case 3:
        return formulario.plazo && formulario.presupuestoReferencia;
      default:
        return false;
    }
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/simulador')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nueva Simulación</h1>
            <p className="text-gray-600 mt-2">Define los requerimientos de tu proyecto TI</p>
          </div>
        </div>

        {/* Progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">Paso {paso} de 3</span>
            <span className="text-sm text-gray-500">
              {paso === 1 ? 'Información básica' : 
               paso === 2 ? 'Alcance y complejidad' : 
               'Restricciones y características'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(paso / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {paso === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Información Básica del Proyecto</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del proyecto *
                </label>
                <input
                  type="text"
                  value={formulario.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  placeholder="Ej: Plataforma E-commerce para PYME"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción del proyecto *
                </label>
                <textarea
                  value={formulario.descripcion}
                  onChange={(e) => handleInputChange('descripcion', e.target.value)}
                  rows={4}
                  placeholder="Describe brevemente el proyecto, sus objetivos y funcionalidades principales..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Tipo de proyecto *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tiposProyecto.map((tipo) => {
                    const Icon = tipo.icon;
                    return (
                      <div
                        key={tipo.id}
                        onClick={() => handleInputChange('tipoProyecto', tipo.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formulario.tipoProyecto === tipo.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-6 h-6 ${
                            formulario.tipoProyecto === tipo.id ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                          <div>
                            <h3 className="font-medium text-gray-900">{tipo.nombre}</h3>
                            <p className="text-sm text-gray-600">{tipo.descripcion}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {paso === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Alcance y Complejidad</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alcance del proyecto *
                </label>
                <select
                  value={formulario.alcance}
                  onChange={(e) => handleInputChange('alcance', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona el alcance</option>
                  <option value="mvp">MVP - Funcionalidades básicas</option>
                  <option value="completo">Producto completo</option>
                  <option value="enterprise">Solución enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número estimado de usuarios *
                </label>
                <select
                  value={formulario.usuarios}
                  onChange={(e) => handleInputChange('usuarios', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona el rango de usuarios</option>
                  <option value="1-100">1-100 usuarios</option>
                  <option value="100-1000">100-1,000 usuarios</option>
                  <option value="1000-10000">1,000-10,000 usuarios</option>
                  <option value="10000+">10,000+ usuarios</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complejidad técnica *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['basica', 'media', 'alta'].map((nivel) => (
                    <div
                      key={nivel}
                      onClick={() => handleInputChange('complejidad', nivel)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all text-center ${
                        formulario.complejidad === nivel
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h3 className="font-medium text-gray-900 capitalize">{nivel}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {nivel === 'basica' ? 'CRUD básico, pocas integraciones' :
                         nivel === 'media' ? 'Lógica moderada, algunas integraciones' :
                         'Algoritmos complejos, múltiples integraciones'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Características especiales (opcional)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {caracteristicasDisponibles.map((caracteristica) => (
                    <label
                      key={caracteristica}
                      className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formulario.caracteristicasEspeciales.includes(caracteristica)}
                        onChange={() => handleCaracteristicaToggle(caracteristica)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{caracteristica}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {paso === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Restricciones y Presupuesto</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plazo deseado *
                </label>
                <select
                  value={formulario.plazo}
                  onChange={(e) => handleInputChange('plazo', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona el plazo</option>
                  <option value="1-3">1-3 meses</option>
                  <option value="3-6">3-6 meses</option>
                  <option value="6-12">6-12 meses</option>
                  <option value="12+">Más de 12 meses</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presupuesto de referencia *
                </label>
                <select
                  value={formulario.presupuestoReferencia}
                  onChange={(e) => handleInputChange('presupuestoReferencia', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona el rango de presupuesto</option>
                  <option value="5000-15000">5,000€ - 15,000€</option>
                  <option value="15000-30000">15,000€ - 30,000€</option>
                  <option value="30000-50000">30,000€ - 50,000€</option>
                  <option value="50000-100000">50,000€ - 100,000€</option>
                  <option value="100000+">100,000€+</option>
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">¿Qué sucede a continuación?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Analizaremos tus requerimientos</li>
                  <li>• Seleccionaremos las tecnologías más adecuadas</li>
                  <li>• Calcularemos costos detallados por categoría</li>
                  <li>• Generaremos diferentes escenarios para comparar</li>
                  <li>• Podrás ajustar variables y exportar la propuesta</li>
                </ul>
              </div>
            </div>
          )}

          {/* Botones de navegación */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <button
              onClick={pasoAnterior}
              disabled={paso === 1}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((numero) => (
                <div
                  key={numero}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    numero === paso
                      ? 'bg-blue-600 text-white'
                      : numero < paso
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {numero}
                </div>
              ))}
            </div>

            <button
              onClick={siguientePaso}
              disabled={!puedeAvanzar()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {paso === 3 ? (
                <>
                  <FaRocket className="w-4 h-4" />
                  Crear Simulación
                </>
              ) : (
                'Siguiente'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
