import { useState } from 'react'
import Notifications, { NotificationDef } from '../Notifications'
import useDisposableList from 'use-disposable-list'
import Link from 'next/link'

export const StartNow = () => {
  const [notifs, addNotif, removeNotif] = useDisposableList<NotificationDef>({
    timeout: 2000,
  })
  const [form, setForm] = useState({ emailAddress: '' })
  const [inSubmit, setInSubmit] = useState(false)
  const [sentMode, setSentMode] = useState(false)

  const encode = (data: any) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    gtag.event({
      action: 'submit_getStarted',
      category: 'Contact',
      label: form.emailAddress,
    })

    setInSubmit(true)
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'get-started', ...form }),
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

  return (
    <>
      <Notifications items={notifs} removeItem={removeNotif} />
      <div className="bg-white pt-48 lg:pt-18">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
          {!sentMode && (
            <>
              <h2 className="inline text-3xl font-normal tracking-tight text-gray-900 sm:block sm:text-6xl">
                Start building for free
              </h2>
              <form
                className="mt-8 sm:flex rounded-2xl p-5 sm:border-2 sm:border-black"
                name="get-started"
                onSubmit={handleSubmit}
                data-netlify-honeypot="bot-field"
                data-netlify="true"
              >
                <label htmlFor="emailAddress" className="sr-only">
                  Email address
                </label>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 placeholder-gray-400 focus:ring-gray-200 focus:border-gray-200 border-2 sm:border-none rounded-md"
                  placeholder="Your work email"
                  value={form.emailAddress}
                  onChange={handleChange}
                />
                <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    disabled={inSubmit}
                    type="submit"
                    className="w-full flex items-center justify-center px-8 py-3 lg:py-5 text-base lg:text-2xl border border-transparent font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60"
                  >
                    Get Started
                  </button>
                </div>
              </form>
              <div className="text-right pr-8 lg:pr-2 lg:pt-2 text-sm text-indigo-600 font-bold">
                <Link href="/contact">
                  <a>Need help? let's talk</a>
                </Link>
              </div>
            </>
          )}
          {sentMode && (
            <>
              <h2 className="inline text-3xl font-normal tracking-tight text-gray-900 sm:block sm:text-6xl">
                Thank you for reaching out!
              </h2>
              <p className="mt-2 max-w-md text-base text-gray-500 sm:text-lg md:mt-3 md:text-xl md:max-w-3xl">
                We will get back to you as soon as we can.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
