import { XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { MouseEvent } from 'react'

export default function Banner({
  onClose,
}: {
  onClose: (e: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <div className="flex items-center gap-x-6 bg-indigo-600 py-2.5 px-6 dark:bg-sky-600 sm:px-3.5 sm:before:flex-1">
      <p className="text-sm leading-6 text-white">
        <Link href="/digitalocean">
          <strong className="font-semibold">Digital Ocean </strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          Are you a Digital-Ocean customer? see how we can benefit your projects
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </p>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          onClick={onClose}
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
