// API para actividades ABC
import { NextRequest, NextResponse } from "next/server";

// Simulación en memoria (reemplazar por base de datos real en producción)
let actividades: ActividadABC[] = [];

export interface ActividadABC {
  id: string;
  nombre: string;
  costo: number;
  driver: string; // Ej: "horas", "número de pedidos", etc.
  cantidad: number;
  proyecto: string; // Proyecto o producto asociado
}

export async function GET(req: NextRequest) {
  const proyecto = req.nextUrl.searchParams.get("proyecto");
  if (proyecto) {
    return NextResponse.json(actividades.filter(a => a.proyecto === proyecto));
  }
  return NextResponse.json(actividades);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const nueva: ActividadABC = {
    id: Math.random().toString(36).substring(2, 10),
    nombre: body.nombre,
    costo: Number(body.costo),
    driver: body.driver,
    cantidad: Number(body.cantidad),
    proyecto: body.proyecto,
  };
  actividades.push(nueva);
  return NextResponse.json(nueva);
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  actividades = actividades.filter(a => a.id !== id);
  return NextResponse.json({ ok: true });
}

// PUT: Actualizar una actividad existente
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, nombre, costo, driver, cantidad, proyecto } = body;
  let actualizada: ActividadABC | undefined;
  actividades = actividades.map(a => {
    if (a.id === id) {
      actualizada = {
        ...a,
        nombre: nombre ?? a.nombre,
        costo: costo !== undefined ? Number(costo) : a.costo,
        driver: driver ?? a.driver,
        cantidad: cantidad !== undefined ? Number(cantidad) : a.cantidad,
        proyecto: proyecto ?? a.proyecto,
      };
      return actualizada;
    }
    return a;
  });
  if (actualizada) {
    return NextResponse.json(actualizada);
  }
  return NextResponse.json({ error: "No se encontró la actividad" }, { status: 404 });
}

// GET: Obtener resumen de costos ABC por proyecto
export async function GET_RESUMEN() {
  // Agrupa actividades por proyecto y suma el costo total ABC
  const resumen: { proyecto: string; costoTotal: number; actividades: ActividadABC[] }[] = [];
  const proyectos = Array.from(new Set(actividades.map(a => a.proyecto)));
  proyectos.forEach(proyecto => {
    const acts = actividades.filter(a => a.proyecto === proyecto);
    const costoTotal = acts.reduce((acc, a) => acc + a.costo * a.cantidad, 0);
    resumen.push({ proyecto, costoTotal, actividades: acts });
  });
  return NextResponse.json(resumen);
}

// GET: Obtener lista de drivers únicos
export async function GET_DRIVERS() {
  const drivers = Array.from(new Set(actividades.map(a => a.driver)));
  return NextResponse.json(drivers);
}

// GET: Obtener lista de proyectos únicos
export async function GET_PROYECTOS() {
  const proyectos = Array.from(new Set(actividades.map(a => a.proyecto)));
  return NextResponse.json(proyectos);
}
