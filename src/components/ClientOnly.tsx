"use client";
import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Componente que solo renderiza sus hijos en el cliente
 * para evitar problemas de hidratación SSR
 */
export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
