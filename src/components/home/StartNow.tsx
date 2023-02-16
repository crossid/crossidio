import { useState } from 'react'
import Notifications, { NotificationDef } from '../Notifications'
import useDisposableList from 'use-disposable-list'
import Link from 'next/link'
import * as gtag from '@/utils/gtag'

export const StartNow = () => {
  const [notifs, addNotif, removeNotif] = useDisposableList<NotificationDef>({
    timeout: 2000,
  })
  const [form, setForm] = useState({ emailAddress: '' })
  const [inSubmit, setInSubmit] = useState(false)
  const [sentMode, setSentMode] = useState(false)

  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
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

  return (
    <section id="home-start-now">
      <Notifications items={notifs} removeItem={removeNotif} />
      <div className="pt-48 lg:pt-18">
        <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
          {!sentMode && (
            <>
              <h2 className="inline text-3xl font-normal tracking-tight text-gray-900 dark:text-slate-100 sm:block sm:text-6xl">
                Start building for free
              </h2>
              <form
                className="mt-8 rounded-2xl p-5 sm:flex sm:border-2 sm:border-black dark:sm:border-slate-700"
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
                  className="form-input w-full rounded-md border-2 px-5 py-3 placeholder-gray-400 focus:border-gray-200 focus:ring-gray-200 dark:bg-slate-900  dark:focus:border-sky-500 dark:focus:ring-sky-500 sm:border-none"
                  // border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-sky-500 dark:focus:ring-sky-500
                  placeholder="Your work email"
                  value={form.emailAddress}
                  onChange={handleChange}
                />
                <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    disabled={inSubmit}
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 dark:bg-sky-600 dark:ring-offset-slate-900 dark:focus:ring-sky-500 lg:py-5 lg:text-2xl"
                  >
                    Get Started
                  </button>
                </div>
              </form>
              <div className="pr-8 text-right text-sm font-bold text-indigo-600 dark:text-sky-500 lg:pr-2 lg:pt-2">
                <Link href="/contact">Need help? let&lsquo;s talk</Link>
              </div>
            </>
          )}
          {sentMode && (
            <>
              <h2 className="inline text-3xl font-normal tracking-tight text-gray-900 sm:block sm:text-6xl">
                Thank you for reaching out!
              </h2>
              <p className="mt-2 max-w-md text-base text-gray-500 sm:text-lg md:mt-3 md:max-w-3xl md:text-xl">
                We will get back to you as soon as we can.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
