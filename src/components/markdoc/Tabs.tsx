import clsx from 'clsx'
import React, { ReactNode } from 'react'

export const TabContext = React.createContext({})

export function Tabs({
  labels,
  children,
}: {
  labels: string[]
  children: ReactNode
}) {
  const [currentTab, setCurrentTab] = React.useState(labels[0])

  return (
    <TabContext.Provider value={currentTab}>
      <div className="not-prose">
        <nav role="tablist" aria-label="Tabs" className="-mb-px flex space-x-8">
          {labels.map((label: string) => (
            <button
              key={label}
              role="tab"
              aria-selected={label === currentTab}
              onClick={() => setCurrentTab(label)}
              className={clsx(
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                label === currentTab
                  ? 'border-indigo-500 text-indigo-600 dark:border-sky-500 dark:text-sky-500'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
      {children}
    </TabContext.Provider>
  )
}

export function Tab({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  const currentTab = React.useContext(TabContext)

  if (label !== currentTab) {
    return null
  }

  return children
}
