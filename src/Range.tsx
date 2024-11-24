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
  const [minValueSpanPosition, setMinValueSpanPosition] = useState(8)
  const rangeRef = useRef<HTMLInputElement>(null)
  const minValueRef = useRef<HTMLSpanElement>(null)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt((e.target as HTMLInputElement).value)
    if (rangeRef && rangeRef.current) {
      const PROGRESS_RATIO = 5
      let ratio = ((newValue - min) / (max - min)) * 100
      if (ratio < 15) {
        ratio = ratio + PROGRESS_RATIO
      }
      if (ratio > 85) {
        ratio = ratio - PROGRESS_RATIO
      }

      rangeRef.current.style.background = `linear-gradient(90deg, #582f87 ${ratio}%, transparent ${ratio}%)`
    }
    setValue(newValue)
    updateminValueSpanPosition(newValue)
  }

  const updateminValueSpanPosition = (value: number) => {
    if (rangeRef.current) {
      const rangeWidth = rangeRef.current.clientWidth
      const thumbWidth = 60
      const ratio = (value - min) / (max - min)
      const newPosition = ratio * (rangeWidth - thumbWidth)
      const leftPadding = 8
      setMinValueSpanPosition(newPosition + leftPadding)
    }
  }

  const thumbDistance = minValueRef.current
    ? minValueRef.current.clientWidth
    : 0
  const trailingMinValue =
    thumbDistance !== 0 && minValueSpanPosition > thumbDistance

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
          left: trailingMinValue
            ? `${minValueSpanPosition - thumbDistance - 16}px`
            : `${minValueSpanPosition}px`,
          fontSize: trailingMinValue ? '16px' : '10px',
        }}
      >
        {formattedMinValue}
      </span>
    </div>
  )
}

export default Range
