import { DarkMode, LightMode } from '@/components/Icon'

export const JavascriptViewBox = '0 0 48 48'

export function JavascriptIcon({
  id,
  color,
}: {
  id: string
  color: 'blue' | 'amber' | 'gray'
}) {
  return (
    <>
      <LightMode>
        <Svg />
      </LightMode>
      <DarkMode>
        <Svg />
      </DarkMode>
    </>
  )
}

function Svg() {
  return (
    <path
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      d="M45.274,2.325C45.084,2.118,44.817,2,44.536,2H5.464C5.183,2,4.916,2.118,4.726,2.325S4.443,2.81,4.468,3.089l3.52,39.427 c0.037,0.412,0.324,0.759,0.722,0.873l16.01,4.573C24.809,47.987,24.902,48,24.994,48s0.185-0.013,0.274-0.038l16.024-4.573 c0.398-0.114,0.685-0.461,0.722-0.873l3.518-39.427C45.557,2.81,45.463,2.532,45.274,2.325z M12,29.004l7,1.942V11h4v26l-11-3.051 V29.004z M38.054,22L37,34.25L27,37v-4.601l6.75-1.855l0.25-3.75L27,28V11h12l-0.345,4H31v8L38.054,22z"
    />
  )
}
