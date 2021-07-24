import DefaultLayout from '../layouts/default'
import GetStarted from '@/components/GetStarted'
import { ChevronDownIcon } from '@heroicons/react/outline'
import useDisposableList from 'use-disposable-list'
import Notifications, { NotificationDef } from '@/components/Notifications'
import { useEffect, useRef, useState } from 'react'
import * as gtag from '@/lib/gtag'
import clsx from 'clsx'
import { Transition } from '@headlessui/react'
import { useOnScreen } from '@/hooks/use-on-screen'

function Home() {
  return (
    <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
      <div className="mx-auto max-w-7xl">
        <Hero />
        <Product />
        <StartNow />
      </div>
    </main>
  )
}

Home.layoutProps = {
  Layout: DefaultLayout,
  meta: {
    title: 'Home',
  },
}

export const Hero = () => {
  return (
    <section id="hero">
      <div className="text-center mx-auto max-w-4xl pt-10 h-screen" style={{ height: '65vh' }}>
        <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl text-indigo-600 mb-4">
          <span className="block xl:inline">This is Crossid:</span>{' '}
        </h1>
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">the login box that your customer will love.</span>{' '}
        </h1>
        {/* <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Simplify your ...
          </p> */}
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <GetStarted />
          </div>
        </div>
        <div className="absolute bottom-10 left-2/4 -ml-6">
          <ChevronDownIcon className="text-gray-400 h-16 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

const features: Feature[] = [
  { word: 'login', image: '/index/login.png', timeout: 5000 },
  { word: 'sign-up', image: '/index/signup.png', timeout: 5000 },
  { word: 'apps', image: '/index/apps.png', timeout: 5000 },
  { word: 'MFA', image: '/index/mfa_chrome.png', timeout: 5000 },
  { word: 'more', image: '/index/more.png', timeout: 5000 },
]

const ProgressTimeout = ({ timeout }: { timeout: number }) => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    setPercent(0)
    const id = setInterval(() => {
      setPercent((prev) => prev + 1)
    }, timeout / 100)
    return () => clearInterval(id)
  }, [timeout])

  return <Progress percent={percent} />
}

const Progress = ({ percent }: { percent: number }) => {
  return (
    <div className="relative pt-1">
      <div className="overflow-hidden h-1 text-xs flex rounded bg-purple-200">
        <div
          style={{ width: `${percent}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
        ></div>
      </div>
    </div>
  )
}

const FeatureWord = ({
  setSelected,
  word,
  selected,
}: {
  setSelected: (word: string) => void
  word: string
  selected: string
  timeout: number
  expired: (word: string) => void
}) => {
  return (
    <span
      className={clsx(
        'cursor-pointer inline',
        selected === word ? 'text-white bg-indigo-600 rounded-md' : 'text-indigo-600'
      )}
      onClick={() => setSelected(word)}
    >
      {word}
    </span>
  )
}

const FeatureImage = ({
  feature,
  timeout,
  expired,
}: {
  feature: string
  timeout: number
  expired: (feature: string) => void
}) => {
  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      expired(feature)
    }, timeout)

    return () => window.clearTimeout(timeoutID)
  }, [feature, timeout])

  return (
    <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
      <ProgressTimeout key={feature} timeout={timeout} />
      <div className="">
        <div className="rounded-lg h-96">
          {features.map((p, i) => (
            <Transition
              key={i}
              show={feature === p.word}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-200"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <img
                key={i}
                // className="absolute transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                className="absolute rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                src={p.image}
                alt="App screenshot"
              />
            </Transition>
          ))}
        </div>
      </div>
    </div>
  )
}

interface Feature {
  word: string
  image: string
  timeout: number
}

export const Product = () => {
  const [selected, setSelected] = useState('login')
  const ref: any = useRef<HTMLDivElement>()
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, '-250px')

  const expired = (word: string) => {
    const idx = features.findIndex((f) => f.word === word)
    const nextIdx = features.length - 1 > idx ? idx + 1 : 0
    select(features[nextIdx].word)
  }

  const select = (word: string) => {
    const idx = features.findIndex((f) => f.word === word)
    setSelected(features[idx].word)
  }

  return (
    <section ref={ref} id="product" className="mt-40">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8 md:mt-2">
        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
          <h2
            className="block mt-1 text-3xl tracking-tight font-bold sm:text-4xl xl:text-5xl"
            style={{ lineHeight: '1.2' }}
          >
            {'It does '}
            <FeatureWord
              selected={selected}
              setSelected={select}
              word={features[0].word}
              timeout={features[0].timeout}
              expired={expired}
            />
            {' and '}
            <FeatureWord
              selected={selected}
              setSelected={select}
              word={features[1].word}
              timeout={features[1].timeout}
              expired={expired}
            />
            {" but there's also "}
            <FeatureWord
              selected={selected}
              setSelected={select}
              word={features[2].word}
              timeout={features[2].timeout}
              expired={expired}
            />
            {', '}
            <FeatureWord
              selected={selected}
              setSelected={select}
              word={features[3].word}
              timeout={features[3].timeout}
              expired={expired}
            />
            {' and  '}
            <FeatureWord
              selected={selected}
              setSelected={select}
              word={features[4].word}
              timeout={features[4].timeout}
              expired={expired}
            />
            {' that keeps your convenience, privacy and security in balance. '}
          </h2>
        </div>
        <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-6 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
          {/* <svg
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
              width={640}
              height={784}
              fill="none"
              viewBox="0 0 640 784"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                  x={118}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect y={72} width={640} height={640} className="text-gray-50" fill="currentColor" />
              <rect
                x={118}
                width={404}
                height={784}
                fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
              />
            </svg> */}
          {onScreen && (
            <FeatureImage
              feature={selected}
              timeout={features[features.findIndex((f) => f.word === selected)].timeout}
              expired={expired}
            />
          )}
        </div>
      </div>
    </section>
  )
}

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
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-40 px-4 sm:px-6 lg:py-48 lg:px-8">
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

export default Home
