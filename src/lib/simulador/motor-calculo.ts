import { 
  TECNOLOGIAS, 
  ROLES_DESARROLLO, 
  MULTIPLICADORES_COMPLEJIDAD, 
  PORCENTAJES_ADICIONALES,
  Tecnologia 
} from '../../data/tecnologias';

export interface RequerimientosProyecto {
  nombre: string;
  descripcion: string;
  tipoProyecto: string;
  alcance: 'mvp' | 'completo' | 'enterprise';
  usuarios: '1-100' | '100-1000' | '1000-10000' | '10000+';
  complejidad: 'basica' | 'media' | 'alta';
  plazo: '1-3' | '3-6' | '6-12' | '12+';
  presupuestoReferencia: string;
  caracteristicasEspeciales: string[];
}

export interface ConfiguracionTecnologica {
  frontend: string[];
  backend: string[];
  database: string[];
  infrastructure: string[];
  tools: string[];
  security: string[];
  design: string[];
  mobile?: string[];
}

export interface RolProyecto {
  tipo: string;
  nombre: string;
  horasMensuales: number;
  mesesTrabajo: number;
  tarifaHora: number;
  totalHoras: number;
  costoTotal: number;
}

export interface CostosAdicionales {
  gestion: number;
  testing: number;
  deployment: number;
  maintenance: number;
  contingency: number;
  documentation: number;
}

export interface PresupuestoCalculado {
  costoDesarrollo: number;
  costoTecnologias: number;
  costosAdicionales: CostosAdicionales;
  costoTotal: number;
  roles: RolProyecto[];
  tecnologias: Tecnologia[];
  desglose: {
    categoria: string;
    items: {
      nombre: string;
      precio: number;
      unidad: string;
      cantidad: number;
      subtotal: number;
    }[];
    total: number;
  }[];
}

export class MotorCalculoSimulador {
  
  /**
   * Método principal para calcular el presupuesto completo
   */
  static calcularPresupuesto(
    requerimientos: RequerimientosProyecto,
    configuracion: ConfiguracionTecnologica
  ): PresupuestoCalculado {
    // 1. Determinar roles necesarios
    const roles = this.determinarRoles(requerimientos);
    
    // 2. Calcular costo de desarrollo
    const costoDesarrollo = this.calcularCostoDesarrollo(roles, requerimientos);
    
    // 3. Obtener tecnologías seleccionadas
    const tecnologiasSeleccionadas = this.obtenerTecnologiasSeleccionadas(configuracion);
    
    // 4. Calcular costo de tecnologías
    const costoTecnologias = this.calcularCostoTecnologias(tecnologiasSeleccionadas, requerimientos);
    
    // 5. Calcular costos adicionales
    const costosAdicionales = this.calcularCostosAdicionales(costoDesarrollo, requerimientos);
    
    // 6. Calcular costo total
    const costoTotal = costoDesarrollo + costoTecnologias + 
                      Object.values(costosAdicionales).reduce((sum, cost) => sum + cost, 0);
    
    // 7. Generar desglose detallado
    const desglose = this.generarDesglose(roles, tecnologiasSeleccionadas, costosAdicionales);
    
    return {
      costoDesarrollo,
      costoTecnologias,
      costosAdicionales,
      costoTotal,
      roles,
      tecnologias: tecnologiasSeleccionadas,
      desglose
    };
  }

