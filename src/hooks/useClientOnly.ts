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
  const [greeting, setGreeting] = useState("¡Hola");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("¡Buenos días");
    } else if (hour < 19) {
      setGreeting("¡Buenas tardes");
    } else {
      setGreeting("¡Buenas noches");
    }
  }, []);

  return greeting;
}
