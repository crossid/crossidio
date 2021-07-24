import { useState } from 'react'
import DefaultLayout from '@/layouts/default'
import * as gtag from '@/lib/gtag'
import clsx from 'clsx'
import useDisposableList from 'use-disposable-list'
import Notifications, { NotificationDef } from '@/components/Notifications'

const Hero = () => (
  <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 className="text-3xl tracking-tight font-extrabold text-indigo-600 sm:text-4xl md:text-5xl">
        <span className="block xl:inline">How can we help you?</span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        We are here to help you with your identity challenges, let us know how and we'll get back to
        you.
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
  const encode = (data: any) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
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
        addNotif({ message: 'Error while submitting form: ' + error, level: 'error' })
      )
      .finally(() => {
        setInSubmit(false)
      })

    e.preventDefault()
  }

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <>
      <Notifications items={notifs} removeItem={removeNotif} />
      <div className="relative bg-white">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2"></div>
        </div>
        <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
          <div className="py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-extrabold tracking-tight text-indigo-600 sm:text-3xl">
                Let's Talk
              </h2>
              <p className="mt-3 text-lg leading-6 text-gray-500">
                Contact us directly or fill the form and we'll get back to you.
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
                  <dt className="sr-only">Email</dt>
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
          <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
            {!sentMode ? (
              <div className="max-w-lg mx-auto lg:max-w-none">
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
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
                      className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
                        'inline-flex justify-center py-3 px-6 border-transparent text-sm leading-4 font-bold rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60',
                        inSubmit && 'opacity-50 pointer-events-none'
                      )}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="max-w-lg lg:max-w-none mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl tracking-tight font-extrabold text-indigo-500 sm:text-5xl md:text-4xl">
                  <span className="block xl:inline">Thank you for reaching out!</span>
                </h2>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  We got your message and will get back to you as soon as we can.
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

Contact.layoutProps = {
  Layout: DefaultLayout,
  meta: {
    title: 'Contact',
    description: 'Contact us',
  },
}
