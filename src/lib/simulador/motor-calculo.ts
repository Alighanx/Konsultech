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
  tarifaHora: number; // En soles peruanos (PEN)
  totalHoras: number;
  costoTotal: number; // En soles peruanos (PEN)
}

export interface CostosAdicionales {
  gestion: number;     // En soles peruanos (PEN)
  testing: number;     // En soles peruanos (PEN)
  deployment: number;  // En soles peruanos (PEN)
  maintenance: number; // En soles peruanos (PEN)
  contingency: number; // En soles peruanos (PEN)
  documentation: number; // En soles peruanos (PEN)
}

export interface PresupuestoCalculado {
  costoDesarrollo: number;      // En soles peruanos (PEN)
  costoTecnologias: number;     // En soles peruanos (PEN)
  costosAdicionales: CostosAdicionales;
  costoTotal: number;           // En soles peruanos (PEN)
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
  factores?: {
    complejidad: number;
    escala: number;
    plazo: number;
    caracteristicas: number;
  };
  resumen?: {
    titulo: string;
    descripcion: string;
    tipoProyecto: string;
    complejidad: string;
    tecnologias: number;
    plazoEstimado: string;
    rangoUsuarios: string;
    presupuestoTotal: number;
    fechaGeneracion: string;
    recomendacion: string;
  };
  comparativa?: {
    escenario: string;
    presupuesto: number;
    plazo: string;
    descripcion: string;
  }[];
  recomendaciones?: string[];
}

export class MotorCalculoSimulador {
  
  /**
   * Método principal para calcular presupuesto personalizado y dinámico
   */
  static calcularPresupuesto(
    requerimientos: RequerimientosProyecto,
    configuracion: ConfiguracionTecnologica
  ): PresupuestoCalculado {
    
    // 1. Determinar roles específicos según tecnologías seleccionadas
    const roles = this.determinarRolesPorTecnologias(requerimientos, configuracion);
    
    // 2. Calcular costo de desarrollo
    const costoDesarrollo = this.calcularCostoDesarrollo(roles, requerimientos);
    
    // 3. Obtener tecnologías con precios en soles
    const tecnologiasSeleccionadas = this.obtenerTecnologiasSeleccionadas(configuracion);
    
    // 4. Calcular costo real de infraestructura tecnológica
    const costoTecnologias = this.calcularCostoTecnologias(tecnologiasSeleccionadas, requerimientos);
    
    // 5. Calcular costos adicionales proporcionales
    const costosAdicionales = this.calcularCostosAdicionales(costoDesarrollo, requerimientos);
    
    // 6. Calcular factores de ajuste
    const factores = this.calcularFactores(requerimientos);
    
    // 7. Calcular costo total ajustado
    const subtotal = (costoDesarrollo + costoTecnologias) * factores.complejidad * factores.escala * factores.plazo * factores.caracteristicas;
    const costosAdicionalesTotal = Object.values(costosAdicionales).reduce((sum, cost) => sum + cost, 0);
    const costoSinImpuestos = subtotal + costosAdicionalesTotal;
    const igv = costoSinImpuestos * 0.18; // IGV Perú 18%
    const costoTotal = costoSinImpuestos + igv;
    
    // 8. Generar desglose detallado
    const desglose = this.generarDesglose(roles, tecnologiasSeleccionadas, costosAdicionales, igv);
    
    // 9. Generar datos adicionales
    const resumen = this.generarResumen(requerimientos, configuracion, costoTotal);
    const comparativa = this.generarEscenarios(requerimientos);
    const recomendaciones = this.generarRecomendaciones(requerimientos, configuracion);

    return {
      costoDesarrollo: Math.round(costoDesarrollo * factores.complejidad * factores.escala * factores.plazo * factores.caracteristicas),
      costoTecnologias: Math.round(costoTecnologias),
      costosAdicionales,
      costoTotal: Math.round(costoTotal),
      roles,
      tecnologias: tecnologiasSeleccionadas,
      desglose,
      factores,
      resumen,
      comparativa,
      recomendaciones
    };
  }

