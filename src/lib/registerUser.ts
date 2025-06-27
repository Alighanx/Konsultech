import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

export async function registerUser({ name, email, password, role }: { name: string; email: string; password: string; role: "GERENTE" | "EQUIPO_TECNICO" }) {
  const hashedPassword = await hash(password, 10);
  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });
}
