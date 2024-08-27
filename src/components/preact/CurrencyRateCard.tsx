import type { ICurrencyRate } from '../../types';

type CurrencyRateCardProps = {
  rate: ICurrencyRate;
};

export default function CurrencyRateCard({ rate }: CurrencyRateCardProps) {
  return (
    <div className='grid grid-cols-2 gap-x-2 p-2 justify-items-center text-xs bg-surface rounded shadow-md min-w-0'>
      <span className='col-span-full text-primary font-semibold min-w-0'>
        {rate.exchangeName}
      </span>
      <span className='grid row-start-2 row-end-2 text-default'>
        <span>Compra</span>
        <span>${rate.buy}</span>
      </span>
      <span className='grid justify-items-center row-start-2 row-end-2 text-offset'>
        <span>Venta</span>
        <span>${rate.sell}</span>
      </span>
    </div>
  );
}