  /**
   * Determina roles específicos según las tecnologías seleccionadas
   */
  private static determinarRolesPorTecnologias(
    requerimientos: RequerimientosProyecto, 
    configuracion: ConfiguracionTecnologica
  ): RolProyecto[] {
    const roles: RolProyecto[] = [];
    const mesesTrabajo = this.getMesesTrabajoPorPlazo(requerimientos.plazo);
    
    // Frontend Developer
    if (configuracion.frontend.length > 0) {
      const horasFrontend = this.calcularHorasPorTecnologias(configuracion.frontend, 'frontend', requerimientos);
      const tarifaFrontend = this.getTarifaHoraPorTecnologia(configuracion.frontend);
      
      roles.push({
        tipo: 'Frontend Developer',
        nombre: `Desarrollador Frontend (${configuracion.frontend.join(', ')})`,
        horasMensuales: Math.round(horasFrontend / mesesTrabajo),
        mesesTrabajo,
        tarifaHora: tarifaFrontend,
        totalHoras: horasFrontend,
        costoTotal: horasFrontend * tarifaFrontend
      });
    }
    
    // Backend Developer
    if (configuracion.backend.length > 0) {
      const horasBackend = this.calcularHorasPorTecnologias(configuracion.backend, 'backend', requerimientos);
      const tarifaBackend = this.getTarifaHoraPorTecnologia(configuracion.backend);
      
      roles.push({
        tipo: 'Backend Developer',
        nombre: `Desarrollador Backend (${configuracion.backend.join(', ')})`,
        horasMensuales: Math.round(horasBackend / mesesTrabajo),
        mesesTrabajo,
        tarifaHora: tarifaBackend,
        totalHoras: horasBackend,
        costoTotal: horasBackend * tarifaBackend
      });
    }
    
    // Database Administrator
    if (configuracion.database.length > 0) {
      const horasDB = this.calcularHorasPorTecnologias(configuracion.database, 'database', requerimientos);
      const tarifaDB = this.getTarifaHoraPorTecnologia(configuracion.database);
      
      roles.push({
        tipo: 'Database Administrator',
        nombre: `Administrador de BD (${configuracion.database.join(', ')})`,
        horasMensuales: Math.round(horasDB / mesesTrabajo),
        mesesTrabajo,
        tarifaHora: tarifaDB,
        totalHoras: horasDB,
        costoTotal: horasDB * tarifaDB
      });
    }
    
    // DevOps Engineer
    if (configuracion.infrastructure.length > 0 || requerimientos.complejidad === 'alta') {
      const horasDevOps = this.calcularHorasPorTecnologias(configuracion.infrastructure, 'infrastructure', requerimientos);
      const tarifaDevOps = 180; // PEN por hora
      
      roles.push({
        tipo: 'DevOps Engineer',
        nombre: `Ingeniero DevOps (${configuracion.infrastructure.join(', ')})`,
        horasMensuales: Math.round(horasDevOps / mesesTrabajo),
        mesesTrabajo,
        tarifaHora: tarifaDevOps,
        totalHoras: horasDevOps,
        costoTotal: horasDevOps * tarifaDevOps
      });
    }
    
    // UI/UX Designer
    if (configuracion.design.length > 0 || requerimientos.tipoProyecto.includes('web') || requerimientos.tipoProyecto.includes('mobile')) {
      const horasDesign = this.calcularHorasDesign(requerimientos);
      const tarifaDesign = 120; // PEN por hora
      
      roles.push({
        tipo: 'UI/UX Designer',
        nombre: `Diseñador UI/UX`,
        horasMensuales: Math.round(horasDesign / mesesTrabajo),
        mesesTrabajo,
        tarifaHora: tarifaDesign,
        totalHoras: horasDesign,
        costoTotal: horasDesign * tarifaDesign
      });
    }
    
    // QA Tester
    const horasQA = this.calcularHorasQA(requerimientos);
    const tarifaQA = 80; // PEN por hora
    
    roles.push({
      tipo: 'QA Tester',
      nombre: `Especialista en QA`,
      horasMensuales: Math.round(horasQA / mesesTrabajo),
      mesesTrabajo,
      tarifaHora: tarifaQA,
      totalHoras: horasQA,
      costoTotal: horasQA * tarifaQA
    });
    
    return roles;
  }

