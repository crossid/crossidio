import { useRef, Fragment, ReactNode } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Logo } from './Logo'
import { useAuth } from '@crossid/crossid-react'
import {
  AcademicCapIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  ChevronDownIcon,
  ComputerDesktopIcon,
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PencilSquareIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { features } from '@/data/features'
import Image from 'next/image'
import Avatar from './Avatar'
import { ThemeSelector } from './ThemeSelector'
import { INav } from '@/types'
import { MobileNavigation } from './docs/MobileNav'

const callsToAction = [
  // { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'Contact Sales', href: '/contact', icon: EnvelopeIcon },
]

const developer = [
  {
    name: 'Docs',
    href: '/docs',
    icon: DocumentTextIcon,
  },
  {
    name: 'Blog',
    href: '/blog',
    icon: PencilSquareIcon,
  },
  {
    name: 'Reference',
    href: 'https://developer.crossid.io/docs/reference/api',
    icon: DocumentMagnifyingGlassIcon,
  },
]

const resources = [
  { name: 'Community', href: '#', icon: UsersIcon },
  { name: 'Partners', href: '#', icon: GlobeAltIcon },
  { name: 'Guides', href: '#', icon: BookmarkSquareIcon },
  { name: 'Webinars', href: '#', icon: ComputerDesktopIcon },
]

const blogPosts = [
  {
    id: 1,
    name: 'Deploy identity-aware Monorepo on DigitalOcean.',
    href: 'https://developer.crossid.io/blog/do-crossid-monorepo',
    preview:
      'See how you can deploy frontend and backend components with identity-awareness on DigitalOcean in minutes.',
    imageUrl: '/todo',
  },
  {
    id: 2,
    name: 'Echo with OAuth2.',
    href: 'https://developer.crossid.io/blog/echo-with-oauth2',
    preview:
      'Show to protect Echo endpoints with access token issued by Crossid OAuth2 auth server.',
    imageUrl: '/todo',
  },
  // {
  //   id: 3,
  //   name: 'Oauth2-Proxy with Crossid.',
  //   href: 'https://developer.crossid.io/blog/oauth2-proxy',
  //   preview: 'Protect your apps and files using oauth2-proxy identity awareness proxy.',
  //   imageUrl: 'https://oauth2-proxy.github.io/oauth2-proxy/img/logos/OAuth2_Proxy_icon.svg',
  // },
  // {
  //   id: 2,
  //   name: 'What is SCIM.',
  //   href: 'https://developer.crossid.io/blog/what-is-scim',
  //   preview:
  //     'The protocol to manage user identity in cloud-based applications and services in a standardized way.',
  //   imageUrl: 'https://www.thousandeyes.com/dA/ffba0ead06/Featured-Image-SCIM-Blog.png',
  // },
]

function MenuItemChevron({ open }: { open: boolean }) {
  return (
    <ChevronDownIcon
      className={clsx(
        'ml-2 h-5 w-5 transform text-black duration-150 ease-in-out dark:text-white',
        open && 'rotate-180'
      )}
      aria-hidden="true"
    />
  )
}

export default function Nav({ navigation }: { navigation?: INav }) {
  const featuresButtonRef = useRef<HTMLButtonElement>(null)
  const resourcesButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)

  const closeMobileMenu = () => {
    mobileMenuButtonRef.current?.click()
  }

  let {
    loginWithRedirect,
    logoutWithRedirect,
    idToken,
    loading: authLoading,
  } = useAuth()

  return (
    <Popover className="relative ">
      {({ open }) => (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-30"
            aria-hidden="true"
          />
          <div className="relative z-20">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-8 lg:justify-start lg:space-x-10 lg:px-8">
              {/* logo section */}
              <div>
                <Link href="/" className="flex">
                  <span className="sr-only">Crossid</span>
                  <Logo kind="normal" />
                </Link>
              </div>
              {/* mobile menu button */}
              <div className="-my-2 -mr-2 lg:hidden">
                <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-slate-800 dark:focus:ring-sky-500">
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-between">
                <Popover.Group as="nav" className="flex space-x-8">
                  {/* Features menu */}
                  <Popover>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          ref={featuresButtonRef}
                          className="group inline-flex items-center rounded-md text-base font-bold text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-white dark:ring-offset-slate-900 dark:focus:ring-sky-500"
                        >
                          <span>Features</span>
                          <MenuItemChevron open={open} />
                        </Popover.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 -translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 -translate-y-1"
                        >
                          <Popover.Panel
                            static
                            className="absolute inset-x-0 top-full z-10 hidden transform bg-white shadow-lg dark:bg-slate-900 md:block"
                          >
                            <div className="mx-auto grid max-w-7xl gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                              {features.map((item) => (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  className="-m-3 flex flex-col justify-between rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-slate-800"
                                  onClick={() =>
                                    featuresButtonRef?.current?.click()
                                  }
                                >
                                  <div className="flex md:h-full lg:flex-col">
                                    <div className="flex-shrink-0">
                                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-black text-white dark:bg-sky-500 dark:text-slate-900 sm:h-12 sm:w-12">
                                        <item.icon
                                          className="h-6 w-6"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </div>
                                    <div className="ml-4 md:flex md:flex-1 md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                      <div>
                                        <p className="text-base font-medium text-gray-900 dark:text-slate-50">
                                          {item.title}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-slate-300">
                                          {item.description}
                                        </p>
                                      </div>
                                      <p className="mt-2 text-sm font-medium text-indigo-600 dark:text-sky-500 lg:mt-4">
                                        Learn more{' '}
                                        <span aria-hidden="true">&rarr;</span>
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="bg-gray-50 dark:bg-sky-700">
                              <div className="mx-auto max-w-7xl space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                                {callsToAction.map((item) => (
                                  <div key={item.name} className="flow-root">
                                    <Link
                                      href={item.href}
                                      className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100 dark:hover:bg-sky-800"
                                      onClick={() =>
                                        featuresButtonRef?.current?.click()
                                      }
                                    >
                                      <item.icon
                                        className="h-6 w-6 flex-shrink-0 text-gray-400 dark:text-slate-800"
                                        aria-hidden="true"
                                      />
                                      <span className="ml-3">{item.name}</span>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                  {/* Resources Menu */}
                  <Popover>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          ref={resourcesButtonRef}
                          className="group inline-flex items-center rounded-md text-base font-bold text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-white dark:ring-offset-slate-900 dark:focus:ring-sky-500"
                        >
                          <span>Resources</span>
                          <MenuItemChevron open={open} />
                        </Popover.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 -translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 -translate-y-1"
                        >
                          <Popover.Panel
                            static
                            className="absolute inset-x-0 top-full z-10 hidden transform shadow-lg md:block"
                          >
                            <div className="absolute inset-0 flex">
                              <div className="w-1/2 bg-white dark:bg-slate-900" />
                              <div className="w-1/2 bg-gray-50 dark:bg-slate-800" />
                            </div>
                            <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                              <nav className="grid gap-y-10 bg-white px-4 py-8 dark:bg-slate-900 sm:grid-cols-2 sm:gap-x-8 sm:py-12 sm:px-6 lg:px-8 xl:pr-12">
                                <div>
                                  <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-sky-500">
                                    Developer
                                  </h3>
                                  <ul className="mt-5 space-y-6">
                                    {developer.map((item) => (
                                      <li key={item.name} className="flow-root">
                                        <Link
                                          href={item.href}
                                          onClick={() =>
                                            resourcesButtonRef.current?.click()
                                          }
                                          className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-slate-500 dark:hover:bg-slate-800"
                                        >
                                          <item.icon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 dark:text-sky-500"
                                            aria-hidden="true"
                                          />
                                          <span className="ml-4">
                                            {item.name}
                                          </span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="hidden">
                                  <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500">
                                    Resources
                                  </h3>
                                  <ul className="mt-5 space-y-6">
                                    {resources.map((item) => (
                                      <li key={item.name} className="flow-root">
                                        <a
                                          href={item.href}
                                          className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                                        >
                                          <item.icon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400"
                                            aria-hidden="true"
                                          />
                                          <span className="ml-4">
                                            {item.name}
                                          </span>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </nav>
                              <div className="bg-gray-50 px-4 py-8 dark:bg-slate-800 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
                                <div>
                                  <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-sky-500">
                                    From the blog
                                  </h3>
                                  <ul className="mt-6 space-y-6">
                                    {blogPosts.map((post) => (
                                      <li key={post.id} className="flow-root">
                                        <a
                                          href={post.href}
                                          className="-m-3 flex rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-slate-900"
                                        >
                                          <div className="hidden flex-shrink-0 sm:block">
                                            <Image
                                              className="h-20 w-20 rounded-md object-cover"
                                              width={500}
                                              height={500}
                                              src={post.imageUrl}
                                              alt=""
                                            />
                                          </div>
                                          <div className="w-0 flex-1 sm:ml-8">
                                            <h4 className="truncate text-base font-medium text-gray-900 dark:text-slate-100">
                                              {post.name}
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-slate-300">
                                              {post.preview}
                                            </p>
                                          </div>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="mt-6 text-sm font-medium">
                                  <a
                                    href="https://developer.crossid.io/blog"
                                    className="text-indigo-600 hover:text-indigo-500 dark:text-sky-600 dark:hover:text-sky-500"
                                  >
                                    {' '}
                                    View all posts{' '}
                                    <span aria-hidden="true">&rarr;</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </Popover.Group>
                <div className="flex items-center">
                  <ThemeSelector className="relative z-10" />
                  {!idToken && !authLoading && (
                    <button
                      className="ml-4 text-xs font-bold text-black hover:underline dark:text-sky-500"
                      onClick={() => loginWithRedirect({})}
                    >
                      Sign in
                    </button>
                  )}
                  {!idToken && !authLoading && (
                    <Link
                      href="/signup"
                      className="ml-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-bold leading-4 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Try Free
                    </Link>
                  )}
                  {idToken && !authLoading && (
                    <a
                      className="ml-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-bold leading-4 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      rel="noreferrer"
                      href="https://manage.crossid.io/cockpit"
                      target="_blank"
                    >
                      Manage
                    </a>
                  )}
                  <Link
                    href="/contact"
                    className="ml-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-xs font-bold leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-sky-500 dark:ring-offset-slate-900 dark:hover:bg-sky-700 dark:focus:ring-sky-500"
                  >
                    Contact Sales
                  </Link>
                  {!!idToken && (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          {/* <img className="h-8 w-8 rounded-full" src="aa" alt="" /> */}
                          <Avatar name={idToken?.email} size={8} />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item key="1">
                            {({ active }) => (
                              <a
                                href="https://manage.crossid.io/cockpit"
                                rel="noreferrer"
                                target="_blank"
                                className={clsx(
                                  active ? 'bg-gray-100' : '',
                                  'block cursor-pointer px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Manage
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item key="2">
                            {({ active }) => (
                              <a
                                onClick={() => logoutWithRedirect({})}
                                className={clsx(
                                  active ? 'bg-gray-100' : '',
                                  'block cursor-pointer px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition lg:hidden"
            >
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:divide-slate-800 dark:bg-slate-900 dark:shadow-sky-700">
                <div className="px-5 pt-5 pb-6 sm:pb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <Logo kind="normal" />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button
                        ref={mobileMenuButtonRef}
                        className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-slate-900 dark:focus:ring-sky-500"
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-8">
                    <nav>
                      <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                        {features.map((item) => (
                          <a
                            key={item.id}
                            href={item.href}
                            className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                          >
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-black text-white sm:h-12 sm:w-12">
                              <item.icon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-4 text-base font-medium text-gray-900">
                              {item.title}
                            </div>
                          </a>
                        ))}
                      </div>
                      <div className="mt-8 text-base">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-600"
                        >
                          {' '}
                          View all products{' '}
                          <span aria-hidden="true">&rarr;</span>
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="grid grid-cols-2 gap-4">
                    {/* <a
                        href="#"
                        className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                      >
                        Pricing
                      </a> */}

                    <Link
                      href="/docs/guides/get-started/preface"
                      onClick={closeMobileMenu}
                      className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                      Docs
                    </Link>

                    <Link
                      href="/company"
                      onClick={closeMobileMenu}
                      className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                      Company
                    </Link>

                    <Link
                      href="/blog"
                      className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300"
                      onClick={closeMobileMenu}
                    >
                      Blog
                    </Link>

                    <Link
                      href="/contact"
                      onClick={closeMobileMenu}
                      className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300"
                    >
                      Contact Sales
                    </Link>
                  </div>
                  <div className="mt-6">
                    {!idToken && (
                      <Link
                        href="/signup"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-sky-600 dark:hover:bg-sky-700"
                      >
                        Try Free
                      </Link>
                    )}
                    {idToken && (
                      <a
                        href="https://manage.crossid.io/cockpit"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-sky-600 dark:hover:bg-sky-700"
                      >
                        Manage
                      </a>
                    )}
                    {!idToken && (
                      <p className="mt-6 text-center text-base font-medium text-gray-500">
                        Existing customer?{' '}
                        <a
                          href="#"
                          onClick={() => loginWithRedirect({})}
                          className="text-indigo-600 hover:text-indigo-500 dark:text-sky-600 dark:hover:text-sky-500"
                        >
                          Login
                        </a>
                      </p>
                    )}
                    {idToken && (
                      <p className="mt-6 text-center text-base font-medium text-gray-500">
                        <a
                          href="#"
                          onClick={() => logoutWithRedirect({})}
                          className="text-indigo-600 hover:text-indigo-500 dark:text-sky-600 dark:hover:text-sky-600"
                        >
                          Logout
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
          {navigation && (
            <div className="flex lg:hidden">
              <MobileNavigation navigation={navigation} />
            </div>
          )}
        </>
      )}
    </Popover>
  )
}
