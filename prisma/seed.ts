import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Crear usuario demo
  const demoPassword = await hash("demo123", 12);
  
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@konsultech.com" },
    update: {},
    create: {
      name: "Usuario Demo",
      email: "demo@konsultech.com",
      password: demoPassword,
      role: "user",
    },
  });

  console.log("Usuario demo creado:", demoUser);

  // Crear algunas tecnologías base
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
    {
      nombre: "PostgreSQL",
      categoria: "Base de datos",
      tipo: "database",
      descripcion: "Base de datos relacional avanzada",
      precio: 150,
      unidad: "mes",
    },
    {
      nombre: "AWS EC2",
      categoria: "Infraestructura",
      tipo: "service",
      descripcion: "Instancias de servidor en la nube",
      precio: 100,
      unidad: "mes",
    },
    {
      nombre: "Docker",
      categoria: "DevOps",
      tipo: "platform",
      descripcion: "Plataforma de contenedores para aplicaciones",
      precio: 30,
      unidad: "hora",
    },
  ];

  for (const tech of tecnologias) {
    await prisma.tecnologia.upsert({
      where: { nombre: tech.nombre },
      update: {},
      create: tech,
    });
  }

  console.log("Tecnologías base creadas");

  // Crear simulación demo
  const demoSimulacion = await prisma.simulacion.create({
    data: {
      nombre: "Proyecto Demo - E-commerce",
      descripcion: "Simulación de ejemplo para un proyecto de e-commerce",
      tipoProyecto: "web",
      alcance: "completo",
      usuarios: "1000-5000",
      complejidad: "media",
      plazo: "3-6-meses",
      caracteristicas: ["pagos-online", "inventario", "usuarios-multiples"],
      tecnologias: ["React", "Node.js", "MongoDB", "AWS EC2"],
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

  console.log("Simulación demo creada:", demoSimulacion);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
