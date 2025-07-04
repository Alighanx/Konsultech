import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validar datos de entrada
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Un usuario con este email ya existe" },
        { status: 400 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await hash(password, 12);

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(
      { 
        message: "Usuario creado exitosamente",
        user: user
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
