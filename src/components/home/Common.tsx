import clsx from 'clsx'
import { Button } from './Button'
import { Dispatch, SetStateAction } from 'react'

export function IconContainer({
  as: Component = 'div',
  className = '',
  light,
  dark,
  ...props
}: {
  // TODO?
  as?: any
  className: string
  light: boolean
  dark: boolean
}) {
  return (
    <Component
      className={`h-16 w-16 overflow-hidden rounded-full p-[0.1875rem] shadow ring-1 ring-slate-900/10 ${className}`}
      {...props}
    >
      {light && (
        <div
          className="aspect-w-1 aspect-h-1 bg-[length:100%] dark:hidden"
          style={{
            backgroundImage: `url(${light})`,
          }}
        />
      )}
      {dark && (
        <div
          className="aspect-w-1 aspect-h-1 hidden bg-[length:100%] dark:block"
          style={{
            backgroundImage: `url(${dark})`,
          }}
        />
      )}
    </Component>
  )
}

export function Caption({ className = '', ...props }) {
  return <h2 className={`mt-8 font-semibold ${className}`} {...props} />
}

export function BigText({ className = '', ...props }) {
  return (
    <p
      className={`mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl ${className}`}
      {...props}
    />
  )
}

export function Paragraph({
  as: Component = 'p',
  className = '',
  children,
  ...props
}: {
  // TODO
  as?: any
  className?: string
  children: React.ReactNode
}) {
  return (
    <Component className={`mt-4 max-w-3xl space-y-6 ${className}`} {...props}>
      {children}
    </Component>
  )
}

export function Link({
  className,
  color,
  children,
  ...props
}: {
  className?: string
  href: string
  color: 'gray' | 'pink' | 'sky' | 'blue' | 'gray' | 'indigo'
  darkColor: 'gray' | 'sky'
  children: React.ReactNode
}) {
  return (
    <Button className={clsx('mt-8', className)} {...props}>
      {children}
    </Button>
  )
}

export { Widont } from '@/components/Widnot'

export function InlineCode({ className = '', ...props }) {
  return (
    <code
      className={`font-mono font-medium text-slate-900 dark:text-slate-200 ${className}`}
      {...props}
    />
  )
}

export type TabType = (selected: boolean) => JSX.Element

export function Tabs<T>({
  tabs,
  selected,
  onChange,
  className,
  iconClassName,
}: {
  tabs: Record<string, TabType>
  selected: string
  onChange: Dispatch<SetStateAction<T>>
  className: string
  iconClassName: string
}) {
  return (
    <div className="-mx-4 flex overflow-auto sm:mx-0">
      <ul
        className="inline-grid flex-none gap-x-2 px-4 sm:px-0 xl:gap-x-6"
        style={{
          gridTemplateColumns: `repeat(${
            Object.keys(tabs).length
          }, minmax(6rem, 1fr))`,
        }}
      >
        {Object.entries(tabs).map(([name, icon]) => (
          <li key={name}>
            <button
              type="button"
              // TODO
              // @ts-ignore
              onClick={() => onChange(name)}
              className={`group flex w-full flex-col items-center text-sm font-semibold ${
                selected === name ? className : ''
              }`}
            >
              <svg
                width="48"
                height="48"
                fill="none"
                aria-hidden="true"
                className={`mb-6 ${
                  selected === name
                    ? iconClassName
                    : 'text-slate-300 group-hover:text-slate-400 dark:text-slate-600 dark:group-hover:text-slate-500'
                }`}
              >
                {icon(selected === name)}
              </svg>
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
