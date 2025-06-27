"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";
import DemoButton from "../DemoButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      setError("");
      
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Correo o contraseña incorrectos. Intenta nuevamente.");
      } else if (res?.ok) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("Ocurrió un error al intentar iniciar sesión. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-700">
      <div className="bg-white/95 shadow-2xl rounded-2xl p-0 w-full max-w-md flex flex-col items-center border border-blue-100">
        {/* Encabezado */}
        <div className="w-full flex flex-col items-center py-8 px-8 border-b border-blue-100 bg-gradient-to-r from-blue-700 to-blue-600 rounded-t-2xl">
          <div className="bg-white rounded-full p-2 mb-2 shadow-md">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#2563eb" />
              <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold" dy=".3em">KT</text>
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">Konsultech</h1>
          <p className="text-blue-100 text-xs text-center max-w-xs mt-1 font-medium">
            Control presupuestario y trazabilidad de costos para proyectos TI
          </p>
        </div>
        {/* Botón demo */}
        <DemoButton />
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 px-8 py-8">
          <div className="relative">
            <label htmlFor="email" className="sr-only">Correo electrónico</label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700">
              <FaUser />
            </span>
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition text-gray-900 placeholder-gray-400 bg-white shadow-sm"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700">
              <FaLock />
            </span>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition text-gray-900 placeholder-gray-400 bg-white shadow-sm"
              required
            />
          </div>
          {error && <div className="text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2 text-sm text-center animate-pulse font-medium shadow">{error}</div>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              "Ingresar"
            )}
          </button>
        </form>
        <div className="mb-4 w-full flex flex-col items-center px-8">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta? <a href="/register" className="text-blue-700 hover:underline font-semibold">Regístrate</a>
          </p>
        </div>
        <footer className="mt-2 text-xs text-gray-400 text-center w-full border-t pt-3 pb-4 px-8 bg-white/80 rounded-b-2xl">
          <span className="block font-semibold text-gray-500 mb-1">¿Por qué usar Konsultech?</span>
          <span className="block mb-1">Evita sobrecostos y retrasos. Monitorea gastos reales vs planificados y recibe alertas tempranas ante desviaciones.</span>
          <span className="block">&copy; {new Date().getFullYear()} Konsultech</span>
        </footer>
      </div>
    </div>
  );
}
