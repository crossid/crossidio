import Logo from '@/components/Logo'
import Notifications, { NotificationDef } from '@/components/Notifications'
import NoLayout from '@/layouts/none'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/outline'
import { CheckCircleIcon, CloudIcon, CodeIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { Dispatch, Fragment, SetStateAction, useEffect, useMemo, useState } from 'react'
import useDisposableList from 'use-disposable-list'

function isEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const publicDomains = ['gmail.com']

const features = [
  { name: 'Users & Groups', icon: CheckCircleIcon },
  { name: 'App scoped access', icon: CheckCircleIcon },
  { name: 'SSO via OAuth2', icon: CheckCircleIcon },
  { name: 'Social providers', icon: CheckCircleIcon },
  { name: 'Passwordless authentication', icon: CheckCircleIcon },
]

interface env {
  id: string
  title: string
  description: string
  icon: React.ElementType
  current: boolean
  disabled?: boolean
}

const envs: env[] = [
  {
    id: 'prod',
    title: 'Production Stage',
    description: 'Stable, for production use..',
    icon: CloudIcon,
    current: true,
  },
  {
    id: 'preview',
    title: 'Preview Stage',
    description: 'Latest features, non production.',
    icon: CodeIcon,
    current: false,
  },
]

function Signup() {
  const [signed, setSigned] = useState(false)

  return (
    <div className="relative bg-gray-800 overflow-hidden bg-gradient-to-r from-purple-800 to-indigo-700 h-screen">
      <div className="hidden sm:block sm:absolute sm:inset-0" aria-hidden="true">
        <svg
          className="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-indigo-600 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
          width={364}
          height={384}
          viewBox="0 0 364 384"
          fill="none"
        >
          <defs>
            <pattern
              id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} fill="currentColor" />
            </pattern>
          </defs>
          <rect width={364} height={384} fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)" />
        </svg>
      </div>
      <div className="relative pt-2 lg:pt-12 pb-16 sm:pb-36">
        <header className="ml-4 lg:ml-12">
          <Logo kind="dark" />
        </header>
        <main className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <a
                    href="#"
                    className="inline-flex items-center text-white bg-gray-900 p-3 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200 rounded-sm"
                  >
                    <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-indigo-500 rounded-sm">
                      Start Free
                    </span>
                    <span className="ml-4 text-sm">No credit card required.</span>
                    {/* <ChevronRightIcon className="ml-2 w-5 h-5 text-gray-500" aria-hidden="true" /> */}
                  </a>
                  <h1 className="mt-4 text-3xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-8 lg:text-4xl xl:text-5xl">
                    <p className="md:block">
                      Built for{' '}
                      <span className="border px-2 border-gray-400 rounded-2xl">developers</span>,
                    </p>{' '}
                    <p className="text-indigo-200 md:block py-3 md:py-4 lg:py-6">
                      designed for{' '}
                      <span className="border px-2 border-gray-400 rounded-2xl">business</span>.
                    </p>
                  </h1>
                  <dl className="mt-8 space-y-10 hidden lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:gap-y-4">
                    {features.map((feature) => (
                      <div key={feature.name} className="relative">
                        <dt>
                          <CheckCircleIcon
                            className="absolute h-6 w-6 text-indigo-200"
                            aria-hidden="true"
                          />
                          <p className="ml-9 text-md leading-6 font-sm text-white">
                            {feature.name}
                          </p>
                        </dt>
                      </div>
                    ))}
                  </dl>
                  {/* <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                    commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua ad ad non deserunt
                    sunt.
                  </p> */}
                  {/* <p className="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10">
                    Used by
                  </p>
                  <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                    <div className="flex flex-wrap items-start justify-between">
                      <div className="flex justify-center px-1">
                        <img
                          className="h-9 sm:h-10"
                          src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                          alt="Tuple"
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                {!signed && <Form onSuccess={() => setSigned(true)} />}
                {signed && (
                  <div className="max-w-lg lg:max-w-none mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center bg-white rounded-md">
                    <h2 className="text-2xl tracking-tight font-extrabold text-indigo-600 sm:text-5xl md:text-4xl">
                      <span className="block xl:inline">Success, check your mail</span>
                    </h2>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                      Please check your mail for further steps.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const Form = ({ onSuccess }: { onSuccess: Function }) => {
  const [tenantId, setTenantId] = useState('')
  const [isTenantManual, setTenantManual] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [inSubmit, setInSubmit] = useState(false)
  const [errors, setErrors] = useState({
    password: '',
    tenantId: '',
  })
  const [notifs, addNotif, removeNotif] = useDisposableList<NotificationDef>({
    timeout: 2000,
  })

  const [env, setEnv] = useState(envs[0])

  useEffect(() => {
    if (isTenantManual) {
      return
    }
    const { email } = form
    let tid = ''
    if (isEmail(email)) {
      const domain = email.split('@')[1]
      if (publicDomains.indexOf(domain) > -1) {
        tid = email.split('@')[0]
      } else {
        tid = domain.split('.')[0]
      }
    }

    if (tid) {
      setTenantId(tid)
    }
  }, [form.email])

  const handleChange = (e: any) => {
    if (e.target.name === 'password' && e.target.value.length < 8) {
      setErrors({ ...errors, password: 'Minimum 8 chars' })
    } else {
      setErrors({ ...errors, password: '' })
    }
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    setIsSubmitted(true)
    e.preventDefault()
    // if (Object.keys(errors).filter((k: string) => errors[k] !== '').length > 0) {
    // return
    // }
    if (errors['password'] != '') {
      return
    }

    const body = {
      type: 'developer',
      tenantId,
      user: {
        displayName: form.fullName,
        email: form.email,
        password: form.password,
      },
    }

    const base = 'crossid.io/api/global/v1/tenants/.register'
    const url = env.id === 'preview' ? `https://root.preview.${base}` : `https://root.${base}`
    setInSubmit(true)
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((r) => {
        if (r.status === 200) {
          onSuccess()
        } else if (r.status === 409) {
          setErrors({ ...errors, tenantId: `Tenant "${tenantId}" already exists.` })
        } else {
          addNotif({
            message: 'Failed to register account, please try again later.',
            level: 'error',
          })
        }
      })
      .catch((e) => {
        addNotif({ message: 'Failed to register account, please try again later.', level: 'error' })
      })
      .finally(() => setInSubmit(false))
  }

  return (
    <>
      <Notifications items={notifs} removeItem={removeNotif} />
      <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
        <div className="px-4 py-8 sm:px-10">
          {/* <div>
                      <p className="text-sm font-medium text-gray-700">Sign in with</p>

                      <div className="mt-1 grid grid-cols-3 gap-3">
                        <div>
                          <a
                            href="#"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            <span className="sr-only">Sign in with Facebook</span>
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </div>

                        <div>
                          <a
                            href="#"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            <span className="sr-only">Sign in with Twitter</span>
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                        </div>

                        <div>
                          <a
                            href="#"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            <span className="sr-only">Sign in with GitHub</span>
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div> 

                    <div className="mt-6 relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                      </div>
                    </div>
                    */}

          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  autoComplete="fullName"
                  placeholder="Full name"
                  required
                  className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="Email address"
                  required
                  className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  value={form.password}
                  onChange={handleChange}
                />
                <span className="block text-xs text-indigo-500 h-2 min-h-full">
                  {isSubmitted && errors.password && errors.password}
                </span>
              </div>

              <div>
                <label htmlFor="tenant" className="sr-only">
                  Tenant
                </label>
                <input
                  type="text"
                  name="tenant"
                  id="tenant"
                  autoComplete="off"
                  placeholder="Tenant ID"
                  required
                  onFocus={(event) => event.target.select()}
                  className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  value={tenantId}
                  onChange={(e) => {
                    let value = e.target.value
                    value = value.replace(/[^a-z0-9]/g, '')
                    setTenantId(value)
                    setTenantManual(true)
                  }}
                />
                <span className="block text-xs text-indigo-500 h-2 min-h-full">
                  {isSubmitted && errors.tenantId && errors.tenantId}
                </span>
              </div>

              <div>
                <ListBox selected={env} setSelected={setEnv} />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={inSubmit}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60"
                >
                  Get Started
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
          <p className="text-xs leading-5 text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="font-medium text-gray-900 hover:underline">
              Terms
            </a>
            ,{' '}
            <a href="#" className="font-medium text-gray-900 hover:underline">
              Data Policy
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-gray-900 hover:underline">
              Cookies Policy
            </a>
            .
          </p>
        </div>
      </div>
    </>
  )
}

