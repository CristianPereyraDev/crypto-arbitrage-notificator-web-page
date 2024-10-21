import { useState, useEffect, useRef } from 'react';
import { CgSpinner } from 'react-icons/cg';

import type { ICurrencyRate } from '../../types';
import CurrencyRateCard from './CurrencyRateCard';

export default function CurrencyRates() {
  const [rates, setRates] = useState<ICurrencyRate[] | undefined | null>(
    undefined
  );
  //const timerRef = useRef<NodeJS.Timeout>(null);

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

    const timerRef = setInterval(() => {
      getRates();
    }, 1000 * 60);

    return () => {
      if (timerRef) clearInterval(timerRef);
    };
  }, []);

  if (rates === undefined) {
    return <CgSpinner className='animate-spin-slow text-2xl text-primary' />;
  }

  if (rates === null) {
    return <span>No se pudo obtener información</span>;
  }

  return (
    <div className='flex flex-wrap items-center justify-center gap-1 md:gap-4'>
      {rates.map((rate) => (
        <CurrencyRateCard key={rate.exchangeName} rate={rate} />
      ))}
    </div>
  );
}
