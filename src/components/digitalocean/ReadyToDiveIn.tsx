import Link from 'next/link'
import { crossidAddonURL, learnMoreURL } from './utils'

export default function ReadyToDiveIn() {
  return (
    <div className="bg-white dark:bg-slate-900">
      <div className="py-24 px-6 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-300 sm:text-6xl">
            Ready to dive in?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-slate-400">
            Don&apos;t just take our word for it, start building now.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={crossidAddonURL()}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-sky-600 dark:hover:bg-sky-700"
            >
              Get started
            </a>
            <Link
              href={learnMoreURL()}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              More Info <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
