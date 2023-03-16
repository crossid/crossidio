import { Transition } from '@headlessui/react'
import { CheckCircleIcon, XMarkIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ReactElement, ReactNode } from 'react'

interface NotificationsDef {
  id: string
  show: boolean
  details?: NotificationDef
}

type level = 'info' | 'error'

export interface NotificationDef {
  message: string
  description?: string
  level: level
}

function Notifications({ items, removeItem }: { items: NotificationsDef[]; removeItem: Function }) {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-20 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {items.map(({ id, show, details = { level: 'info' } }) => (
          <Transition
            key={id}
            appear={true}
            show={show}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="pointer-events-auto z-10 w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-black dark:ring-indigo-600"
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{svg(details.level)}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-indigo-100">
                    {details.message}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-indigo-200">
                    {details.description}
                  </p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    onClick={() => removeItem(id)}
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-600 dark:text-indigo-100 dark:hover:text-gray-100"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        ))}
      </div>
    </div>
  )
}

const Notification: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h1 className="flex flex-1 items-center text-3xl font-semibold text-gray-900">{children}</h1>
  )
}

const svg = (level: level) => {
  switch (level) {
    case 'info':
      return <CheckCircleIcon className="h-6 w-6 text-gray-900 dark:text-indigo-200" />
    case 'error':
      return <XCircleIcon className="h-6 w-6 text-gray-900 dark:text-indigo-200" />
  }
}

Notifications.Notification = Notification

export default Notifications
