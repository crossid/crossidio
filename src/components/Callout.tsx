import clsx from 'clsx'
import { ReactNode } from 'react'
import { Icon } from './Icon'

const styles = {
  tip: {
    container: 'bg-indigo-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-indigo-900 dark:text-sky-400',
    body: 'text-indigo-800 [--tw-prose-background:theme(colors.indigo.50)] prose-a:text-indigo-900 prose-code:text-indigo-900 dark:text-slate-300 dark:prose-code:text-slate-300',
  },
  info: {
    container: 'bg-gray-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-gray-900 dark:text-sky-400',
    body: 'text-gray-800 [--tw-prose-background:theme(colors.gray.50)] prose-a:text-gray-900 prose-code:text-gray-900 dark:text-slate-300 dark:prose-code:text-slate-300',
  },
  warning: {
    container: 'bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-amber-900 dark:text-amber-500',
    body: 'text-amber-800 [--tw-prose-underline:theme(colors.amber.400)] [--tw-prose-background:theme(colors.amber.50)] prose-a:text-amber-900 prose-code:text-amber-900 dark:text-slate-300 dark:[--tw-prose-underline:theme(colors.sky.700)] dark:prose-code:text-slate-300',
  },
}

const icons = {
  tip: (props: any) => <Icon icon="lightbulb" {...props} />,
  info: (props: any) => <Icon {...props} icon="lightbulb" />,
  warning: (props: any) => <Icon icon="warning" color="amber" {...props} />,
}

export function Callout({
  type = 'info',
  title,
  children,
}: {
  type: 'info' | 'warning' | 'tip'
  title: string
  children: ReactNode
}) {
  let IconComponent = icons[type]

  return (
    <div className={clsx('my-8 flex rounded-3xl p-6', styles[type].container)}>
      <IconComponent className="h-8 w-8 flex-none" />
      <div className="ml-4 flex-auto">
        <p className={clsx('font-display m-0 text-xl', styles[type].title)}>{title}</p>
        <div className={clsx('prose mt-2.5', styles[type].body)}>{children}</div>
      </div>
    </div>
  )
}
