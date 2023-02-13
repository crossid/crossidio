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
        kind === 'normal' && 'bg-black text-white',
        kind === 'grayscale' && 'bg-gray-300 text-white'
      )}
    >
      C
    </span>
  )
}

export const Logo = ({
  kind = 'normal',
  className,
}: {
  kind?: 'normal' | 'grayscale'
  className: string
}) => {
  console.log(kind)
  return (
    <p>
      <Logomark kind={kind} className={className} />
      <span
        className={clsx(
          className,
          'font-logo ml-1 rounded-md text-2xl',
          kind === 'normal' && 'text-indigo-600 dark:text-sky-500',
          kind === 'grayscale' && 'text-gray-300'
        )}
      >
        Crossid
      </span>
    </p>
  )
}
