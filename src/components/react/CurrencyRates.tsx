import { useState, useEffect, useRef } from 'react';
import { MdCurrencyExchange } from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';

import type { ICurrencyRate } from '../../types';
import CurrencyRateCard from './CurrencyRateCard';

export default function CurrencyRates() {
  const [rates, setRates] = useState<ICurrencyRate[] | null>([]);
  const [loading, setLoading] = useState(false);
  //const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const getRates = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/currency/USD/ARS/rates.json');
        const data = await res.json();
        setRates(data.rates);
      } catch (error) {
        setRates(null);
      } finally {
        setLoading(false);
      }
    };

    getRates();

    const timerRef = setInterval(() => {
      getRates();
    }, 1000 * 10);

    return () => {
      if (timerRef) clearInterval(timerRef);
    };
  }, []);

  return (
    <div className='flex flex-wrap h-full items-center justify-center gap-1 md:gap-4'>
      {loading ? (
        <CgSpinner className='animate-spin-slow text-2xl text-primary' />
      ) : (
        <MdCurrencyExchange className='text-2xl text-primary' />
      )}
      {rates ? (
        rates.map((rate) => (
          <CurrencyRateCard key={rate.exchangeName} rate={rate} />
        ))
      ) : (
        <span>No se pudo obtener información</span>
      )}
    </div>
  );
}
