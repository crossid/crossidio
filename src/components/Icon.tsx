import { ReactNode, useId } from 'react'
import clsx from 'clsx'

import { InstallationIcon } from '@/components/icons/InstallationIcon'
import { LightbulbIcon } from '@/components/icons/LightbulbIcon'
import { WarningIcon } from '@/components/icons/WarningIcon'
import { PluginsIcon } from '@/components/icons/PluginsIcon'
import { PresetsIcon } from '@/components/icons/PresetsIcon'
import { GithubIcon, GithubViewBox } from '@/components/icons/GithubIcon'
import { ReactIcon, ReactViewBox } from '@/components/icons/ReactIcon'

export type iconTypes =
  | 'installation'
  | 'lightbulb'
  | 'warning'
  | 'github'
  | 'react'
  | 'plugins'
  | 'presets'

const icons = {
  installation: InstallationIcon,
  presets: PresetsIcon,
  plugins: PluginsIcon,
  // theming: ThemingIcon,
  lightbulb: LightbulbIcon,
  warning: WarningIcon,
  github: GithubIcon,
  react: ReactIcon,
}

const iconsViewBox = {
  react: ReactViewBox,
  github: GithubViewBox,
} as Record<iconTypes, string>

const iconStyles = {
  blue: '[--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]',
  amber: '[--icon-foreground:theme(colors.amber.900)] [--icon-background:theme(colors.amber.100)]',
  gray: '[--icon-foreground:theme(colors.gray.900)] [--icon-background:theme(colors.gray.100)]',
}

export function Icon({
  color = 'blue',
  icon,
  className,
  ...props
}: {
  color?: 'blue' | 'amber' | 'gray'
  icon: iconTypes
  className: string
}) {
  let id = useId()
  let IconComponent = icons[icon]

  if (!IconComponent) {
    console.warn(`no icon found for ${icon}`)
    return null
  }

  return (
    <svg
      aria-hidden="true"
      // viewBox="0 0 32 32"
      viewBox={iconsViewBox[icon] || '0 0 32 32'}
      fill="none"
      className={clsx(className, iconStyles[color])}
      {...props}
    >
      <IconComponent id={id} color={color} />
    </svg>
  )
}

const gradients = {
  blue: [
    { stopColor: '#0EA5E9' },
    { stopColor: '#22D3EE', offset: '.527' },
    { stopColor: '#818CF8', offset: 1 },
  ],
  amber: [
    { stopColor: '#FDE68A', offset: '.08' },
    { stopColor: '#F59E0B', offset: '.837' },
  ],
  gray: [
    { stopColor: '#e5e7eb', offset: '.08' },
    { stopColor: '#6b7280', offset: '.837' },
  ],
}

export function Gradient({
  id,
  gradientTransform,
  color = 'blue',
  ...props
}: {
  id: string
  gradientTransform: string
  color: 'blue' | 'amber' | 'gray'
}) {
  return (
    <radialGradient
      id={id}
      gradientTransform={gradientTransform}
      cx={0}
      cy={0}
      r={1}
      gradientUnits="userSpaceOnUse"
      {...props}
    >
      {gradients[color].map((stop, stopIndex) => (
        <stop key={stopIndex} {...stop} />
      ))}
    </radialGradient>
  )
}

export function LightMode({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <g className={clsx('dark:hidden', className)} {...props}>
      {children}
    </g>
  )
}

const DarkMode: React.FC<
  JSX.IntrinsicElements['g'] & { children: React.ReactNode; className?: String }
> = ({ children, className, ...props }) => {
  return (
    <g className={clsx('hidden dark:inline', className)} {...props}>
      {children}
    </g>
  )
}

export { DarkMode }
