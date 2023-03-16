import { DarkMode, Gradient, LightMode } from '@/components/Icon'

export const ReactViewBox = '-11.5 -10.23174 23 20.46348'

export function ReactIcon({ id, color }: { id: string; color: 'blue' | 'amber' | 'gray' }) {
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
    <>
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </>
  )
}
