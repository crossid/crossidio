import clsx from 'clsx'

export const Logomark = ({
  kind = 'normal',
  className,
}: {
  kind?: 'normal' | 'grayscale'
  className?: string
}) => {
  return (
    <span
      className={clsx(
        className,
        'rounded-md px-2 text-3xl',
        kind === 'normal' &&
          'bg-black text-white dark:bg-black dark:text-sky-500',
        kind === 'grayscale' &&
          'bg-gray-300 text-white dark:bg-slate-800 dark:text-slate-500'
      )}
    >
      C
    </span>
  )
}

export const Logo = ({
  kind = 'normal',
  hideTextInMobile = true,
  className,
}: {
  kind?: 'normal' | 'grayscale'
  className?: string
  hideTextInMobile?: boolean
}) => {
  return (
    <p>
      <Logomark kind={kind} className={className} />
      <span
        className={clsx(
          className,
          hideTextInMobile && 'hidden lg:inline-flex',
          'ml-1 rounded-md font-logo text-2xl',
          kind === 'normal' && 'text-indigo-600 dark:text-white',
          kind === 'grayscale' && 'text-slate-500'
        )}
      >
        Crossid
      </span>
    </p>
  )
}
