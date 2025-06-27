import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password, role, demo } = await req.json();
  if (demo) {
    // Crear usuario demo y datos ficticios
    const demoEmail = "demo@demo.com";
    const demoPassword = await bcrypt.hash("demo", 10);
    let user = await prisma.user.findUnique({ where: { email: demoEmail } });
    if (!user) {
      user = await prisma.user.create({
        data: { name: "Demo", email: demoEmail, password: demoPassword, role: "ADMIN" },
      });
      // Crear datos ficticios de costos
      const now = new Date();
      const categorias = ["Infraestructura", "Desarrollo", "Licencias", "Soporte", "Consultoría"];
      for (let i = 0; i < 8; i++) {
        await prisma.costos.create({
          data: {
            descripcion: `Costo demo ${i + 1}`,
            monto: Math.round(Math.random() * 10000 + 1000),
            fecha: new Date(now.getTime() - i * 86400000 * 3),
            categoria: categorias[i % categorias.length],
            userId: user.id,
          },
        });
      }
      // Crear presupuestos demo
      for (let i = 0; i < 3; i++) {
        await prisma.presupuestos.create({
          data: {
            nombre: `Presupuesto Fase ${i + 1}`,
            montoTotal: 30000 + i * 15000,
            fechaInicio: new Date(now.getTime() - (i + 1) * 2592000000), // meses atrás
            fechaFin: new Date(now.getTime() - i * 2592000000),
            userId: user.id,
          },
        });
      }
      // Crear reportes demo
      for (let i = 0; i < 2; i++) {
        await prisma.reportes.create({
          data: {
            titulo: `Reporte de costos ${i + 1}`,
            contenido: `Este es un reporte de ejemplo generado para la demo. Incluye análisis de costos y desviaciones del proyecto en la fase ${i + 1}.`,
            fecha: new Date(now.getTime() - i * 604800000),
            userId: user.id,
          },
        });
      }
    }
    return NextResponse.json({ success: true, demo: true });
  }
  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
  }
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return NextResponse.json({ error: "El correo ya está registrado" }, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });
  return NextResponse.json({ success: true });
}
