"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DemoButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDemo = async () => {
    setLoading(true);
    // Intentar iniciar sesión directamente como demo
    const loginRes = await signIn("credentials", {
      redirect: false,
      email: "demo@demo.com",
      password: "demo",
    });
    setLoading(false);
    if (loginRes?.ok) {
      router.push("/dashboard");
    }
    // Si falla, podrías mostrar un error, pero por requerimiento no se muestra nada
  };

  return (
    <div className="flex flex-col items-center my-6">
      <button
        onClick={handleDemo}
        disabled={loading}
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Entrando como demo..." : "Entrar como demo"}
      </button>
    </div>
  );
}