  /**
   * Determina los roles necesarios según el tipo de proyecto
   */
  private static determinarRoles(requerimientos: RequerimientosProyecto): RolProyecto[] {
    const roles: RolProyecto[] = [];
    const multiplicador = MULTIPLICADORES_COMPLEJIDAD[requerimientos.complejidad];
    
    // Roles base según tipo de proyecto
    const rolesBase = this.getRolesBasePorTipo(requerimientos.tipoProyecto);
    
    rolesBase.forEach(rolBase => {
      const tarifaHora = ROLES_DESARROLLO[rolBase.tipo as keyof typeof ROLES_DESARROLLO].tarifa;
      const horasBase = rolBase.horasBase * multiplicador;
      const mesesTrabajo = this.getMesesTrabajoPorPlazo(requerimientos.plazo);
      
      const rol: RolProyecto = {
        tipo: rolBase.tipo,
        nombre: ROLES_DESARROLLO[rolBase.tipo as keyof typeof ROLES_DESARROLLO].descripcion,
        horasMensuales: Math.round(horasBase / mesesTrabajo),
        mesesTrabajo,
        tarifaHora,
        totalHoras: Math.round(horasBase),
        costoTotal: Math.round(horasBase * tarifaHora)
      };
      
      roles.push(rol);
    });
    
    return roles;
  }

  /**
   * Obtiene roles base según el tipo de proyecto
   */
  private static getRolesBasePorTipo(tipoProyecto: string): { tipo: string; horasBase: number }[] {
    const rolesMap: { [key: string]: { tipo: string; horasBase: number }[] } = {
      'web-app': [
        { tipo: 'fullstack-senior', horasBase: 400 },
        { tipo: 'ui-ux-designer', horasBase: 80 },
        { tipo: 'qa-tester', horasBase: 60 }
      ],
      'mobile-app': [
        { tipo: 'fullstack-senior', horasBase: 300 },
        { tipo: 'frontend-specialist', horasBase: 250 },
        { tipo: 'ui-ux-designer', horasBase: 100 },
        { tipo: 'qa-tester', horasBase: 80 }
      ],
      'ecommerce': [
        { tipo: 'fullstack-senior', horasBase: 500 },
        { tipo: 'frontend-specialist', horasBase: 300 },
        { tipo: 'backend-specialist', horasBase: 200 },
        { tipo: 'ui-ux-designer', horasBase: 120 },
        { tipo: 'qa-tester', horasBase: 100 }
      ],
      'crm-erp': [
        { tipo: 'fullstack-senior', horasBase: 600 },
        { tipo: 'backend-specialist', horasBase: 400 },
        { tipo: 'frontend-specialist', horasBase: 300 },
        { tipo: 'ui-ux-designer', horasBase: 100 },
        { tipo: 'qa-tester', horasBase: 120 }
      ],
      'analytics': [
        { tipo: 'fullstack-senior', horasBase: 350 },
        { tipo: 'backend-specialist', horasBase: 300 },
        { tipo: 'ui-ux-designer', horasBase: 80 },
        { tipo: 'qa-tester', horasBase: 60 }
      ],
      'api': [
        { tipo: 'backend-specialist', horasBase: 300 },
        { tipo: 'devops-engineer', horasBase: 100 },
        { tipo: 'qa-automation', horasBase: 80 }
      ],
      'cloud': [
        { tipo: 'devops-engineer', horasBase: 400 },
        { tipo: 'backend-specialist', horasBase: 200 },
        { tipo: 'qa-automation', horasBase: 100 }
      ]
    };
    
    return rolesMap[tipoProyecto] || rolesMap['web-app'];
  }

  /**
   * Calcula meses de trabajo según el plazo
   */
  private static getMesesTrabajoPorPlazo(plazo: string): number {
    switch (plazo) {
      case '1-3': return 2;
      case '3-6': return 4;
      case '6-12': return 8;
      case '12+': return 12;
      default: return 4;
    }
  }

  /**
   * Calcula el costo total de desarrollo
   */
  private static calcularCostoDesarrollo(roles: RolProyecto[], requerimientos: RequerimientosProyecto): number {
    const costoBase = roles.reduce((total, rol) => total + rol.costoTotal, 0);
    
    // Aplicar multiplicador por número de usuarios
    const multiplicadorUsuarios = this.getMultiplicadorUsuarios(requerimientos.usuarios);
    
    return Math.round(costoBase * multiplicadorUsuarios);
  }

