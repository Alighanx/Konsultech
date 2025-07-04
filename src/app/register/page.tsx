"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      // Aquí iría la lógica de registro real
      // Por ahora, simulamos un registro exitoso
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      setError("Error al crear la cuenta. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
          <div className="text-center mb-8">
            <button 
              onClick={() => router.push("/")}
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition"
            >
              <FaArrowLeft className="mr-2" />
              Volver al inicio
            </button>
            <h1 className="text-3xl font-bold text-white mb-2">Crear Cuenta</h1>
            <p className="text-blue-100">Únete a Konsultech y comienza a simular presupuestos</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Mínimo 6 caracteres"
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Repite tu contraseña"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-blue-900 font-bold py-3 px-4 rounded-lg hover:bg-blue-50 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creando cuenta..." : "Crear cuenta gratis"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/70">
              ¿Ya tienes cuenta?{" "}
              <button 
                onClick={() => router.push("/login")}
                className="text-white font-medium hover:text-blue-200 transition"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
