import { useState } from 'react'
import * as gtag from '@/lib/gtag'
import Notifications, { NotificationDef } from './Notifications'
import useDisposableList from 'use-disposable-list'

const GetStarted = () => {
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
      {!sentMode && (
        <form className="sm:flex" onSubmit={handleSubmit}>
          <label htmlFor="emailAddress" className="sr-only">
            Email address
          </label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            autoComplete="email"
            required
            className="w-full px-5 py-3 border-t-2 border-b-2 border-l-2 border-r-2 sm:border-r-0 border-black placeholder-gray-400 sm:max-w-xs rounded-none rounded-l-md rounded-r-md sm:rounded-r-none focus:outline-none focus:border-transparent focus:ring-2 focus:ring-black focus:border-black"
            placeholder="Your work email"
            value={form.emailAddress}
            onChange={handleChange}
          />
          <button
            disabled={inSubmit}
            type="submit"
            className="mt-3 w-full flex items-center justify-center px-5 py-3 border-2 border-black text-base font-medium rounded-none rounded-r-md text-white bg-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:w-auto sm:flex-shrink-0"
          >
            {inSubmit ? 'Submitting...' : 'Get Strted'}
          </button>
        </form>
      )}
      {sentMode && (
        <div className="max-w-lg lg:max-w-none mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-2xl">
            <span className="block xl:inline text-black">Thank you for reaching out!</span>
          </h2>
          <p className="mt-2 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-3 md:text-xl md:max-w-3xl">
            We will get back to you as soon as we can.
          </p>
        </div>
      )}
    </>
  )
}

export default GetStarted
