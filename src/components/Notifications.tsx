import { Transition } from '@headlessui/react'
import { CheckCircleIcon, XIcon, XCircleIcon } from '@heroicons/react/outline'

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
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-20"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
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
            className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden z-10"
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{svg(details.level)}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{details.message}</p>
                  <p className="mt-1 text-sm text-gray-500">{details.description}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={() => removeItem(id)}
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-5 w-5" />
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

const Notification: React.FC = ({ children }) => {
  return (
    <h1 className="text-3xl font-semibold text-gray-900 flex items-center flex-1">{children}</h1>
  )
}

const svg = (level: level) => {
  switch (level) {
    case 'info':
      return <CheckCircleIcon className="h-6 w-6 text-green-400" />
    case 'error':
      return <XCircleIcon className="h-6 w-6 text-red-400" />
  }
}

Notifications.Notification = Notification

export default Notifications
