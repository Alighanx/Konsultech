import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "correo@ejemplo.com" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Credenciales faltantes");
          return null;
        }

        try {
          // Buscar usuario en la base de datos
          const user = await prisma.user.findUnique({ 
            where: { email: credentials.email.toLowerCase() } 
          });
          
          if (!user) {
            console.log("Usuario no encontrado:", credentials.email);
            return null;
          }

          // Verificar contraseña
          const isValid = await compare(credentials.password, user.password || "");
          
          if (!isValid) {
            console.log("Contraseña inválida para usuario:", credentials.email);
            return null;
          }

          console.log("Usuario autenticado exitosamente:", user.email);
          return { 
            id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role 
          };
        } catch (error) {
          console.error("Error en autorización:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
