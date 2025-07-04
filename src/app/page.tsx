"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaCalculator, FaProjectDiagram, FaChartLine, FaFileInvoiceDollar, FaRocket, FaBullseye, FaCog } from "react-icons/fa";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // No redirigir automáticamente - dejar que el usuario elija
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/dashboard");
  //   }
  // }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Hero Section */}
      <header className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">
              Konsultech
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-light">
              Simulador de Presupuestos para Proyectos TI
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20">
            {session ? (
              <>
                <h2 className="text-3xl font-bold text-white mb-4">
                  ¡Bienvenido de vuelta, {session.user?.name?.split(' ')[0] || 'Usuario'}!
                </h2>
                <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                  ¿Qué te gustaría hacer hoy? Puedes ir a tu dashboard para ver tus estadísticas 
                  o continuar directamente al simulador para crear un nuevo presupuesto.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-white mb-4">
                  ¿Cuánto cuesta realmente tu proyecto de tecnología?
                </h2>
                <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                  Simula presupuestos detallados, compara tecnologías y genera propuestas profesionales 
                  con nuestra plataforma especializada en proyectos TI.
                </p>
              </>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {session ? (
                // Usuario autenticado - mostrar opciones para ir al dashboard o simulador
                <>
                  <button 
                    onClick={() => router.push("/dashboard")}
                    className="bg-white text-blue-900 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition shadow-lg hover:scale-105"
                  >
                    Ir al Dashboard
                  </button>
                  <button 
                    onClick={() => router.push("/simulador")}
                    className="bg-green-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-green-700 transition shadow-lg"
                  >
                    Ir al Simulador
                  </button>
                </>
              ) : (
                // Usuario no autenticado - mostrar opciones de registro/login/demo
                <>
                  <button 
                    onClick={() => router.push("/register")}
                    className="bg-white text-blue-900 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition shadow-lg hover:scale-105"
                  >
                    Comenzar Gratis
                  </button>
                  <button 
                    onClick={() => router.push("/login")}
                    className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition"
                  >
                    Iniciar Sesión
                  </button>
                  <button 
                    onClick={() => router.push("/simulador")}
                    className="bg-green-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-green-700 transition shadow-lg"
                  >
                    Probar Cuenta Demo
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Características principales */}
      <section className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            ¿Por qué elegir Konsultech?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition">
              <FaCalculator className="text-4xl text-blue-300 mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Simulación Inteligente</h4>
              <p className="text-blue-100">
                Calcula automáticamente el presupuesto basado en tecnologías reales, 
                equipos de trabajo y duración del proyecto.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition">
              <FaProjectDiagram className="text-4xl text-green-300 mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Catálogo Real</h4>
              <p className="text-blue-100">
                Base de datos actualizada con precios reales de tecnologías, 
                licencias y servicios cloud (AWS, Azure, React, etc.).
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition">
              <FaChartLine className="text-4xl text-yellow-300 mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Comparación Visual</h4>
              <p className="text-blue-100">
                Compara diferentes escenarios tecnológicos y visualiza 
                el impacto en costos con gráficos interactivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de uso */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Perfecto para
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <FaRocket className="text-3xl text-blue-300 mb-3" />
              <h4 className="text-lg font-bold text-white mb-2">Startups</h4>
              <p className="text-blue-100 text-sm">
                Estima el costo real de tu MVP antes de buscar inversión.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <FaBullseye className="text-3xl text-green-300 mb-3" />
              <h4 className="text-lg font-bold text-white mb-2">Consultoras</h4>
              <p className="text-blue-100 text-sm">
                Acelera el proceso de cotización y mejora la precisión.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <FaCog className="text-3xl text-yellow-300 mb-3" />
              <h4 className="text-lg font-bold text-white mb-2">Empresas TI</h4>
              <p className="text-blue-100 text-sm">
                Planifica presupuestos internos y justifica decisiones técnicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            ¿Listo para cotizar tu próximo proyecto?
          </h3>
          <p className="text-lg text-blue-100 mb-8">
            Únete a cientos de empresas que ya utilizan Konsultech para mejorar 
            sus procesos de cotización y planeación de proyectos TI.
          </p>
          <button 
            onClick={() => router.push("/register")}
            className="bg-white text-blue-900 font-bold py-4 px-12 rounded-xl hover:bg-blue-50 transition shadow-lg hover:scale-105 text-lg"
          >
            <FaFileInvoiceDollar className="inline mr-2" />
            Crear mi primera simulación
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-200 text-sm">
            © 2025 Konsultech. Plataforma desarrollada como proyecto académico del curso "Costos y Presupuestos"
          </p>
        </div>
      </footer>
    </div>
  );
}
