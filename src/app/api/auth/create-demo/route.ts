import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST() {
  try {
    // Verificar si el usuario demo ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: "demo@konsultech.com" }
    });

    if (existingUser) {
      return NextResponse.json({ 
        message: "Usuario demo ya existe",
        user: { email: existingUser.email, name: existingUser.name }
      });
    }

    // Crear usuario demo
    const demoPassword = await hash("demo123", 12);
    
    const demoUser = await prisma.user.create({
      data: {
        name: "Usuario Demo",
        email: "demo@konsultech.com",
        password: demoPassword,
        role: "user",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    });

    // Crear algunas tecnologías demo si no existen
    const tecnologias = [
      {
        nombre: "React",
        categoria: "Frontend",
        tipo: "framework",
        descripcion: "Framework de JavaScript para interfaces de usuario",
        precio: 50,
        unidad: "hora",
      },
      {
        nombre: "Node.js",
        categoria: "Backend",
        tipo: "runtime",
        descripcion: "Entorno de ejecución para JavaScript del lado del servidor",
        precio: 60,
        unidad: "hora",
      },
      {
        nombre: "MongoDB",
        categoria: "Base de datos",
        tipo: "database",
        descripcion: "Base de datos NoSQL orientada a documentos",
        precio: 200,
        unidad: "mes",
      },
    ];

    for (const tech of tecnologias) {
      await prisma.tecnologia.upsert({
        where: { nombre: tech.nombre },
        update: {},
        create: tech,
      });
    }

    // Crear simulación demo
    await prisma.simulacion.create({
      data: {
        nombre: "Proyecto Demo - E-commerce",
        descripcion: "Simulación de ejemplo para un proyecto de e-commerce",
        tipoProyecto: "web",
        alcance: "completo",
        usuarios: "1000-5000",
        complejidad: "media",
        plazo: "3-6-meses",
        caracteristicas: ["pagos-online", "inventario", "usuarios-multiples"],
        tecnologias: ["React", "Node.js", "MongoDB"],
        recomendaciones: [
          "Considera usar un CDN para mejor rendimiento",
          "Implementa caché Redis para sesiones",
          "Usa SSL/TLS para seguridad en pagos"
        ],
        presupuestoTotal: 45000,
        estado: "completado",
        userId: demoUser.id,
      },
    });

    return NextResponse.json({ 
      message: "Usuario demo creado exitosamente",
      user: demoUser
    });

  } catch (error) {
    console.error("Error al crear usuario demo:", error);
    return NextResponse.json(
      { message: "Error al crear usuario demo", error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