  /**
   * Calcula horas necesarias según las tecnologías específicas seleccionadas
   */
  private static calcularHorasPorTecnologias(tecnologias: string[], categoria: string, requerimientos: RequerimientosProyecto): number {
    let horasBase = this.getHorasBasePorCategoria(categoria);
    
    // Ajustar según la complejidad de las tecnologías seleccionadas
    tecnologias.forEach(tech => {
      const tecnologia = TECNOLOGIAS.find(t => t.id === tech || t.nombre.toLowerCase().includes(tech.toLowerCase()));
      if (tecnologia) {
        switch (tecnologia.complejidad) {
          case 'alta':
            horasBase += 60;
            break;
          case 'media':
            horasBase += 30;
            break;
          case 'baja':
            horasBase += 15;
            break;
        }
      }
    });
    
    // Ajustar según alcance y complejidad del proyecto
    const multiplicadorAlcance = this.getMultiplicadorAlcance(requerimientos.alcance);
    const multiplicadorComplejidad = this.getMultiplicadorComplejidad(requerimientos.complejidad);
    
    return Math.round(horasBase * multiplicadorAlcance * multiplicadorComplejidad);
  }

  /**
   * Obtiene horas base por categoría de tecnología
   */
  private static getHorasBasePorCategoria(categoria: string): number {
    const horasBase: { [key: string]: number } = {
      'frontend': 200,
      'backend': 250,
      'database': 100,
      'infrastructure': 120,
      'tools': 50,
      'security': 80,
      'design': 100,
      'mobile': 200
    };
    
    return horasBase[categoria] || 100;
  }

  /**
   * Calcula horas específicas para diseño
   */
  private static calcularHorasDesign(requerimientos: RequerimientosProyecto): number {
    let horasBase = 80;
    
    switch (requerimientos.tipoProyecto) {
      case 'ecommerce':
        horasBase = 150;
        break;
      case 'web-app':
        horasBase = 120;
        break;
      case 'mobile-app':
        horasBase = 140;
        break;
      case 'crm-erp':
        horasBase = 100;
        break;
      default:
        horasBase = 80;
    }
    
    // Ajustar según complejidad
    const multiplicador = this.getMultiplicadorComplejidad(requerimientos.complejidad);
    return Math.round(horasBase * multiplicador);
  }

  /**
   * Calcula horas específicas para QA
   */
  private static calcularHorasQA(requerimientos: RequerimientosProyecto): number {
    let horasBase = 60;
    
    switch (requerimientos.complejidad) {
      case 'alta':
        horasBase = 120;
        break;
      case 'media':
        horasBase = 80;
        break;
      case 'basica':
        horasBase = 50;
        break;
    }
    
    // Ajustar según alcance
    const multiplicador = this.getMultiplicadorAlcance(requerimientos.alcance);
    return Math.round(horasBase * multiplicador);
  }

  /**
   * Obtiene tarifa por hora según las tecnologías seleccionadas
   */
  private static getTarifaHoraPorTecnologia(tecnologias: string[]): number {
    let tarifaBase = 120; // PEN por hora base
    
    tecnologias.forEach(tech => {
      const tecnologia = TECNOLOGIAS.find(t => t.id === tech || t.nombre.toLowerCase().includes(tech.toLowerCase()));
      if (tecnologia) {
        // Ajustar tarifa según popularidad y complejidad
        if (tecnologia.popularidad >= 4 && tecnologia.complejidad === 'alta') {
          tarifaBase += 30;
        } else if (tecnologia.complejidad === 'alta') {
          tarifaBase += 20;
        } else if (tecnologia.popularidad >= 4) {
          tarifaBase += 15;
        }
      }
    });
    
    return Math.min(tarifaBase, 200); // Máximo 200 PEN por hora
  }

