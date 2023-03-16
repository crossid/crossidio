import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

export function Section({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden bg-white py-24 dark:bg-slate-900 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
    </div>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="pb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-300 sm:text-5xl">
      {children}
    </h2>
  )
}

export function SectionSubtitle({ children }: { children: ReactNode }) {
  return (
    <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-400 sm:text-3xl">
      {children}
    </p>
  )
}

export function ProductSummary({
  children,
  gridCols = 3,
}: {
  children: ReactNode
  gridCols?: number
}) {
  return (
    <div
      className={clsx(
        'grid max-w-2xl auto-cols-max grid-cols-1 gap-y-16 gap-x-8 pt-12 sm:gap-y-20 lg:mx-0 lg:max-w-none',
        `lg:grid-cols-${gridCols}`
      )}
    >
      {children}
    </div>
  )
}

export function ProductIntro({ children }: { children: ReactNode }) {
  return <div className="lg:pr-8">{children}</div>
}

export function ProductIntroHeading({ children }: { children: ReactNode }) {
  return (
    <p className="text-1xl font-bold tracking-tight text-gray-900 dark:text-slate-400 sm:text-2xl">
      {children}
    </p>
  )
}

export function ProductIntroContent({ children }: { children: ReactNode }) {
  return <div className="pt-2">{children}</div>
}

export function ProductContent({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={className}>{children}</div>
}

export function ProductFeatures({ children, sub }: { children: ReactNode; sub?: boolean }) {
  return (
    <div className={clsx('grid grid-cols-1 gap-x-8 gap-y-2 pt-12 lg:grid-cols-3', sub && 'pl-12')}>
      {children}
    </div>
  )
}

export function ProductFeaturesTitle({ children, sub }: { children: ReactNode; sub?: boolean }) {
  return (
    <h3
      className={clsx(
        'sm:text-1xl flex items-center gap-2 font-bold tracking-tight text-gray-900 after:flex-1 after:border-t after:border-t-gray-200 dark:text-slate-400 lg:col-span-3',
        sub && 'after:border-dashed'
      )}
    >
      {children}
    </h3>
  )
}

export function ProductFeaturesIntro({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}

export function ProductFeaturesContent({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={clsx('grid grid-cols-2 lg:col-span-2', className)}>{children}</div>
}

export function ProductFeatureLinks({ children }: { children: ReactNode }) {
  return <ul className="mt-8 flex gap-12 border-t dark:border-t-slate-700">{children}</ul>
}

export function ProductFeaturesLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li className="mt-4 text-xs">
      <Link href={href}>
        <span className="mr-2 rounded-md bg-gray-200 p-1 dark:bg-slate-800">DOCS</span>
        {children}
        <span aria-hidden="true" className="pl-2 text-indigo-500 dark:text-sky-400">
          →
        </span>
      </Link>
    </li>
  )
}

type IAuthFeatureType = 'signup' | 'login' | 'logout' | 'show user profile'
export function AuthFeatureLink({ type }: { type: IAuthFeatureType }) {
  return (
    <Link href="#" className="text-gray-500 dark:text-slate-500">
      {type}{' '}
    </Link>
  )
}
