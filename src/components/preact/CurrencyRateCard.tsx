import type { ICurrencyRate } from '../../types'

type CurrencyRateCardProps = {
	rate: ICurrencyRate
}

export default function CurrencyRateCard({ rate }: CurrencyRateCardProps) {
	return (
		<div className="grid min-w-0 grid-cols-2 justify-items-center gap-x-2 rounded bg-surface p-2 shadow-md text-xs">
			<span className="col-span-full min-w-0 font-semibold text-primary">{rate.exchangeName}</span>
			<span className="row-start-2 row-end-2 grid text-default">
				<span>Compra</span>
				<span>${rate.buy}</span>
			</span>
			<span className="row-start-2 row-end-2 grid justify-items-center text-offset">
				<span>Venta</span>
				<span>${rate.sell}</span>
			</span>
		</div>
	)
}
