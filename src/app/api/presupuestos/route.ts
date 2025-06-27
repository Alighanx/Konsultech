import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userEmail = url.searchParams.get("email");
  if (!userEmail) return NextResponse.json({ error: "Email requerido" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  const presupuestos = await prisma.presupuestos.findMany({ where: { userId: user.id }, orderBy: { fechaInicio: "desc" } });
  return NextResponse.json(presupuestos);
}

export async function POST(req: Request) {
  const { email, nombre, montoTotal, fechaInicio, fechaFin } = await req.json();
  if (!email || !nombre || !montoTotal || !fechaInicio || !fechaFin) {
    return NextResponse.json({ error: "Campos incompletos" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  const presupuesto = await prisma.presupuestos.create({
    data: {
      nombre,
      montoTotal: parseFloat(montoTotal),
      fechaInicio: new Date(fechaInicio),
      fechaFin: new Date(fechaFin),
      userId: user.id,
    },
  });

  return NextResponse.json(presupuesto);
}
