"use client";
import { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCalculator, FaSpinner } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [demoMessage, setDemoMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setSuccessMessage(message);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales inválidas. Por favor verifica tu email y contraseña.");
      } else {
        // Verificar que la sesión se estableció correctamente
        const session = await getSession();
        if (session) {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setError("Error al iniciar sesión. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError("");
    setDemoMessage("");

    try {
      // Primero asegurar que el usuario demo existe
      setDemoMessage("Creando cuenta demo...");
      const createDemoResponse = await fetch("/api/auth/create-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!createDemoResponse.ok) {
        throw new Error("Error al crear usuario demo");
      }

      // Llenar automáticamente los campos
      setDemoMessage("Llenando credenciales demo...");
      setEmail("demo@konsultech.com");
      setPassword("demo123");

      // Pequeña pausa para que el usuario vea los campos llenados
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Ahora intentar hacer login
      setDemoMessage("Iniciando sesión...");
      const result = await signIn("credentials", {
        email: "demo@konsultech.com",
        password: "demo123",
        redirect: false,
      });

      if (result?.error) {
        setError("Error al acceder con la cuenta demo. El usuario ha sido creado, intenta de nuevo.");
      } else {
        const session = await getSession();
        if (session) {
          setDemoMessage("¡Éxito! Redirigiendo al dashboard...");
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setError("Error al iniciar sesión con demo. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
      setDemoMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <FaCalculator className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Konsultech</h1>
          <p className="text-gray-600">Simulador de Presupuestos para Proyectos TI</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
            <p className="text-gray-600">Accede a tu cuenta para comenzar a simular presupuestos</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{successMessage}</p>
            </div>
          )}

          {/* Demo Message */}
          {demoMessage && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-600 text-sm font-medium">{demoMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Demo Notice */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm font-medium mb-2">🚀 Cuenta Demo Disponible</p>
            <p className="text-blue-600 text-sm">
              Al hacer clic en el botón de abajo, se llenará automáticamente el formulario con las credenciales de demo y se iniciará sesión.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu-email@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          {/* Demo Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  Preparando demo...
                </>
              ) : (
                "🎯 Llenar Datos Demo e Iniciar Sesión"
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Konsultech. Simulador profesional de presupuestos TI.
          </p>
        </div>
      </div>
    </div>
  );
}
