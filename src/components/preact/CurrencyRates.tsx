import { useState, useEffect, useRef } from 'preact/hooks'

import type { ICurrencyRate } from '../../types'
import CurrencyRateCard from './CurrencyRateCard'

export default function CurrencyRates() {
	const [rates, setRates] = useState<ICurrencyRate[]>([])
	const timerRef = useRef<NodeJS.Timeout>(null)

	useEffect(() => {
		const getRates = async () => {
			const res = await fetch('/api/currency/USD/ARS/rates.json')
			const data = await res.json()

			setRates(data.rates)
		}

		getRates()

		timerRef.current = setInterval(() => {
			getRates()
		}, 1000 * 60)

		return () => {
			if (timerRef.current) clearInterval(timerRef.current)
		}
	}, [])

	return (
		<div class="flex flex-wrap items-center justify-center gap-1 md:gap-4">
			{rates.length > 0 ? (
				rates.map((rate) => <CurrencyRateCard rate={rate} />)
			) : (
				<span>No se pudo obtener información</span>
			)}
		</div>
	)
}
