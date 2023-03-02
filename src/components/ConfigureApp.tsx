import { Integration } from '@/data/applications'
import { Patch } from '@/data/patch'
import { useApps } from '@/hooks/apps'
import { useIntegrations } from '@/hooks/integrations'
import { TenantContext } from '@/hooks/tenant'
import { IApp, IAppConfigureData } from '@/types'
import { Listbox, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import {
  FocusEvent,
  ForwardRefExoticComponent,
  Fragment,
  SVGProps,
  useContext,
  useMemo,
  useState,
} from 'react'

function NewApp({
  integrations,
  setIntegration,
  integration,
  onCancel,
  onCreateApp: onAddApp,
}: {
  integrations: Integration[]
  setIntegration: (i: Integration) => void
  integration: Integration | null
  onCancel: Function
  onCreateApp: (cd: IAppConfigureData, onSuccess: Function) => void
}) {
  const [demoApp, setDemoApp] = useState<IAppConfigureData>({
    loginUri: 'http://localhost',
    logoutUri: 'http://localhost',
    corsOrigin: 'http://localhost*',
  })

  function isSubmitDisabled(): boolean {
    return !integration || !demoApp.loginUri
  }

  return (
    <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-4" action="#" method="POST">
        <AppSelector
          title="Create New Application"
          app={integration}
          setApp={setIntegration}
          apps={integrations}
        />
        <>
          <ConfigureAppInput
            title="Login Redirect URL"
            placeholder="Login URL"
            id="redirect_uri"
            required
            value={demoApp.loginUri || ''}
            setValue={(d) => {
              setDemoApp(demoApp && { ...demoApp, loginUri: d })
            }}
          />
          <ConfigureAppInput
            title="Logout Redirect URL"
            id="post_logout_redirect_uri"
            value={demoApp.logoutUri || ''}
            setValue={(d: string) => {
              setDemoApp({ ...demoApp, logoutUri: d })
            }}
            placeholder={'Logout Redirect'}
          />
          <ConfigureAppInput
            title="Web Origin"
            id="allowed_cors_origin"
            value={demoApp.corsOrigin || ''}
            setValue={(d) => {
              setDemoApp({ ...demoApp, corsOrigin: d })
            }}
            placeholder={'Web Origin'}
          />
        </>
        <div className="flex">
          <button
            disabled={isSubmitDisabled()}
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              onAddApp(demoApp, onCancel)
            }}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 dark:ring-offset-slate-900"
          >
            Create
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              onCancel()
            }}
            className="ml-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-400 dark:bg-slate-300 dark:ring-offset-slate-900 dark:hover:bg-slate-400 dark:focus:ring-sky-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

type mode = 'new' | 'edit' | 'select'
/**
 *
 * @param param0
 * @returns
 */
export function ConfigureApp({
  app,
  setApp,
  apps,
  integrations,
  integration,
  setIntegration,
  onSubmit,
  onCancel,
  onCreateApp,
}: {
  app: IApp | null
  setApp: (app?: IApp) => void
  apps: IApp[]
  integrations: Integration[]
  integration: Integration | null
  setIntegration: (i: Integration) => void
  onSubmit: Function
  onCancel: Function
  onCreateApp: (cd: IAppConfigureData, onSuccess: Function) => void
}) {
  const [mode, setMode] = useState<mode>('select')
  const [editMode, setEditMode] = useState<editMode>('edit')

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
      {mode === 'select' ? (
        <ConfigureAppMenu
          onSelect={(chosen: mode) => {
            setMode(chosen)
          }}
        />
      ) : (
        <>
          {mode === 'edit' ? (
            <ConfigureAppForm
              apps={apps}
              app={app}
              setApp={setApp}
              mode={editMode}
              onModeChange={(mode: editMode) => setEditMode(mode)}
              onSubmit={() => {
                onSubmit()
                setEditMode('display')
              }}
              onCancel={() => {
                onCancel()
                setMode('select')
              }}
            />
          ) : (
            <NewApp
              integrations={integrations}
              setIntegration={setIntegration}
              integration={integration}
              onCancel={() => setMode('select')}
              onCreateApp={onCreateApp}
            />
          )}
        </>
      )}
    </div>
  )
}

