import { useState } from 'react'
import { Slider } from '@material-tailwind/react'

type ProfitSliderProps = {
	defaultValue: number
	onChange: (value: number) => void
	max?: number
	min?: number
}

export default function ProfitSlider({
	defaultValue,
	onChange,
	max = 10,
	min = 0
}: ProfitSliderProps) {
	const [currentValue, setCurrentValue] = useState(defaultValue.toString())
	const [profit, setProfit] = useState(defaultValue)

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const newProfitValue = Number(((Number(value) / 100) * 10).toFixed(1))

		setCurrentValue(value)
		setProfit(newProfitValue)
		onChange(newProfitValue)
	}

	return (
		<div>
			<Slider
				value={currentValue}
				onChange={handleOnChange}
				className="text-primary"
				barClassName="bg-primary"
				trackClassName="rounded [&::-webkit-slider-runnable-track]:bg-surface [&::-moz-range-track]:bg-surface bg-surface"
				placeholder={''}
				onPointerEnterCapture={() => {}}
				onPointerLeaveCapture={() => {}}
			/>
			<span className="text-offset text-xs">{profit}%</span>
		</div>
	)
}
