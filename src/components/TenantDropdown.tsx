import { Menu } from '@headlessui/react'
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowsRightLeftIcon,
  FlagIcon,
} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import useTenant, { Tenant, TenantContext } from '@/hooks/tenant'
import { useContext, useEffect, useRef, useState } from 'react'

const MenuItems = ({
  tenant,
  listTenantsMode,
}: {
  tenant: Tenant
  listTenantsMode: () => void
}) => {
  return (
    <>
      <div className="flex justify-between px-4 py-3">
        <p className="text-sm">{tenant.displayName || tenant.id}</p>
        <div className="inline-flex space-x-2 ">
          <FlagIcon className="h-4 w-4 text-indigo-500 dark:text-sky-500" />
          <span className="truncate text-sm  font-bold text-gray-500">
            {tenant.regionCode.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="py-1">
        <div>
          <a
            href=" #"
            onClick={(e) => {
              listTenantsMode()
            }}
            className={clsx(
              // active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'group flex items-center justify-between px-4 py-3 text-sm'
            )}
          >
            <div className="flex items-center dark:text-slate-400">
              <ArrowsRightLeftIcon
                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-slate-400"
                aria-hidden="true"
              />
              Switch Tenant
            </div>
            <ChevronRightIcon
              className="right h-5 w-5 text-gray-400 dark:text-slate-500"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </>
  )
}

const ListTenants = ({
  tenantId,
  ownedTenants,
  loading,
  setTenant,
  defaultMode,
}: {
  tenantId: string
  ownedTenants: Tenant[]
  loading: boolean
  setTenant: Function
  defaultMode: () => void
}) => {
  return (
    <>
      <div className="px-4 py-3">
        <div className="flex">
          <ArrowLeftIcon
            onClick={defaultMode}
            className="h-4 w-4 flex-none cursor-pointer"
          />
          <p className="flex-grow text-center text-sm">Switch Tenant</p>
        </div>
      </div>
      <div className="py-1">
        {loading && (
          <div className="ml-4 mt-2">
            {/* <Spinner /> */}
            {null}
          </div>
        )}
        <ul>
          {ownedTenants.map((t) => (
            <li key={t.id} onClick={() => setTenant(t)}>
              <a
                className="block hover:bg-gray-50 dark:hover:bg-slate-900"
                href=" #"
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="truncate">
                      <div className="flex text-sm">
                        <p
                          className={clsx(
                            'truncate font-medium',
                            tenantId === t.id
                              ? 'text-indigo-600 dark:text-sky-500'
                              : 'text-gray-600 dark:text-slate-300'
                          )}
                        >
                          {t.id}
                        </p>
                        <p className="ml-1 flex-shrink-0 font-normal text-gray-500 dark:text-slate-400">
                          {t.environmentTag}
                        </p>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500 dark:text-slate-400">
                          <FlagIcon
                            className={clsx(
                              'mr-1.5 h-5 w-5 flex-shrink-0',
                              tenantId === t.id
                                ? 'text-indigo-500 dark:text-sky-500'
                                : 'text-gray-400 dark:text-slate-300'
                            )}
                          />
                          <p>{t.regionCode.toUpperCase()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {t.id === tenantId && (
                      <CheckIcon className="h-4 w-4 text-indigo-500 dark:text-sky-500" />
                    )}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default function TenantDropdown() {
  const { list: ownedTenants = [], listLoading: loading } = useTenant()
  const refMenuButton = useRef<HTMLButtonElement>(null)
  const { setTenant, tenant } = useContext(TenantContext)

  useEffect(() => {
    if (!tenant && ownedTenants.length) {
      setTenant(ownedTenants[0])
    }
  }, [ownedTenants, ownedTenants.length, setTenant, tenant])

  const [mode, setMode] = useState<'default' | 'tenants'>('tenants')

  const listTenantsMode = () => {
    setMode('tenants')
  }

  const defaultMode = () => {
    setMode('default')
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => {
          return (
            <>
              <Menu.Button
                ref={refMenuButton}
                className="border-1 Sbold ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-4 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-sky-500 dark:focus:ring-offset-slate-900"
              >
                {tenant?.id}
                <ChevronDownIcon
                  className="ml-2 -mr-0.5 h-4 w-4"
                  aria-hidden="true"
                />
              </Menu.Button>
              {open && (
                <Menu.Items
                  static
                  className="absolute right-0 mt-2 h-72 w-72  origin-top-right divide-y divide-gray-100 overflow-scroll rounded-xl bg-white shadow-md shadow-black/5 ring-1 ring-black ring-black/5  ring-opacity-5 focus:outline-none dark:bg-slate-800"
                >
                  {mode === 'default' && !!tenant && (
                    <MenuItems
                      tenant={tenant}
                      listTenantsMode={listTenantsMode}
                    />
                  )}
                  {mode === 'tenants' && (
                    <ListTenants
                      tenantId={tenant?.id || ''}
                      ownedTenants={ownedTenants}
                      loading={loading}
                      setTenant={(t: any) => {
                        setTenant(t)
                        refMenuButton.current?.click()
                      }}
                      defaultMode={defaultMode}
                    />
                  )}
                </Menu.Items>
              )}
            </>
          )
        }}
      </Menu>
    </>
  )
}
