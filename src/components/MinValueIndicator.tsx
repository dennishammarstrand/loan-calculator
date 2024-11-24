import { useRef } from 'react'
import { formattedCurrency, formattedYears } from '../utils/numberFormatters'

type Props = {
  value: number
  type: 'currency' | 'years'
  thumbPosition: number
}

const EXTRA_PADDING_FROM_THUMB = 16
const INITIAL_PADDING = 8

const MinValueIndicator = ({ value, type, thumbPosition }: Props) => {
  const minValueRef = useRef<HTMLSpanElement>(null)

  const minValueSpanWidth = minValueRef.current
    ? minValueRef.current.clientWidth
    : 0
  const showTrailingMinValue =
    thumbPosition > 0 &&
    thumbPosition > minValueSpanWidth + EXTRA_PADDING_FROM_THUMB
  const minValueSpanPosition =
    thumbPosition - minValueSpanWidth - EXTRA_PADDING_FROM_THUMB
  const minValueSpanPositionWhenNotTrailing =
    thumbPosition === 0 ? INITIAL_PADDING : thumbPosition + INITIAL_PADDING

  const formattedMinValue =
    type === 'currency' ? formattedCurrency(value) : formattedYears(value)

  return (
    <span
      ref={minValueRef}
      className="min-value"
      style={{
        left: showTrailingMinValue
          ? `${minValueSpanPosition}px`
          : `${minValueSpanPositionWhenNotTrailing}px`,
        fontSize: showTrailingMinValue ? '16px' : '10px',
      }}
    >
      {formattedMinValue}
    </span>
  )
}

export default MinValueIndicator