function ListBox({
  selected,
  setSelected,
}: {
  selected: env
  setSelected: Dispatch<SetStateAction<env>>
}) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change published status</Listbox.Label>
          <div className="relative">
            <div className="inline-flex w-full rounded-md divide-x divide-indigo-700">
              <div className="relative z-0 inline-flex w-full justify-center rounded-md divide-x divide-indigo-700">
                <div className="relative inline-flex w-full bg-white py-2 pl-3 pr-4 border border-gray-300 rounded-l-md">
                  <selected.icon className="h-5 w-5" aria-hidden="true" />
                  <p className="ml-2.5 text-sm w-full text-center font-medium">{selected.title}</p>
                </div>
                <Listbox.Button className="relative inline-flex items-center bg-indigo-600 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                  <span className="sr-only">Change env</span>
                  <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {envs.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    disabled={option.disabled}
                    className={({ active }) =>
                      clsx(
                        active ? 'text-white bg-indigo-500' : 'text-gray-900',
                        'cursor-default select-none relative p-4 text-sm'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p className={selected ? 'font-semibold' : 'font-normal'}>
                            {option.title}
                          </p>
                          {selected ? (
                            <span className={active ? 'text-white' : 'text-indigo-500'}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                        <p className={clsx(active ? 'text-indigo-200' : 'text-gray-500', 'mt-2')}>
                          {option.description}
                        </p>
                      </div>
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

Signup.layoutProps = {
  Layout: NoLayout,
  meta: {
    title: 'Sign Up',
  },
}

export default Signup
