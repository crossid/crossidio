import Link from 'next/link'

export default function ReadyToTry() {
  return (
    <div className="">
      <div className="py-16 px-6 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight  text-slate-900 dark:text-white sm:text-6xl">
            Ready to try Crossid?
          </h2>
          {/* <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
          sub text...
          </p> */}

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/docs/guides/get-started/preface"
              className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm  hover:bg-indigo-500  focus:ring-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-sky-500 dark:ring-offset-slate-900 dark:hover:bg-sky-700 dark:focus:ring-sky-500 "
            >
              Get started
            </Link>
            <Link
              href="/contact"
              className="text-base font-semibold leading-7 text-gray-900 dark:text-slate-50"
            >
              Get in touch with us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
