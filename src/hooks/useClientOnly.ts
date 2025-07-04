import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar valores que solo deben calcularse en el cliente
 * para evitar problemas de hidratación con SSR
 */
export function useClientOnly<T>(clientValue: () => T, defaultValue: T): T {
  const [value, setValue] = useState<T>(defaultValue);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setValue(clientValue());
  }, []);

  return hasMounted ? value : defaultValue;
}

/**
 * Hook para obtener la fecha actual solo en el cliente
 */
export function useCurrentDate(): Date | null {
  return useClientOnly(() => new Date(), null);
}

/**
 * Hook para obtener un saludo basado en la hora actual
 */
export function useGreeting(): string {
  return useClientOnly(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "¡Buenos días";
    if (hour < 19) return "¡Buenas tardes";
    return "¡Buenas noches";
  }, "¡Hola");
}
