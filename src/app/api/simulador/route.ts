import { NextRequest, NextResponse } from 'next/server';
import { MotorCalculoSimulador, RequerimientosProyecto, ConfiguracionTecnologica } from '../../../lib/simulador/motor-calculo';

export async function POST(request: NextRequest) {
  try {
    const { requerimientos, configuracion } = await request.json();

    // Validar datos de entrada
    if (!requerimientos || !configuracion) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    // Calcular presupuesto personalizado con el nuevo motor
    const presupuesto = MotorCalculoSimulador.calcularPresupuesto(
      requerimientos as RequerimientosProyecto,
      configuracion as ConfiguracionTecnologica
    );

    // Generar análisis de riesgos personalizado
    const riesgos = analizarRiesgosPersonalizados(requerimientos, configuracion);

    // Generar métricas de rendimiento esperado
    const metricas = calcularMetricasRendimiento(requerimientos, presupuesto.costoTotal);

    // Generar alternativas tecnológicas
    const alternativas = generarAlternativasTecnologicas(configuracion);

    return NextResponse.json({
      success: true,
      data: {
        presupuesto,
        riesgos,
        metricas,
        alternativas,
        fechaGeneracion: new Date().toISOString(),
        moneda: 'PEN', // Soles peruanos
        configuracionUsada: configuracion,
        requerimientosOriginales: requerimientos
      }
    });

  } catch (error) {
    console.error('Error en cálculo de simulación personalizada:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Datos de ejemplo para simulaciones guardadas
    const simulaciones = [
      {
        id: '1',
        nombre: 'E-commerce Mediano',
        descripcion: 'Plataforma de comercio electrónico con 10,000 productos',
        tipoProyecto: 'ecommerce',
        presupuestoTotal: 85000,
        fechaCreacion: '2025-01-15T10:00:00Z',
        estado: 'completado',
        userId: userId
      },
      {
        id: '2',
        nombre: 'App Móvil Delivery',
        descripcion: 'Aplicación móvil para delivery de comida',
        tipoProyecto: 'mobile-app',
        presupuestoTotal: 65000,
        fechaCreacion: '2025-01-10T14:30:00Z',
        estado: 'borrador',
        userId: userId
      }
    ];

    return NextResponse.json({
      success: true,
      data: simulaciones
    });

  } catch (error) {
    console.error('Error al obtener simulaciones:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Métodos auxiliares para análisis personalizado
function analizarRiesgosPersonalizados(requerimientos: any, configuracion: any) {
  const riesgos = [];
  
  if (requerimientos.complejidad === 'alta') {
    riesgos.push({
      tipo: 'Técnico',
      descripcion: 'Proyecto de alta complejidad puede requerir más tiempo del estimado',
      probabilidad: 'Media',
      impacto: 'Alto',
      mitigacion: 'Desarrollo por fases, testing continuo'
    });
  }
  
  if (requerimientos.plazo === '1-3') {
    riesgos.push({
      tipo: 'Plazo',
      descripcion: 'Plazos muy ajustados pueden afectar la calidad',
      probabilidad: 'Alta',
      impacto: 'Medio',
      mitigacion: 'Priorizar funcionalidades core, MVP iterativo'
    });
  }
  
  if (requerimientos.usuarios === '10000+') {
    riesgos.push({
      tipo: 'Escalabilidad',
      descripcion: 'Gran número de usuarios requiere arquitectura robusta',
      probabilidad: 'Media',
      impacto: 'Alto',
      mitigacion: 'Pruebas de carga, arquitectura distribuida'
    });
  }
  
  if (configuracion.frontend?.length > 2) {
    riesgos.push({
      tipo: 'Tecnológico',
      descripcion: 'Múltiples tecnologías frontend pueden aumentar complejidad',
      probabilidad: 'Media',
      impacto: 'Medio',
      mitigacion: 'Estandarizar stack tecnológico, capacitación del equipo'
    });
  }
  
  return riesgos;
}

function calcularMetricasRendimiento(requerimientos: any, costoTotal: number) {
  return {
    roiEstimado: calcularROI(requerimientos, costoTotal),
    tiempoRecuperacion: calcularTiempoRecuperacion(costoTotal),
    indicadoresClave: generarIndicadoresClave(requerimientos),
    comparativaMercado: compararConMercado(requerimientos.tipoProyecto, costoTotal)
  };
}

function calcularROI(requerimientos: any, costo: number): string {
  // Estimación simple de ROI basada en tipo de proyecto
  const factoresROI: { [key: string]: number } = {
    'ecommerce': 2.5,
    'web-app': 2.0,
    'mobile-app': 1.8,
    'crm-erp': 1.5,
    'analytics': 1.7,
    'api': 1.3
  };
  
  const factor = factoresROI[requerimientos.tipoProyecto] || 1.5;
  const roiAnual = ((costo * factor - costo) / costo) * 100;
  
  return `${Math.round(roiAnual)}% anual estimado`;
}

function calcularTiempoRecuperacion(costo: number): string {
  // Estimación basada en promedios de mercado peruano
  const mesesRecuperacion = Math.ceil(costo / 8000); // Asumiendo 8,000 PEN de beneficio mensual
  return `${Math.min(mesesRecuperacion, 36)} meses`;
}

function generarIndicadoresClave(requerimientos: any): string[] {
  const indicadores = [];
  
  if (requerimientos.tipoProyecto === 'ecommerce') {
    indicadores.push('Tasa de conversión', 'Valor promedio de orden', 'Tiempo de carga');
  } else if (requerimientos.tipoProyecto === 'web-app') {
    indicadores.push('Tiempo de respuesta', 'Usuarios activos', 'Tasa de retención');
  } else if (requerimientos.tipoProyecto === 'mobile-app') {
    indicadores.push('Descargas', 'Usuarios activos diarios', 'Calificación en tienda');
  } else {
    indicadores.push('Tiempo de respuesta', 'Disponibilidad', 'Satisfacción del usuario');
  }
  
  return indicadores;
}

function compararConMercado(tipoProyecto: string, costo: number): string {
  // Rangos de mercado peruano en soles (PEN)
  const rangosPromedio: { [key: string]: { min: number; max: number } } = {
    'ecommerce': { min: 50000, max: 200000 },
    'web-app': { min: 30000, max: 150000 },
    'mobile-app': { min: 40000, max: 180000 },
    'crm-erp': { min: 80000, max: 300000 },
    'analytics': { min: 35000, max: 120000 },
    'api': { min: 20000, max: 80000 }
  };
  
  const rango = rangosPromedio[tipoProyecto] || { min: 30000, max: 120000 };
  
  if (costo < rango.min) {
    return 'Por debajo del promedio del mercado';
  } else if (costo > rango.max) {
    return 'Por encima del promedio del mercado';
  } else {
    return 'Dentro del rango promedio del mercado';
  }
}

function generarAlternativasTecnologicas(configuracion: any): any[] {
  const alternativas = [];
  
  // Alternativas de frontend
  if (configuracion.frontend?.length > 0) {
    const frontendAlt = configuracion.frontend.includes('react') ? 
      ['Vue.js', 'Angular', 'Svelte'] : 
      ['React', 'Vue.js', 'Angular'];
    
    alternativas.push({
      categoria: 'Frontend',
      actual: configuracion.frontend,
      alternativas: frontendAlt,
      impacto: 'Medio',
      razon: 'Diferentes frameworks ofrecen distintas ventajas en rendimiento y ecosistema'
    });
  }
  
  // Alternativas de backend
  if (configuracion.backend?.length > 0) {
    const backendAlt = configuracion.backend.includes('nodejs') ? 
      ['Python Django', 'Java Spring', 'PHP Laravel'] : 
      ['Node.js', 'Python Django', 'Java Spring'];
    
    alternativas.push({
      categoria: 'Backend',
      actual: configuracion.backend,
      alternativas: backendAlt,
      impacto: 'Alto',
      razon: 'La elección del backend afecta significativamente el rendimiento y escalabilidad'
    });
  }
  
  // Alternativas de base de datos
  if (configuracion.database?.length > 0) {
    const dbAlt = configuracion.database.includes('postgresql') ? 
      ['MySQL', 'MongoDB', 'SQLite'] : 
      ['PostgreSQL', 'MySQL', 'MongoDB'];
    
    alternativas.push({
      categoria: 'Base de Datos',
      actual: configuracion.database,
      alternativas: dbAlt,
      impacto: 'Alto',
      razon: 'La elección de la base de datos impacta en rendimiento y escalabilidad'
    });
  }
  
  return alternativas;
}
