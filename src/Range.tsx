import { useRef, useState } from 'react'
import { formattedCurrency, formattedYears } from './utils/numberFormatters'

type Props = {
  min: number
  max: number
  step: number
  value: number
  setValue: (value: number) => void
  type: 'currency' | 'years'
}

const Range = ({ min, max, step, value, setValue, type }: Props) => {
  const [thumbPosition, setThumbPosition] = useState(0)
  const rangeRef = useRef<HTMLInputElement>(null)
  const minValueRef = useRef<HTMLSpanElement>(null)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt((e.target as HTMLInputElement).value)
    setRangeProgress(newValue)
    updateThumbPosition(newValue)
    setValue(newValue)
  }

  const setRangeProgress = (value: number) => {
    if (rangeRef.current) {
      const EXTRA_PROGRESS_RATIO = 5
      let ratio = ((value - min) / (max - min)) * 100
      if (ratio < 15) {
        ratio = ratio + EXTRA_PROGRESS_RATIO
      }
      if (ratio > 85) {
        ratio = ratio - EXTRA_PROGRESS_RATIO
      }
      rangeRef.current.style.background = `linear-gradient(90deg, #582f87 ${ratio}%, transparent ${ratio}%)`
    }
  }

  const updateThumbPosition = (value: number) => {
    if (rangeRef.current) {
      const rangeWidth = rangeRef.current.clientWidth
      const thumbWidth = 60
      const ratio = (value - min) / (max - min)
      const newPosition = ratio * (rangeWidth - thumbWidth)
      setThumbPosition(newPosition)
    }
  }

  const minValueSpanWidth = minValueRef.current
    ? minValueRef.current.clientWidth
    : 0
  const showTrailingMinValue =
    thumbPosition > 0 && thumbPosition > minValueSpanWidth
  const EXTRA_PADDING_FROM_THUMB = 16
  const minValueSpanPosition =
    thumbPosition - minValueSpanWidth - EXTRA_PADDING_FROM_THUMB

  const formattedMaxValue =
    type === 'currency' ? formattedCurrency(max) : formattedYears(max)
  const formattedMinValue =
    type === 'currency' ? formattedCurrency(value) : formattedYears(value)

  return (
    <div className="input-container">
      <input
        type="range"
        ref={rangeRef}
        value={value}
        min={min}
        max={max}
        step={step}
        className="input-range"
        onInput={handleInput}
      />
      <span className="max-value">{formattedMaxValue}</span>
      <span
        ref={minValueRef}
        className="min-value"
        style={{
          left: showTrailingMinValue
            ? `${minValueSpanPosition}px`
            : `${thumbPosition || 8}px`,
          fontSize: showTrailingMinValue ? '16px' : '10px',
        }}
      >
        {formattedMinValue}
      </span>
    </div>
  )
}

export default Range
