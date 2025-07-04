import { NextRequest, NextResponse } from 'next/server';
import { MotorCalculoSimulador, RequerimientosProyecto, ConfiguracionTecnologica } from '../../../lib/simulador/motor-calculo';

export async function POST(request: NextRequest) {
  try {
    const { requerimientos, configuracion } = await request.json();

    // Validar datos de entrada
    if (!requerimientos || !configuracion) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    // Calcular presupuesto
    const presupuesto = MotorCalculoSimulador.calcularPresupuesto(
      requerimientos as RequerimientosProyecto,
      configuracion as ConfiguracionTecnologica
    );

    // Generar recomendaciones
    const recomendaciones = MotorCalculoSimulador.generarRecomendaciones(
      requerimientos as RequerimientosProyecto,
      presupuesto
    );

    // Generar escenarios de comparación
    const escenarios = MotorCalculoSimulador.generarEscenarios(
      requerimientos as RequerimientosProyecto
    );

    return NextResponse.json({
      success: true,
      data: {
        presupuesto,
        recomendaciones,
        escenarios,
        fechaGeneracion: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error en cálculo de simulación:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Datos de ejemplo
    const simulaciones = [
      {
        id: '1',
        nombre: 'E-commerce Mediano',
        descripcion: 'Plataforma de comercio electrónico con 10,000 productos',
        tipoProyecto: 'ecommerce',
        presupuestoTotal: 45000,
        fechaCreacion: '2025-01-15T10:00:00Z',
        estado: 'completado',
        userId: userId
      },
      {
        id: '2',
        nombre: 'App Móvil Delivery',
        descripcion: 'Aplicación móvil para delivery de comida',
        tipoProyecto: 'mobile-app',
        presupuestoTotal: 32000,
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
