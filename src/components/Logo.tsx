import clsx from 'clsx'

export const Logomark = ({
  kind = 'light',
  className,
}: {
  kind?: 'light' | 'dark' | 'grayscale'
  className?: string
}) => {
  return (
    <span
      className={clsx(
        className,
        'rounded-md px-2 text-3xl',
        (kind === 'light' || kind === 'dark') && 'bg-black text-white',
        kind === 'grayscale' && 'bg-gray-300 text-white'
      )}
    >
      C
    </span>
  )
}

export const Logo = ({
  kind = 'light',
  className,
}: {
  kind?: 'light' | 'dark' | 'grayscale'
  className: string
}) => {
  return (
    <p>
      <Logomark kind={kind} className={className} />
      <span
        className={clsx(
          className,
          'font-logo ml-1 rounded-md text-2xl',
          kind === 'light' && 'text-indigo-600',
          kind === 'dark' && 'text-white',
          kind === 'grayscale' && 'text-gray-300'
        )}
      >
        Crossid
      </span>
    </p>
  )
}