  /**
   * Calcula el costo total de desarrollo
   */
  private static calcularCostoDesarrollo(roles: RolProyecto[], requerimientos: RequerimientosProyecto): number {
    return roles.reduce((total, rol) => total + rol.costoTotal, 0);
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
   * Calcula costos adicionales proporcionales
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
   * Calcula todos los factores de ajuste
   */
  private static calcularFactores(requerimientos: RequerimientosProyecto): any {
    return {
      complejidad: this.getMultiplicadorComplejidad(requerimientos.complejidad),
      escala: this.getMultiplicadorEscala(requerimientos.usuarios, requerimientos.alcance),
      plazo: this.getMultiplicadorPlazo(requerimientos.plazo),
      caracteristicas: this.getMultiplicadorCaracteristicas(requerimientos.caracteristicasEspeciales)
    };
  }

  /**
   * Obtiene multiplicador por complejidad
   */
  private static getMultiplicadorComplejidad(complejidad: string): number {
    return MULTIPLICADORES_COMPLEJIDAD[complejidad as keyof typeof MULTIPLICADORES_COMPLEJIDAD] || 1.0;
  }

  /**
   * Obtiene multiplicador por alcance
   */
  private static getMultiplicadorAlcance(alcance: string): number {
    switch (alcance) {
      case 'mvp': return 0.8;
      case 'completo': return 1.0;
      case 'enterprise': return 1.3;
      default: return 1.0;
    }
  }

  /**
   * Obtiene multiplicador por escala (usuarios + alcance)
   */
  private static getMultiplicadorEscala(usuarios: string, alcance: string): number {
    const factorUsuarios = this.getMultiplicadorUsuarios(usuarios);
    const factorAlcance = this.getMultiplicadorAlcance(alcance);
    
    return factorUsuarios * factorAlcance;
  }

  /**
   * Obtiene multiplicador por número de usuarios
   */
  private static getMultiplicadorUsuarios(usuarios: string): number {
    switch (usuarios) {
      case '1-100': return 1.0;
      case '100-1000': return 1.1;
      case '1000-10000': return 1.25;
      case '10000+': return 1.4;
      default: return 1.0;
    }
  }

  /**
   * Obtiene multiplicador por plazo
   */
  private static getMultiplicadorPlazo(plazo: string): number {
    switch (plazo) {
      case '1-3': return 1.2; // Proyectos urgentes cuestan más
      case '3-6': return 1.0;
      case '6-12': return 0.95;
      case '12+': return 0.9;
      default: return 1.0;
    }
  }

  /**
   * Obtiene multiplicador por características especiales
   */
  private static getMultiplicadorCaracteristicas(caracteristicas: string[]): number {
    let factor = 1.0;
    
    caracteristicas.forEach(caracteristica => {
      switch (caracteristica) {
        case 'alta-seguridad':
          factor += 0.15;
          break;
        case 'tiempo-real':
          factor += 0.12;
          break;
        case 'multi-idioma':
          factor += 0.08;
          break;
        case 'integraciones':
          factor += 0.1;
          break;
        case 'reportes-avanzados':
          factor += 0.06;
          break;
        case 'escalabilidad':
          factor += 0.1;
          break;
      }
    });
    
    return factor;
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
   * Obtiene número aproximado de usuarios para cálculos
   */
  private static getNumeroUsuarios(rangoUsuarios: string): number {
    switch (rangoUsuarios) {
      case '1-100': return 10;
      case '100-1000': return 100;
      case '1000-10000': return 1000;
      case '10000+': return 10000;
      default: return 10;
    }
  }

  /**
   * Genera desglose detallado personalizado
   */
  private static generarDesglose(
    roles: RolProyecto[],
    tecnologias: Tecnologia[],
    costosAdicionales: CostosAdicionales,
    igv: number
  ): any[] {
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
        categoria: 'Licencias y Servicios',
        items: itemsTecnologias,
        total: itemsTecnologias.reduce((sum, item) => sum + item.subtotal, 0)
      });
    }
    
