import { useEffect, useState } from 'react';
import { fetchUBS, UBS } from './ubs';

export function useUBS() {
  const [data, setData] = useState<UBS[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUBS().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}
