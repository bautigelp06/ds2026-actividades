import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);
        const json = await apiFetch<T>(url);

        setTimeout(() => {
          setData(json);
          setLoading(false);
        }, 1500);

      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error desconocido');
        setLoading(false);
      }
    };

    cargar();
  }, [url]);

  return { data, loading, error };
}
