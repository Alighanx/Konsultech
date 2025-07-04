import { NextRequest, NextResponse } from 'next/server';
import { 
  TECNOLOGIAS, 
  getTecnologiasPorCategoria, 
  getTecnologiasRecomendadas, 
  buscarTecnologias 
} from '../../../data/tecnologias';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get('categoria');
    const busqueda = searchParams.get('busqueda');
    const recomendadas = searchParams.get('recomendadas');

    let tecnologias = TECNOLOGIAS;

    // Filtrar por categoría
    if (categoria) {
      tecnologias = getTecnologiasPorCategoria(categoria);
    }

    // Filtrar por término de búsqueda
    if (busqueda) {
      tecnologias = buscarTecnologias(busqueda);
    }

    // Filtrar solo recomendadas
    if (recomendadas === 'true') {
      tecnologias = getTecnologiasRecomendadas();
    }

    return NextResponse.json({
      success: true,
      data: tecnologias
    });

  } catch (error) {
    console.error('Error al obtener tecnologías:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { tipoProyecto, complejidad, caracteristicas } = await request.json();

    // Generar recomendaciones automáticas de tecnologías
    const recomendaciones = generarRecomendacionesAutomaticas(
      tipoProyecto,
      complejidad,
      caracteristicas
    );

    return NextResponse.json({
      success: true,
      data: recomendaciones
    });

  } catch (error) {
    console.error('Error al generar recomendaciones:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

function generarRecomendacionesAutomaticas(
  tipoProyecto: string,
  complejidad: string,
  caracteristicas: string[]
): any {
  const recomendaciones: {
    frontend: string[];
    backend: string[];
    database: string[];
    infrastructure: string[];
    tools: string[];
    security: string[];
    design: string[];
  } = {
    frontend: [],
    backend: [],
    database: [],
    infrastructure: [],
    tools: [],
    security: [],
    design: []
  };

  // Recomendaciones según tipo de proyecto
  switch (tipoProyecto) {
    case 'web-app':
      recomendaciones.frontend.push('react', 'nextjs');
      recomendaciones.backend.push('nodejs');
      recomendaciones.database.push('postgresql');
      recomendaciones.infrastructure.push('vercel');
      break;
    
    case 'mobile-app':
      recomendaciones.frontend.push('react-native');
      recomendaciones.backend.push('nodejs');
      recomendaciones.database.push('postgresql');
      recomendaciones.infrastructure.push('aws-ec2');
      break;
    
    case 'ecommerce':
      recomendaciones.frontend.push('react', 'nextjs');
      recomendaciones.backend.push('nodejs');
      recomendaciones.database.push('postgresql');
      recomendaciones.infrastructure.push('aws-ec2');
      recomendaciones.security.push('ssl-cert', 'auth0');
      break;
    
    case 'crm-erp':
      recomendaciones.frontend.push('react');
      recomendaciones.backend.push('java-spring');
      recomendaciones.database.push('postgresql');
      recomendaciones.infrastructure.push('aws-ec2');
      break;
    
    case 'analytics':
      recomendaciones.frontend.push('react');
      recomendaciones.backend.push('python-django');
      recomendaciones.database.push('postgresql');
      recomendaciones.infrastructure.push('aws-ec2');
      break;
    
    default:
      recomendaciones.frontend.push('react');
      recomendaciones.backend.push('nodejs');
      recomendaciones.database.push('postgresql');
      recomendaciones.infrastructure.push('digitalocean');
  }

  // Herramientas estándar
  recomendaciones.tools.push('github', 'docker');
  recomendaciones.design.push('figma');
  recomendaciones.security.push('ssl-cert');

  // Ajustes por complejidad
  if (complejidad === 'alta') {
    recomendaciones.tools.push('docker');
    recomendaciones.security.push('auth0');
  }

  // Ajustes por características especiales
  if (caracteristicas.includes('Pagos online')) {
    recomendaciones.security.push('ssl-cert');
  }

  if (caracteristicas.includes('Escalabilidad automática')) {
    recomendaciones.infrastructure = ['aws-ec2'];
  }

  return recomendaciones;
}