  /**
   * Obtiene multiplicador según número de usuarios
   */
  private static getMultiplicadorUsuarios(usuarios: string): number {
    switch (usuarios) {
      case '1-100': return 1.0;
      case '100-1000': return 1.2;
      case '1000-10000': return 1.4;
      case '10000+': return 1.6;
      default: return 1.0;
    }
  }

  /**
   * Obtiene las tecnologías seleccionadas con sus datos completos
   */
  private static obtenerTecnologiasSeleccionadas(configuracion: ConfiguracionTecnologica): Tecnologia[] {
    const tecnologiasSeleccionadas: Tecnologia[] = [];
    
    Object.values(configuracion).flat().forEach(techId => {
      const tecnologia = TECNOLOGIAS.find((t: Tecnologia) => t.id === techId);
      if (tecnologia) {
        tecnologiasSeleccionadas.push(tecnologia);
      }
    });
    
    return tecnologiasSeleccionadas;
  }

  /**
   * Calcula el costo de tecnologías (licencias, servicios, etc.)
   */
  private static calcularCostoTecnologias(tecnologias: Tecnologia[], requerimientos: RequerimientosProyecto): number {
    let costoTotal = 0;
    const mesesProyecto = this.getMesesTrabajoPorPlazo(requerimientos.plazo);
    
    tecnologias.forEach(tech => {
      if (tech.precio === 0) return;
      
      let costoTech = 0;
      switch (tech.unidad) {
        case 'mes':
          costoTech = tech.precio * mesesProyecto;
          break;
        case 'año':
          costoTech = tech.precio;
          break;
        case 'usuario/mes':
          const usuarios = this.getNumeroUsuarios(requerimientos.usuarios);
          costoTech = tech.precio * usuarios * mesesProyecto;
          break;
        case 'usuario/año':
          const usuariosAnual = this.getNumeroUsuarios(requerimientos.usuarios);
          costoTech = tech.precio * usuariosAnual;
          break;
        case 'proyecto':
          costoTech = tech.precio;
          break;
      }
      
      costoTotal += costoTech;
    });
    
    return Math.round(costoTotal);
  }

  /**
   * Obtiene número aproximado de usuarios para cálculos
   */
  private static getNumeroUsuarios(rangoUsuarios: string): number {
    switch (rangoUsuarios) {
      case '1-100': return 5;
      case '100-1000': return 10;
      case '1000-10000': return 15;
      case '10000+': return 20;
      default: return 5;
    }
  }

  /**
   * Calcula costos adicionales (gestión, testing, etc.)
   */
  private static calcularCostosAdicionales(costoDesarrollo: number, requerimientos: RequerimientosProyecto): CostosAdicionales {
    const base = costoDesarrollo;
    
    return {
      gestion: Math.round(base * (PORCENTAJES_ADICIONALES.gestion / 100)),
      testing: Math.round(base * (PORCENTAJES_ADICIONALES.testing / 100)),
      deployment: Math.round(base * (PORCENTAJES_ADICIONALES.deployment / 100)),
      maintenance: Math.round(base * (PORCENTAJES_ADICIONALES.maintenance / 100)),
      contingency: Math.round(base * (PORCENTAJES_ADICIONALES.contingency / 100)),
      documentation: Math.round(base * (PORCENTAJES_ADICIONALES.documentation / 100))
    };
  }

