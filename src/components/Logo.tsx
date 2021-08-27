import clsx from 'clsx'

const Logo = ({ kind }: { kind: 'light' | 'dark' | 'grayscale' }) => {
  return (
    <p>
      <span
        className={clsx(
          'px-2 rounded-md text-3xl',
          (kind === 'light' || kind === 'dark') && 'bg-black text-white',
          kind === 'grayscale' && 'bg-gray-300 text-white'
        )}
      >
        C
      </span>
      <span
        className={clsx(
          'ml-1 rounded-md text-2xl font-logo',
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

export default Logo
