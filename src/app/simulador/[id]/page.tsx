"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SimulatorProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();

  useEffect(() => {
    const redirectToResults = async () => {
      const resolvedParams = await params;
      // Redirigir automáticamente a la página de resultados
      router.replace(`/simulador/${resolvedParams.id}/resultados`);
    };
    
    redirectToResults();
  }, [params, router]);

  // Mostrar loading mientras redirige
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