  /**
   * Genera desglose detallado para mostrar en resultados
   */
  private static generarDesglose(roles: RolProyecto[], tecnologias: Tecnologia[], costosAdicionales: CostosAdicionales): any[] {
    const desglose: any[] = [];
    
    // Desglose de desarrollo
    const itemsDesarrollo = roles.map(rol => ({
      nombre: rol.nombre,
      precio: rol.tarifaHora,
      unidad: 'hora',
      cantidad: rol.totalHoras,
      subtotal: rol.costoTotal
    }));
    
    desglose.push({
      categoria: 'Desarrollo',
      items: itemsDesarrollo,
      total: itemsDesarrollo.reduce((sum, item) => sum + item.subtotal, 0)
    });
    
    // Desglose de tecnologías
    const itemsTecnologias = tecnologias
      .filter(tech => tech.precio > 0)
      .map(tech => ({
        nombre: tech.nombre,
        precio: tech.precio,
        unidad: tech.unidad,
        cantidad: this.getCantidadTecnologia(tech),
        subtotal: tech.precio * this.getCantidadTecnologia(tech)
      }));
    
    if (itemsTecnologias.length > 0) {
      desglose.push({
        categoria: 'Tecnologías y Licencias',
        items: itemsTecnologias,
        total: itemsTecnologias.reduce((sum, item) => sum + item.subtotal, 0)
      });
    }
    
    // Desglose de costos adicionales
    const itemsAdicionales = Object.entries(costosAdicionales).map(([key, value]) => ({
      nombre: this.getNombreCostoAdicional(key),
      precio: 0,
      unidad: 'porcentaje',
      cantidad: PORCENTAJES_ADICIONALES[key as keyof typeof PORCENTAJES_ADICIONALES],
      subtotal: value
    }));
    
    desglose.push({
      categoria: 'Costos Adicionales',
      items: itemsAdicionales,
      total: Object.values(costosAdicionales).reduce((sum, cost) => sum + cost, 0)
    });
    
    return desglose;
  }

  /**
   * Calcula cantidad para tecnologías según su tipo
   */
  private static getCantidadTecnologia(tech: Tecnologia): number {
    switch (tech.unidad) {
      case 'mes':
        return 12; // Un año
      case 'año':
        return 1;
      case 'usuario/mes':
        return 60; // 5 usuarios x 12 meses
      case 'usuario/año':
        return 5; // 5 usuarios
      case 'proyecto':
        return 1;
      default:
        return 1;
    }
  }

  /**
   * Obtiene nombre legible para costos adicionales
   */
  private static getNombreCostoAdicional(key: string): string {
    const nombres: { [key: string]: string } = {
      gestion: 'Gestión de Proyecto',
      testing: 'Testing y QA',
      deployment: 'Despliegue y Configuración',
      maintenance: 'Mantenimiento (1er año)',
      contingency: 'Contingencias',
      documentation: 'Documentación'
    };
    
    return nombres[key] || key;
  }

  /**
   * Genera recomendaciones automáticas
   */
  static generarRecomendaciones(requerimientos: RequerimientosProyecto, presupuesto: PresupuestoCalculado): string[] {
    const recomendaciones: string[] = [];
    
    // Recomendaciones por tipo de proyecto
    const recProyecto = this.getRecomendacionesPorTipo(requerimientos.tipoProyecto);
    recomendaciones.push(...recProyecto);
    
    // Recomendaciones por presupuesto
    if (presupuesto.costoTotal > 50000) {
      recomendaciones.push('Considerar dividir el proyecto en fases para distribuir la inversión');
    }
    
    // Recomendaciones por complejidad
    if (requerimientos.complejidad === 'alta') {
      recomendaciones.push('Incluir un arquitecto de software para proyectos de alta complejidad');
      recomendaciones.push('Considerar un período de discovery adicional para reducir riesgos');
    }
    
    return recomendaciones;
  }

  /**
   * Obtiene recomendaciones según tipo de proyecto
   */
  private static getRecomendacionesPorTipo(tipoProyecto: string): string[] {
    const recomendaciones: { [key: string]: string[] } = {
      'web-app': [
        'Utilizar React o Vue.js para una interfaz moderna y mantenible',
        'Implementar autenticación desde el inicio para mejorar la seguridad'
      ],
      'mobile-app': [
        'Considerar React Native o Flutter para desarrollo multiplataforma',
        'Planificar las pruebas en dispositivos reales desde las primeras fases'
      ],
      'ecommerce': [
        'Implementar pasarelas de pago seguras y certificadas',
        'Incluir análisis de conversión y métricas de ventas desde el inicio'
      ],
      'crm-erp': [
        'Diseñar una arquitectura escalable para manejar grandes volúmenes de datos',
        'Incluir capacidades de integración con sistemas existentes'
      ]
    };
    
    return recomendaciones[tipoProyecto] || [];
  }

