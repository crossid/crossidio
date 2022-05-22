import Footer from '../components/Footer'

/* This example requires Tailwind CSS v2.0+ */
import { Fragment, ReactNode, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  BookmarkAltIcon,
  BriefcaseIcon,
  DesktopComputerIcon,
  GlobeAltIcon,
  MenuIcon,
  UserGroupIcon,
  XIcon,
  MailIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  DocumentSearchIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import Logo from '@/components/Logo'
import { features } from 'features'
import { useAuth } from '@crossid/crossid-react'
import Avatar from '@/components/Avatar'

const callsToAction = [
  // { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'Contact Sales', href: 'contact', icon: MailIcon },
]

const resources = [
  { name: 'Community', href: '#', icon: UserGroupIcon },
  { name: 'Partners', href: '#', icon: GlobeAltIcon },
  { name: 'Guides', href: '#', icon: BookmarkAltIcon },
  { name: 'Webinars', href: '#', icon: DesktopComputerIcon },
]
const developer = [
  {
    name: 'Guides',
    href: 'https://developer.crossid.io/docs/guides/get-started',
    icon: AcademicCapIcon,
  },
  { name: 'Blog', href: 'https://developer.crossid.io/blog', icon: DocumentTextIcon },
  {
    name: 'Reference',
    href: 'https://developer.crossid.io/docs/reference/api',
    icon: DocumentSearchIcon,
  },
]

const blogPosts = [
  {
    id: 1,
    name: 'Deploy identity-aware Monorepo on DigitalOcean.',
    href: 'https://developer.crossid.io/blog/do-crossid-monorepo',
    preview:
      'See how you can deploy frontend and backend components with identity-awareness on DigitalOcean in minutes.',
    imageUrl:
      'https://images.prismic.io/www-static/72f5e1f3-5df0-40c0-8c7f-4d85f3ec0c92_AP-blog-banner.png?auto=compress,format',
  },
  {
    id: 2,
    name: 'Echo with OAuth2.',
    href: 'https://developer.crossid.io/blog/echo-with-oauth2',
    preview:
      'Show to protect Echo endpoints with access token issued by Crossid OAuth2 auth server.',
    imageUrl: 'https://avatars.githubusercontent.com/u/2624634',
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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Header() {
  const solutionButtonRef = useRef<HTMLButtonElement>(null)

  const closeMobileMenu = () => {
    document.getElementById('mobileCloseButton')?.click()
  }

  const { loginWithRedirect, logoutWithRedirect, idToken, loading: authLoading } = useAuth()

  return (
    <Popover className="relative bg-white">
      {({ open }) => (
        <>
          <div className="absolute inset-0 z-30 pointer-events-none" aria-hidden="true" />
          <div className="relative z-20">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:justify-start lg:space-x-10">
              <div>
                <Link href="/">
                  <a className="flex">
                    <span className="sr-only">Workflow</span>
                    {/* <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt=""
                  /> */}
                    <Logo kind="light" />
                  </a>
                </Link>
              </div>
              <div className="-mr-2 -my-2 lg:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-between">
                <Popover.Group as="nav" className="flex space-x-8">
                  <Popover>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          ref={solutionButtonRef}
                          className="group bg-white rounded-md inline-flex items-center text-base font-bold text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span>Features</span>
                          <ChevronDownIcon
                            className={clsx(
                              'text-black ml-2 h-5 w-5 transform ease-in-out duration-150',
                              open && 'rotate-180'
                            )}
                            aria-hidden="true"
                          />
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
                            className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg bg-white"
                          >
                            <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                              {features.map((item) => (
                                <a
                                  key={item.id}
                                  href={item.href}
                                  className="-m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-50"
                                >
                                  <div className="flex md:h-full lg:flex-col">
                                    <div className="flex-shrink-0">
                                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-black text-white sm:h-12 sm:w-12">
                                        <item.icon className="h-6 w-6" aria-hidden="true" />
                                      </span>
                                    </div>
                                    <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                      <div>
                                        <p className="text-base font-medium text-gray-900">
                                          {item.title}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {item.description}
                                        </p>
                                      </div>
                                      <p className="mt-2 text-sm font-medium text-indigo-600 lg:mt-4">
                                        Learn more <span aria-hidden="true">&rarr;</span>
                                      </p>
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                            <div className="bg-gray-50">
                              <div className="max-w-7xl mx-auto space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                                {callsToAction.map((item) => (
                                  <div key={item.name} className="flow-root">
                                    <Link href={item.href}>
                                      <a
                                        onClick={() => solutionButtonRef?.current?.click()}
                                        className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                      >
                                        <item.icon
                                          className="flex-shrink-0 h-6 w-6 text-gray-400"
                                          aria-hidden="true"
                                        />
                                        <span className="ml-3">{item.name}</span>
                                      </a>
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
                  <Popover>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? 'text-gray-900' : 'text-gray-900',
                            'group bg-white rounded-md inline-flex items-center text-base font-bold hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          )}
                        >
                          <span>Resources</span>
                          <ChevronDownIcon
                            className={clsx(
                              'text-black ml-2 h-5 w-5 transform ease-in-out duration-150',
                              open && 'rotate-180'
                            )}
                            aria-hidden="true"
                          />
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
                            className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg"
                          >
                            <div className="absolute inset-0 flex">
                              <div className="bg-white w-1/2" />
                              <div className="bg-gray-50 w-1/2" />
                            </div>
                            <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
                              <nav className="grid gap-y-10 px-4 py-8 bg-white sm:grid-cols-2 sm:gap-x-8 sm:py-12 sm:px-6 lg:px-8 xl:pr-12">
                                <div>
                                  <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                    Developer
                                  </h3>
                                  <ul className="mt-5 space-y-6">
                                    {developer.map((item) => (
                                      <li key={item.name} className="flow-root">
                                        <a
                                          href={item.href}
                                          className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                        >
                                          <item.icon
                                            className="flex-shrink-0 h-6 w-6 text-gray-400"
                                            aria-hidden="true"
                                          />
                                          <span className="ml-4">{item.name}</span>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="hidden">
                                  <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                    Resources
                                  </h3>
                                  <ul className="mt-5 space-y-6">
                                    {resources.map((item) => (
                                      <li key={item.name} className="flow-root">
                                        <a
                                          href={item.href}
                                          className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                        >
                                          <item.icon
                                            className="flex-shrink-0 h-6 w-6 text-gray-400"
                                            aria-hidden="true"
                                          />
                                          <span className="ml-4">{item.name}</span>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </nav>
                              <div className="bg-gray-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
                                <div>
                                  <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                    From the blog
                                  </h3>
                                  <ul className="mt-6 space-y-6">
                                    {blogPosts.map((post) => (
                                      <li key={post.id} className="flow-root">
                                        <a
                                          href={post.href}
                                          className="-m-3 p-3 flex rounded-lg hover:bg-gray-100"
                                        >
                                          <div className="hidden sm:block flex-shrink-0">
                                            <img
                                              className="w-20 h-20 object-cover rounded-md"
                                              src={post.imageUrl}
                                              alt=""
                                            />
                                          </div>
                                          <div className="w-0 flex-1 sm:ml-8">
                                            <h4 className="text-base font-medium text-gray-900 truncate">
                                              {post.name}
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-500">
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
                                    className="text-indigo-600 hover:text-indigo-500"
                                  >
                                    {' '}
                                    View all posts <span aria-hidden="true">&rarr;</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                  {/* <a href="#" className="text-base font-bold text-black">
                    Pricing
                  </a> */}
                </Popover.Group>
                <div className="flex items-center">
                  {/* <form action="#" className="hidden lg:block">
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex items-stretch flex-grow focus-within:z-10">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="border-t-2 border-b-2 border-l-2 border-r-2 sm:border-r-0 focus:black focus:border-black block w-full rounded-none rounded-l-md sm:text-sm border-black placeholder-gray-400 sm:max-w-xs focus:outline-none focus:border-transparent focus:ring-2 focus:ring-black"
                          placeholder="Your work email"
                        />
                      </div>
                      <button className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border-2 border-black text-sm font-bold rounded-r-md text-white bg-black hover:text-black hover:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                        <span>Get Started</span>
                      </button>
                    </div>
                  </form> */}
                  {!idToken && !authLoading && (
                    <button
                      className="text-xs font-bold text-black hover:underline"
                      onClick={() => loginWithRedirect({})}
                    >
                      Sign in
                    </button>
                  )}
                  {!idToken && !authLoading && (
                    <Link href="/signup">
                      <a className="ml-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs leading-4 rounded-md font-bold text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Try Free
                      </a>
                    </Link>
                  )}
                  {idToken && !authLoading && (
                    <a
                      className="ml-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs leading-4 rounded-md font-bold text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      href="https://manage.crossid.io/cockpit"
                      target="_blank"
                    >
                      Manage
                    </a>
                  )}
                  <Link href="/contact">
                    <a className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-xs leading-4 font-bold rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Contact Sales
                    </a>
                  </Link>
                  {!!idToken && (
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item key="1">
                            {({ active }) => (
                              <a
                                href="https://manage.crossid.io/cockpit"
                                target="_blank"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
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
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
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
              className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5 sm:pb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button
                        id="mobileCloseButton"
                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      >
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
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
                            className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-black text-white sm:h-12 sm:w-12">
                              <item.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <div className="ml-4 text-base font-medium text-gray-900">
                              {item.title}
                            </div>
                          </a>
                        ))}
                      </div>
                      <div className="mt-8 text-base">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                          {' '}
                          View all products <span aria-hidden="true">&rarr;</span>
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

                    <a
                      href="https://developer.crossid.io/docs/guides/get-started"
                      className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Docs
                    </a>

                    <Link href="/company">
                      <a
                        onClick={closeMobileMenu}
                        className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                      >
                        Company
                      </a>
                    </Link>

                    <a
                      href="https://developer.crossid.io/blog"
                      className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Blog
                    </a>

                    <Link href="/contact">
                      <a
                        onClick={closeMobileMenu}
                        className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                      >
                        Contact Sales
                      </a>
                    </Link>
                  </div>
                  <div className="mt-6">
                    {!idToken && (
                      <Link href="/signup">
                        <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                          Try Free
                        </a>
                      </Link>
                    )}
                    {idToken && (
                      <a
                        href="https://manage.crossid.io/cockpit"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
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
                          className="text-indigo-600 hover:text-indigo-500"
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
                          className="text-indigo-600 hover:text-indigo-500"
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
        </>
      )}
    </Popover>
  )
}

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
