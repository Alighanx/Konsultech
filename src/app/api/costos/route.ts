import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userEmail = url.searchParams.get("email");
  if (!userEmail) return NextResponse.json({ error: "Email requerido" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  const costos = await prisma.costos.findMany({ where: { userId: user.id }, orderBy: { fecha: "desc" } });
  return NextResponse.json(costos);
}

export async function POST(req: Request) {
  const { email, descripcion, monto, fecha, categoria, faseSprint } = await req.json();
  if (!email || !descripcion || !monto || !fecha || !categoria) {
    return NextResponse.json({ error: "Campos incompletos" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  const costo = await prisma.costos.create({
    data: {
      descripcion,
      monto: parseFloat(monto),
      fecha: new Date(fecha),
      categoria,
      faseSprint: faseSprint || null,
      userId: user.id,
    },
  });

  return NextResponse.json(costo);
}

export async function PUT(req: Request) {
  const { id, email, descripcion, monto, fecha, categoria, faseSprint } = await req.json();
  if (!id || !email || !descripcion || !monto || !fecha || !categoria) {
    return NextResponse.json({ error: "Campos incompletos" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  const costo = await prisma.costos.update({
    where: { id },
    data: {
      descripcion,
      monto: parseFloat(monto),
      fecha: new Date(fecha),
      categoria,
      faseSprint: faseSprint || null,
      userId: user.id,
    },
  });
  return NextResponse.json(costo);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const email = url.searchParams.get("email");
  if (!id || !email) return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  await prisma.costos.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
