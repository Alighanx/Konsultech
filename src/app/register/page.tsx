"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaEnvelope, FaUserTie } from "react-icons/fa";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("GERENTE");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    if (data.error) setError(data.error);
    else {
      setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
      setTimeout(() => router.push("/login"), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-700">
      <div className="bg-white/95 shadow-2xl rounded-2xl p-0 w-full max-w-md flex flex-col items-center border border-blue-100">
        {/* Encabezado */}
        <div className="w-full flex flex-col items-center py-8 px-8 border-b border-blue-100 bg-gradient-to-r from-blue-700 to-blue-600 rounded-t-2xl">
          <div className="bg-white rounded-full p-2 mb-2 shadow-md">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#2563eb" />
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                fill="#fff"
                fontSize="18"
                fontWeight="bold"
                dy=".3em"
              >
                KT
              </text>
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">
            Konsultech
          </h1>
          <p className="text-blue-100 text-xs text-center max-w-xs mt-1 font-medium">
            Plataforma de análisis y gestión de costos para proyectos TI
          </p>
        </div>
        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 px-8 py-8"
        >
          <div className="relative">
            <label htmlFor="name" className="sr-only">
              Nombre
            </label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700">
              <FaUser />
            </span>
            <input
              id="name"
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition text-gray-800 placeholder-gray-400 bg-white shadow-sm"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700">
              <FaEnvelope />
            </span>
            <input
              id="email"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition text-gray-800 placeholder-gray-400 bg-white shadow-sm"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700">
              <FaLock />
            </span>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition text-gray-800 placeholder-gray-400 bg-white shadow-sm"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="role" className="sr-only">
              Rol
            </label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700">
              <FaUserTie />
            </span>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition text-gray-800 bg-white shadow-sm"
              required
            >
              <option value="GERENTE">Gerente</option>
              <option value="EQUIPO_TECNICO">Equipo Técnico</option>
            </select>
          </div>
          {error && (
            <div className="text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2 text-sm text-center animate-pulse font-medium shadow">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 text-sm text-center font-medium shadow">
              {success}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Registrarse
          </button>
        </form>
        <div className="mb-4 w-full flex flex-col items-center px-8">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <a
              href="/login"
              className="text-blue-700 hover:underline font-semibold"
            >
              Inicia sesión
            </a>
          </p>
        </div>
        <footer className="mt-2 text-xs text-gray-400 text-center w-full border-t pt-3 pb-4 px-8 bg-white/80 rounded-b-2xl">
          <span className="block font-semibold text-gray-500 mb-1">
            ¿Por qué usar Konsultech?
          </span>
          <span className="block mb-1">
            Reduce desviaciones presupuestales y mejora la trazabilidad de los
            costos en tus proyectos TI.
          </span>
          <span className="block">
            &copy; {new Date().getFullYear()} Konsultech
          </span>
        </footer>
      </div>
    </div>
  );
}
