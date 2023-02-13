import clsx from 'clsx'

import {
  ExclamationTriangleIcon,
  LightBulbIcon,
} from '@heroicons/react/24/solid'
import { ReactNode } from 'react'

const styles = {
  note: {
    container:
      'bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-sky-900 dark:text-sky-400',
    body: 'text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300',
  },
  warning: {
    container:
      'bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-amber-900 dark:text-amber-500',
    body: 'text-amber-800 [--tw-prose-underline:theme(colors.amber.400)] [--tw-prose-background:theme(colors.amber.50)] prose-a:text-amber-900 prose-code:text-amber-900 dark:text-slate-300 dark:[--tw-prose-underline:theme(colors.sky.700)] dark:prose-code:text-slate-300',
  },
}

const icons = {
  note: (props: any) => (
    <LightBulbIcon {...props} className="h-8 w-8 flex-none text-sky-500" />
  ),
  warning: (props: any) => (
    <ExclamationTriangleIcon
      className="h-8 w-8 flex-none text-amber-500"
      {...props}
    />
  ),
}

export function Callout({
  type = 'note',
  title,
  children,
}: {
  type: 'note' | 'warning'
  title: string
  children: ReactNode
}) {
  let IconComponent = icons[type]

  return (
    <div className={clsx('my-8 flex rounded-3xl p-6', styles[type].container)}>
      <IconComponent />
      <div className="ml-4 flex-auto">
        <p className={clsx('font-display m-0 text-xl', styles[type].title)}>
          {title}
        </p>
        <div className={clsx('prose mt-2.5', styles[type].body)}>
          {children}
        </div>
      </div>
    </div>
  )
}