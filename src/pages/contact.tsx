import { useState } from 'react'
import * as gtag from '@/utils/gtag'
import clsx from 'clsx'
import useDisposableList from 'use-disposable-list'
import Notifications, { NotificationDef } from '@/components/Notifications'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import { useIntercom } from 'react-use-intercom'

const Hero = () => (
  <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 className="text-3xl font-extrabold tracking-tight text-indigo-600 sm:text-4xl md:text-5xl">
        <span className="block xl:inline">How can we help you?</span>
      </h1>
      <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
        We are here to help you with your identity challenges, let us know how
        and we&apos;ll get back to you.
      </p>
    </div>
  </div>
)

interface FormProps {
  emailAddress: string
  fullName: string
  phone: string
  message: string
}

function Form() {
  const [notifs, addNotif, removeNotif] = useDisposableList<NotificationDef>({
    timeout: 2000,
  })
  const [form, setForm] = useState<FormProps>({
    emailAddress: '',
    fullName: '',
    phone: '',
    message: '',
  })
  const [inSubmit, setInSubmit] = useState(false)
  const [sentMode, setSentMode] = useState(false)
  const { show } = useIntercom()

  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&')
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    gtag.event({
      action: 'submit_contactUs',
      category: 'Contact',
      label: form.emailAddress,
    })

    setInSubmit(true)
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact-us', ...form }),
    })
      .then(() => {
        setSentMode(true)
      })
      .catch((error) =>
        addNotif({
          message: 'Error while submitting form: ' + error,
          level: 'error',
        })
      )
      .finally(() => {
        setInSubmit(false)
      })

    e.preventDefault()
  }

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <>
      <Notifications items={notifs} removeItem={removeNotif} />
      <div className="relative bg-white dark:bg-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2"></div>
        </div>
        <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
          <div className="py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            <div className="mx-auto max-w-lg">
              <h2 className="text-2xl font-extrabold tracking-tight text-indigo-600 dark:text-sky-600 sm:text-3xl">
                Let&apos;s Talk
              </h2>
              <p className="mt-3 text-lg leading-6 text-gray-500">
                Contact us directly or fill the form and we&apos;ll get back to
                you.
              </p>
              <dl className="mt-8 text-base text-gray-500">
                <div>
                  <dt className="sr-only">Postal address</dt>
                  <dd>
                    <p>Ariel Sharon 4 st</p>
                    <p>Tel Aviv, Israel.</p>
                  </dd>
                </div>
                {/*
              <div className="mt-6">
                <dt className="sr-only">Phone number</dt>
                <dd className="flex">
                  <svg
                    className="flex-shrink-0 h-6 w-6 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="ml-3">+972 (...) ...</span>
                </dd>
              </div>
              */}
                <div className="mt-6">
                  <dt className="sr-only">Chat</dt>
                  <dd className="flex">
                    <ChatBubbleBottomCenterTextIcon className="h-6 w-6 flex-shrink-0 text-gray-400" />
                    <button
                      onClick={() => show()}
                      className="link ml-3 text-indigo-600 dark:text-sky-600"
                    >
                      Click to Chat Now!
                    </button>
                  </dd>
                </div>
                <div className="mt-6">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex">
                    <svg
                      className="h-6 w-6 flex-shrink-0 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="ml-3">
                      <a href="mailto:info@crossid.io">info@crossid.io</a>
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-white py-16 px-4 dark:bg-slate-900 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
            {!sentMode ? (
              <div className="mx-auto max-w-lg lg:max-w-none">
                <form
                  name="contact-us"
                  onSubmit={handleSubmit}
                  data-netlify-honeypot="bot-field"
                  data-netlify="true"
                  action="#"
                  method="POST"
                  className="grid grid-cols-1 gap-y-6"
                >
                  <div>
                    <label htmlFor="fullName" className="sr-only">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      autoComplete="name"
                      className="form-input block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-sky-500 dark:focus:ring-sky-500"
                      placeholder="Full name"
                      required
                      value={form.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="emailAddress" className="sr-only">
                      Email
                    </label>
                    <input
                      id="emailAddress"
                      name="emailAddress"
                      type="email"
                      autoComplete="email"
                      className="form-input block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-sky-500 dark:focus:ring-sky-500"
                      placeholder="Email"
                      required
                      value={form.emailAddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="form-input block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-sky-500 dark:focus:ring-sky-500"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="form-textarea block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-sky-500 dark:focus:ring-sky-500"
                      placeholder="Message"
                      required
                      value={form.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={inSubmit}
                      //
                      className={clsx(
                        'inline-flex justify-center rounded-md border-transparent bg-indigo-600 py-3 px-6 text-sm font-bold leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 dark:bg-sky-600 dark:ring-offset-slate-900 dark:hover:bg-sky-700 dark:focus:ring-sky-500',
                        inSubmit && 'pointer-events-none opacity-50'
                      )}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="mx-auto max-w-lg py-16 px-4 text-center sm:py-24 sm:px-6 lg:max-w-none lg:px-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-indigo-500 dark:text-sky-500 sm:text-5xl md:text-4xl">
                  <span className="block xl:inline">
                    Thank you for reaching out!
                  </span>
                </h2>
                <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                  We got your message and will get back to you as soon as we
                  can.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default function Contact() {
  return (
    <main className="lg:py-12">
      {/* <Hero /> */}
      <Form />
    </main>
  )
}