  /**
   * Genera escenarios de comparación
   */
  static generarEscenarios(requerimientos: RequerimientosProyecto): any[] {
    const escenarios = [];
    
    // Escenario básico (MVP)
    const reqBasico = { ...requerimientos, complejidad: 'basica' as const, alcance: 'mvp' as const };
    const presupuestoBasico = this.calcularPresupuestoSimplificado(reqBasico);
    
    escenarios.push({
      escenario: 'Básico (MVP)',
      presupuesto: presupuestoBasico,
      plazo: this.getPlazoEstimado(reqBasico),
      descripcion: 'Funcionalidades esenciales para validar el mercado'
    });
    
    // Escenario estándar (actual)
    const presupuestoEstandar = this.calcularPresupuestoSimplificado(requerimientos);
    
    escenarios.push({
      escenario: 'Estándar',
      presupuesto: presupuestoEstandar,
      plazo: this.getPlazoEstimado(requerimientos),
      descripcion: 'Desarrollo completo según especificaciones'
    });
    
    // Escenario premium
    const reqPremium = { ...requerimientos, complejidad: 'alta' as const, alcance: 'enterprise' as const };
    const presupuestoPremium = this.calcularPresupuestoSimplificado(reqPremium);
    
    escenarios.push({
      escenario: 'Premium',
      presupuesto: presupuestoPremium,
      plazo: this.getPlazoEstimado(reqPremium),
      descripcion: 'Desarrollo avanzado con características enterprise'
    });
    
    return escenarios;
  }

  /**
   * Calcula presupuesto simplificado para comparaciones
   */
  private static calcularPresupuestoSimplificado(requerimientos: RequerimientosProyecto): number {
    const multiplicador = MULTIPLICADORES_COMPLEJIDAD[requerimientos.complejidad];
    const baseHoras = this.getHorasBasePorTipo(requerimientos.tipoProyecto);
    const tarifaPromedio = 40; // EUR/hora promedio
    
    const costoDesarrollo = baseHoras * multiplicador * tarifaPromedio;
    const costoTecnologias = this.getCostoTecnologiasPromedio(requerimientos.tipoProyecto);
    const costosAdicionales = costoDesarrollo * 0.4; // 40% adicional
    
    return Math.round(costoDesarrollo + costoTecnologias + costosAdicionales);
  }

  /**
   * Obtiene horas base por tipo de proyecto
   */
  private static getHorasBasePorTipo(tipoProyecto: string): number {
    const horas: { [key: string]: number } = {
      'web-app': 400,
      'mobile-app': 500,
      'ecommerce': 600,
      'crm-erp': 800,
      'analytics': 450,
      'api': 300,
      'cloud': 350
    };
    
    return horas[tipoProyecto] || 400;
  }

  /**
   * Obtiene costo promedio de tecnologías por tipo
   */
  private static getCostoTecnologiasPromedio(tipoProyecto: string): number {
    const costos: { [key: string]: number } = {
      'web-app': 2000,
      'mobile-app': 1500,
      'ecommerce': 3000,
      'crm-erp': 4000,
      'analytics': 2500,
      'api': 1000,
      'cloud': 2000
    };
    
    return costos[tipoProyecto] || 2000;
  }

  /**
   * Obtiene plazo estimado según requerimientos
   */
  private static getPlazoEstimado(requerimientos: RequerimientosProyecto): string {
    const meses = this.getMesesTrabajoPorPlazo(requerimientos.plazo);
    const multiplicador = MULTIPLICADORES_COMPLEJIDAD[requerimientos.complejidad];
    const mesesAjustados = Math.round(meses * multiplicador);
    
    if (mesesAjustados <= 3) return '2-3 meses';
    if (mesesAjustados <= 6) return '4-6 meses';
    if (mesesAjustados <= 12) return '6-12 meses';
    return '12+ meses';
  }
}
