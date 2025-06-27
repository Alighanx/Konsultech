import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userEmail = url.searchParams.get("email");
  if (!userEmail) return NextResponse.json({ error: "Email requerido" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  const reportes = await prisma.reportes.findMany({ where: { userId: user.id }, orderBy: { fecha: "desc" } });
  return NextResponse.json(reportes);
}

export async function POST(req: Request) {
  const { email, titulo, contenido, fecha } = await req.json();
  if (!email || !titulo || !contenido || !fecha) {
    return NextResponse.json({ error: "Campos incompletos" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  const reporte = await prisma.reportes.create({
    data: {
      titulo,
      contenido,
      fecha: new Date(fecha),
      userId: user.id,
    },
  });

  return NextResponse.json(reporte);
}