interface IItem {
  mode: mode
  title: string
  description: string
  backgroundColor: string
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
}

const items: IItem[] = [
  {
    mode: 'new',
    title: 'Create new App',
    description: 'Create and configure a new application.',
    backgroundColor: 'bg-pink-500',
    icon: ChevronUpDownIcon,
  },
  {
    mode: 'edit',
    title: 'Configure an existing App',
    description: 'Select an existing application.',
    backgroundColor: 'bg-purple-500',
    icon: PlusIcon,
  },
]

function ConfigureAppMenu({
  onSelect,
}: {
  onSelect: (selected: mode) => void
}) {
  return (
    <div className="mx-auto max-w-lg">
      <h2 className="text-base font-semibold leading-6 text-gray-900 dark:text-slate-200">
        Setup an application
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
        Select an existing or create a new one application, selecting an app
        will customize code accordingly.
      </p>
      <ul
        role="list"
        className="mt-6 grid grid-cols-1 gap-6 border-t border-b border-gray-200 py-6 sm:grid-cols-1"
      >
        {items.map((item, itemIdx) => (
          <li key={itemIdx} className="flow-root">
            <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50 dark:focus-within:ring-sky-500 dark:hover:bg-slate-800">
              <div
                className={clsx(
                  item.backgroundColor,
                  'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg'
                )}
              >
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-slate-200">
                  <a
                    onClick={() => onSelect(item.mode)}
                    className="focus:outline-none"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    <span>{item.title}</span>
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex">
        <Link
          href="/docs/concepts/application"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
        >
          Want to know more about apps?
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
  )
}

type editMode = 'edit' | 'display'
function ConfigureAppForm({
  app,
  setApp = () => {},
  apps,
  onSubmit,
  onCancel,
  mode = 'edit',
  onModeChange,
}: {
  app: IApp | null
  setApp?: (app: IApp) => void
  apps: IApp[]
  onSubmit: () => void
  onCancel: () => void
  mode: editMode
  onModeChange: (mode: editMode) => void
}) {
  function isSubmitDisabled(): boolean {
    return !app?.loginUri
  }

  return (
    <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-4" action="#" method="POST">
        <AppSelector app={app} setApp={setApp} apps={apps} />
        {app && mode === 'display' && (
          <button
            className="text-indigo-500"
            onClick={(e) => {
              e.preventDefault()
              onModeChange('edit')
            }}
          >
            Edit
          </button>
        )}
        {app && mode === 'edit' && (
          <>
            <ConfigureAppInput
              title="Login Redirect URL"
              placeholder="Login URL"
              id="redirect_uri"
              required
              value={app?.loginUri || ''}
              setValue={(d) => {
                setApp(app && { ...app, loginUri: d })
              }}
            />
            <ConfigureAppInput
              title="Logout Redirect URL"
              id="post_logout_redirect_uri"
              value={app?.logoutUri || ''}
              setValue={(d: string) => {
                setApp(app && { ...app, logoutUri: d })
              }}
              placeholder={'Logout Redirect'}
            />
            <ConfigureAppInput
              title="Web Origin"
              id="allowed_cors_origin"
              value={app?.corsOrigin || ''}
              setValue={(d) => {
                setApp(app && { ...app, corsOrigin: d })
              }}
              placeholder={'Web Origin'}
            />
          </>
        )}
        {mode === 'edit' && (
          <div className="flex">
            <button
              disabled={isSubmitDisabled()}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onSubmit()
              }}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 dark:ring-offset-slate-900"
            >
              Update
            </button>
            <button
              type="submit"
              disabled={isSubmitDisabled()}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onCancel()
              }}
              className="ml-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-400 dark:bg-slate-300 dark:ring-offset-slate-900 dark:hover:bg-slate-400 dark:focus:ring-sky-500"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

function ConfigureAppInput({
  id,
  title,
  placeholder,
  value,
  required,
  setValue,
}: {
  id: string
  title: string
  placeholder: string
  value: string
  required?: boolean
  setValue: (s: string) => void
}) {
  const handleFocus = (event: FocusEvent<HTMLInputElement>) =>
    event.target.select()

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={id}
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          onFocus={handleFocus}
          className="form-input block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-sky-500 dark:focus:ring-sky-500"
        />
        {required && !value ? (
          <span className="text-sm text-red-600">Required</span>
        ) : null}
      </div>
    </div>
  )
}

type selectorApp = IApp | Integration | null

const placeholder = 'Please select an app'
function AppSelector({
  title = 'Assigned to',
  app,
  setApp,
  apps,
}: {
  title?: string
  app: selectorApp
  setApp: Function
  apps: selectorApp[]
}) {
  return (
    <Listbox defaultValue={app} onChange={(a: selectorApp) => setApp(a)}>
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {title}
            </Listbox.Label>
            <Listbox.Button className="relative mt-1 w-full cursor-default rounded-md border border-gray-300 bg-white py-3 px-4 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-sky-500 dark:focus:ring-sky-500 sm:text-sm">
              <span className="flex items-center">
                <span
                  aria-label={app?.active ? 'Online' : 'Offline'}
                  className={clsx(
                    app?.active
                      ? 'bg-green-400 dark:bg-green-700'
                      : 'bg-gray-200 dark:bg-slate-500',
                    'inline-block h-2 w-2 flex-shrink-0 rounded-full'
                  )}
                />
                <span className="ml-3 block truncate">
                  {app?.displayName || placeholder}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 sm:text-sm">
                {apps.map((app) => (
                  <Listbox.Option
                    key={app?.id}
                    className={({ active }) =>
                      clsx(
                        active
                          ? 'bg-indigo-600 text-white dark:bg-sky-800'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={app}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={clsx(
                              app?.active
                                ? 'bg-green-400 dark:bg-green-700'
                                : 'bg-gray-200 dark:bg-slate-500',
                              'inline-block h-2 w-2 flex-shrink-0 rounded-full'
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={clsx(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {app?.displayName}
                            <span className="sr-only">
                              {' '}
                              is {app?.active ? 'active' : 'inactive'}
                            </span>
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={clsx(
                              active
                                ? 'text-white'
                                : 'text-indigo-600 dark:text-sky-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

/*
function ConfigureAppInput({
  id,
  value,
  setValue,
  placeholder,
}: {
  id: string
  value: string
  setValue: Dispatch<React.SetStateAction<string>>
  placeholder: string
}) {
  return (
    <div className="relative">
      <input
        type="text"
        id={id}
        className="peer form-input block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-500 dark:focus:ring-sky-500 "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-indigo-600 dark:bg-slate-900 dark:text-gray-400 dark:peer-focus:text-sky-500"
      >
        {placeholder}
      </label>
    </div>
  )
}
*/

// Configure App high order component
export function AppConfigurator({
  className,
  onChange,
}: {
  className: String
  onChange: (app: IApp | undefined) => void
}) {
  const { app, setApp: _setApp } = useContext(TenantContext)
  const { apps: appTuples, appsError, updateClient } = useApps()
  const { integrations = [], integrationsError, create } = useIntegrations()
  const [integration, setIntegration] = useState<Integration | null>(null)
  const [patchError, setPatchError] = useState<any>()

  const setApp = (app: IApp | undefined) => {
    _setApp(app)
    onChange(app)
  }

  const apps: IApp[] = useMemo(() => {
    if (!appTuples) {
      return []
    }

    return Object.values(appTuples || {}).map<IApp>((at) => {
      const {
        client: {
          id,
          client_id,
          redirect_uris = [],
          post_logout_redirect_uris = [],
          allowed_cors_origins = [],
        },
        app: { displayName, active },
      } = at

      const app: IApp = {
        id,
        displayName: displayName,
        active: active,
        clientId: client_id,
        loginUri: redirect_uris[0],
        logoutUri: post_logout_redirect_uris[0],
        corsOrigin: allowed_cors_origins[0],
      }
      return app
    })
  }, [appTuples])

  async function onSubmit() {
    const { id } = app!
    const formerClient = appTuples![id]
    const patch: Patch = {
      Operations: [],
      revision: formerClient.client.meta.revision,
    }

    const { post_logout_redirect_uris, allowed_cors_origins } =
      formerClient.client

    if (app?.loginUri !== formerClient.client.redirect_uris[0]) {
      patch.Operations.push({
        path: '/redirect_uris/0',
        op: 'replace',
        value: app?.loginUri,
        oldValue: formerClient.client.redirect_uris[0],
      })
    }

    if (!allowed_cors_origins && !app?.corsOrigin) {
      // nothing to do
    } else if (!allowed_cors_origins) {
      patch.Operations.push({
        path: 'allowed_cors_origins',
        op: 'add',
        value: [app?.corsOrigin],
      })
    } else if (!app?.corsOrigin) {
      patch.Operations.push({
        path: 'allowed_cors_origins',
        op: 'replace',
        value: allowed_cors_origins.slice(1),
        oldValue: allowed_cors_origins,
      })
    } else if (app?.corsOrigin !== allowed_cors_origins[0]) {
      patch.Operations.push({
        path: '/allowed_cors_origins/0',
        op: 'replace',
        value: app?.corsOrigin,
        oldValue: allowed_cors_origins[0],
      })
    }

    if (!post_logout_redirect_uris && !app?.logoutUri) {
      // nothing to do
    } else if (!post_logout_redirect_uris) {
      patch.Operations.push({
        path: 'post_logout_redirect_uris',
        op: 'add',
        value: [app?.logoutUri],
      })
    } else if (!app?.logoutUri) {
      patch.Operations.push({
        path: 'post_logout_redirect_uris',
        op: 'replace',
        value: post_logout_redirect_uris.slice(1),
        oldValue: post_logout_redirect_uris,
      })
    } else if (app?.logoutUri !== post_logout_redirect_uris[0]) {
      patch.Operations.push({
        path: '/post_logout_redirect_uris/0',
        op: 'replace',
        value: app?.logoutUri,
        oldValue: post_logout_redirect_uris[0],
      })
    }

    try {
      await updateClient({ clientId: id, patch })
      setPatchError(undefined)
    } catch (e: any) {
      setPatchError(e)
    }
  }

  function onCancel() {
    if (!app) {
      return
    }

    const { id } = app
    const formerApp = apps.find((app) => app.id === id)
    setApp(formerApp)
  }

  async function createApp(
    configurationData: IAppConfigureData,
    onSuccess: Function
  ) {
    if (!integration) {
      return
    }

    const id = (Math.random() + 1).toString(36)
    try {
      const createdApp = await create({
        integrationId: integration.id,
        appId: id.substring(2),
        appName: `demo application ${id.substring(9)}`,
        loginUris: [configurationData.loginUri],
        logoutUris: [configurationData.logoutUri],
        corsOrigins: [configurationData.corsOrigin],
        scopes: ['demo'],
        audiences: [`demo${id.substring(2)}`],
      })

      const {
        provisioning: {
          oauth2Client,
          p1: { app },
        },
      } = createdApp
      const createdOauthClientId = oauth2Client.id
      setApp({
        id: createdOauthClientId,
        displayName: app.displayName,
        active: app.active,
        loginUri: oauth2Client.redirect_uris[0],
        logoutUri: oauth2Client.post_logout_redirect_uris?.[0],
        corsOrigin: oauth2Client.allowed_cors_origins[0],
      })
      onSuccess()
    } catch (e: any) {
      // what to do on error??
    }
  }

  if (!!appsError || !!integrationsError) {
    return <div>{JSON.stringify(appsError || integrationsError)}</div>
  }

  return (
    <div className={clsx(className, 'mt-10 sm:mx-auto sm:w-full sm:max-w-md')}>
      <ConfigureApp
        apps={apps}
        app={app || null}
        integrations={integrations}
        integration={integration}
        setIntegration={setIntegration}
        setApp={setApp}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onCreateApp={createApp}
      />
      {!!patchError && (
        <span className="text-sm text-red-600">{patchError.message}</span>
      )}
    </div>
  )
}
