import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomSessionProvider from "./SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Konsultech",
  description: "Plataforma de análisis y gestión de costos para proyectos TI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* El proveedor de sesión solo debe estar aquí, sin lógica dinámica */}
        <CustomSessionProvider>{children}</CustomSessionProvider>
      </body>
    </html>
  );
}
