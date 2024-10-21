import { useState, useEffect, useRef } from 'preact/hooks';

import type { ICurrencyRate } from '../../types';
import CurrencyRateCard from '../react/CurrencyRateCard';
import { CgSpinner } from 'react-icons/cg';

export default function CurrencyRates() {
  const [rates, setRates] = useState<ICurrencyRate[] | undefined | null>(
    undefined
  );
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const getRates = async () => {
      try {
        const res = await fetch('/api/currency/USD/ARS/rates.json');
        const data = await res.json();
        setRates(data.rates);
      } catch (error) {
        setRates(null);
      }
    };

    getRates();

    timerRef.current = setInterval(() => {
      getRates();
    }, 1000 * 60);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (rates === undefined) {
    return <span>Cargando...</span>;
  }

  if (rates === null) {
    return <span>No se pudo obtener información</span>;
  }

  return (
    <div className='flex flex-wrap items-center justify-center gap-1 md:gap-4'>
      {rates.map((rate) => (
        <CurrencyRateCard rate={rate} />
      ))}
    </div>
  );
}
