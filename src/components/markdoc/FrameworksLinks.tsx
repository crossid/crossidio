import Link from 'next/link'
import { Icon, iconTypes } from '../Icon'

export default function FrameworksLinks({ frameworks }: { frameworks: string[] }) {
  return (
    <ul
      role="list"
      className="not-prose grid grid-cols-1 gap-x-6 gap-y-10 pt-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {frameworks.map((fw, i) => (
        <Framework key={i} fw={fw} />
      ))}
    </ul>
  )
}

const Framework = ({ fw }: { fw: string }) => {
  return (
    <li key={fw} className="relative flex flex-row-reverse">
      <div className="group peer ml-6 flex-auto">
        <h4 className="mb-2 font-semibold leading-6 text-slate-900 dark:text-slate-200">
          <Link
            href={`/docs/frameworks/${fw}`}
            className="before:absolute before:-inset-3 before:rounded-2xl"
          >
            {fw}
            <svg
              viewBox="0 0 3 6"
              className="ml-3 -mt-px inline h-1.5 w-auto overflow-visible text-slate-400 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100"
            >
              <path
                d="M0 0L3 3L0 6"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </h4>
        {/* <p className="text-sm leading-6 text-slate-700 dark:text-slate-400">
        
        </p> */}
      </div>
      <div className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-md bg-white shadow ring-1 ring-slate-900/5 dark:bg-slate-800 dark:highlight-white/5">
        <Icon icon={fw as iconTypes} className="h-10 w-10" />
      </div>
      <div className="absolute -inset-3 -z-10 rounded-2xl bg-slate-50 opacity-0 peer-hover:opacity-100 dark:bg-slate-800/50" />
    </li>
  )
}
