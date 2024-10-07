import { useState } from 'react';
import { Slider, type SliderProps } from '@material-tailwind/react';

type ProfitSliderProps = SliderProps;

export default function ProfitSlider(props: ProfitSliderProps) {
  const [currentValue, setCurrentValue] = useState(props.defaultValue);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    props.onChange!(e);
  };

  return (
    <div>
      <Slider {...props} onChange={handleOnChange} />
      <span className='text-offset'>{currentValue}</span>
    </div>
  );
}