    // Desglose de costos adicionales
    const itemsAdicionales = Object.entries(costosAdicionales)
      .filter(([_, costo]) => costo > 0)
      .map(([tipo, costo]) => ({
        nombre: this.getNombreCostoAdicional(tipo),
        precio: 0,
        unidad: 'porcentaje',
        cantidad: PORCENTAJES_ADICIONALES[tipo as keyof typeof PORCENTAJES_ADICIONALES],
        subtotal: costo
      }));
    
    if (itemsAdicionales.length > 0) {
      desglose.push({
        categoria: 'Gestión y Extras',
        items: itemsAdicionales,
        total: itemsAdicionales.reduce((sum, item) => sum + item.subtotal, 0)
      });
    }
    
    // Agregar IGV
    desglose.push({
      categoria: 'Impuestos',
      items: [{
        nombre: 'IGV (18%)',
        precio: 0,
        unidad: 'porcentaje',
        cantidad: 18,
        subtotal: igv
      }],
      total: igv
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
        return 60; // 10 usuarios x 6 meses promedio
      case 'usuario/año':
        return 10; // 10 usuarios
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
   * Genera resumen personalizado del proyecto
   */
  private static generarResumen(
    requerimientos: RequerimientosProyecto,
    configuracion: ConfiguracionTecnologica,
    costoTotal: number
  ): any {
    const tecnologiasUsadas = Object.values(configuracion).flat().length;
    const plazoTexto = this.getPlazoTexto(requerimientos.plazo);
    const recomendacion = this.generarRecomendacionPersonalizada(requerimientos, configuracion);
    
    return {
      titulo: requerimientos.nombre,
      descripcion: requerimientos.descripcion,
      tipoProyecto: requerimientos.tipoProyecto,
      complejidad: requerimientos.complejidad,
      tecnologias: tecnologiasUsadas,
      plazoEstimado: plazoTexto,
      rangoUsuarios: requerimientos.usuarios,
      presupuestoTotal: costoTotal,
      fechaGeneracion: new Date().toISOString(),
      recomendacion
    };
  }

  /**
   * Genera recomendación personalizada
   */
  private static generarRecomendacionPersonalizada(
    requerimientos: RequerimientosProyecto,
    configuracion: ConfiguracionTecnologica
  ): string {
    const recomendaciones = [];
    
    if (requerimientos.complejidad === 'alta') {
      recomendaciones.push('Considere desarrollo por fases para mitigar riesgos');
    }
    
    if (requerimientos.plazo === '1-3') {
      recomendaciones.push('Implemente un MVP para cumplir con el plazo ajustado');
    }
    
    if (requerimientos.usuarios === '10000+') {
      recomendaciones.push('Priorice arquitectura escalable y pruebas de carga');
    }
    
    if (configuracion.frontend.length > 2) {
      recomendaciones.push('Considere unificar tecnologías frontend para reducir complejidad');
    }
    
    return recomendaciones.join('. ') || 'Proyecto bien estructurado con tecnologías apropiadas';
  }

  /**
   * Genera escenarios de comparación
   */
  private static generarEscenarios(requerimientos: RequerimientosProyecto): any[] {
    const escenarios = [];
    
    // Escenario básico (MVP)
    const reqBasico = { ...requerimientos, complejidad: 'basica' as const, alcance: 'mvp' as const };
    const presupuestoBasico = this.calcularPresupuestoSimplificado(reqBasico);
    
    escenarios.push({
      escenario: 'Básico (MVP)',
      presupuesto: presupuestoBasico,
      plazo: this.getPlazoTexto(reqBasico.plazo),
      descripcion: 'Funcionalidades esenciales para validar el mercado'
    });
    
    // Escenario estándar (actual)
    const presupuestoEstandar = this.calcularPresupuestoSimplificado(requerimientos);
    
    escenarios.push({
      escenario: 'Estándar',
      presupuesto: presupuestoEstandar,
      plazo: this.getPlazoTexto(requerimientos.plazo),
      descripcion: 'Desarrollo completo según especificaciones'
    });
    
    // Escenario premium
    const reqPremium = { ...requerimientos, complejidad: 'alta' as const, alcance: 'enterprise' as const };
    const presupuestoPremium = this.calcularPresupuestoSimplificado(reqPremium);
    
    escenarios.push({
      escenario: 'Premium',
      presupuesto: presupuestoPremium,
      plazo: this.getPlazoTexto(reqPremium.plazo),
      descripcion: 'Desarrollo avanzado con características enterprise'
    });
    
    return escenarios;
  }

  /**
   * Genera recomendaciones específicas
   */
  private static generarRecomendaciones(
    requerimientos: RequerimientosProyecto,
    configuracion: ConfiguracionTecnologica
  ): string[] {
    const recomendaciones: string[] = [];
    
    // Recomendaciones por tipo de proyecto
    const recTipo = this.getRecomendacionesPorTipo(requerimientos.tipoProyecto);
    recomendaciones.push(...recTipo);
    
    // Recomendaciones por complejidad
    if (requerimientos.complejidad === 'alta') {
      recomendaciones.push('Incluir un arquitecto de software para proyectos de alta complejidad');
      recomendaciones.push('Considerar un período de discovery adicional para reducir riesgos');
    }
    
    // Recomendaciones por plazo
    if (requerimientos.plazo === '1-3') {
      recomendaciones.push('Implementar metodología ágil con sprints cortos');
      recomendaciones.push('Priorizar funcionalidades core en el MVP');
    }
    
    // Recomendaciones por tecnologías
    if (configuracion.frontend.length > 2) {
      recomendaciones.push('Evaluar si es necesario usar múltiples tecnologías frontend');
    }
    
    return recomendaciones;
  }

  /**
   * Obtiene recomendaciones por tipo de proyecto
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
   * Calcula presupuesto simplificado para comparaciones
   */
  private static calcularPresupuestoSimplificado(requerimientos: RequerimientosProyecto): number {
    const multiplicador = this.getMultiplicadorComplejidad(requerimientos.complejidad);
    const factorEscala = this.getMultiplicadorEscala(requerimientos.usuarios, requerimientos.alcance);
    const factorPlazo = this.getMultiplicadorPlazo(requerimientos.plazo);
    
    const horasBase = this.getHorasBasePorTipo(requerimientos.tipoProyecto);
    const tarifaPromedio = 130; // PEN/hora promedio
    
    const costoDesarrollo = horasBase * multiplicador * factorEscala * factorPlazo * tarifaPromedio;
    const costoTecnologias = this.getCostoTecnologiasPromedio(requerimientos.tipoProyecto);
    const costosAdicionales = costoDesarrollo * 0.35; // 35% adicional
    
    const subtotal = costoDesarrollo + costoTecnologias + costosAdicionales;
    const igv = subtotal * 0.18;
    
    return Math.round(subtotal + igv);
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
      'cloud': 1800
    };
    
    return costos[tipoProyecto] || 2000;
  }

  /**
   * Obtiene texto descriptivo del plazo
   */
  private static getPlazoTexto(plazo: string): string {
    switch (plazo) {
      case '1-3': return '1-3 meses';
      case '3-6': return '3-6 meses';
      case '6-12': return '6-12 meses';
      case '12+': return 'Más de 12 meses';
      default: return '3-6 meses';
    }
  }
}
