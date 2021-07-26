import { useOnScreen } from '@/hooks/use-on-screen'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

const features: Feature[] = [
  { word: 'login', image: '/index/login_otp.png', timeout: 5000 },
  { word: 'MFA', image: '/index/mfa_webauthn.png', timeout: 5000 },
  { word: 'sign-up', image: '/index/signup.png', timeout: 5000 },
  { word: 'apps', image: '/index/apps.png', timeout: 5000 },
  { word: 'more', image: '/index/marketplace.png', timeout: 5000 },
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
      <div className="overflow-hidden h-1 text-xs flex rounded bg-indigo-200">
        <div
          style={{ width: `${percent}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
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
    if (timeout > 0) {
      const timeoutID = window.setTimeout(() => {
        expired(feature)
      }, timeout)

      return () => window.clearTimeout(timeoutID)
    }
  }, [feature, timeout])

  return (
    <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
      {timeout > 0 && <ProgressTimeout key={feature} timeout={timeout} />}
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

export const ProductTeaser = () => {
  const [selected, setSelected] = useState('login')
  const [onScreen, setOnscreen] = useState(false)
  const [auto, setAuto] = useState(true)
  const ref: any = useRef<HTMLDivElement>()
  const observe: boolean = useOnScreen<HTMLDivElement>(ref, '-20px')

  useEffect(() => {
    if (!onScreen && observe) {
      setOnscreen(true)
    }
  }, [observe])

  const manuallySelected = (word: string) => {
    setSelected(word)
    setAuto(false)
  }

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
    <section ref={ref} className="mt-40">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8 md:mt-2">
        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
          <h2
            className="block mt-1 text-3xl tracking-tight font-bold sm:text-4xl xl:text-5xl"
            style={{ lineHeight: '1.2' }}
          >
            {'It does '}
            <FeatureWord
              selected={selected}
              setSelected={manuallySelected}
              word={features[0].word}
              timeout={features[0].timeout}
              expired={expired}
            />
            {' with '}
            <FeatureWord
              selected={selected}
              setSelected={manuallySelected}
              word={features[1].word}
              timeout={features[1].timeout}
              expired={expired}
            />
            {' and '}
            <FeatureWord
              selected={selected}
              setSelected={manuallySelected}
              word={features[2].word}
              timeout={features[2].timeout}
              expired={expired}
            />
            {" but there's also "}
            <FeatureWord
              selected={selected}
              setSelected={manuallySelected}
              word={features[3].word}
              timeout={features[3].timeout}
              expired={expired}
            />
            {', '}
            {' and  '}
            <FeatureWord
              selected={selected}
              setSelected={manuallySelected}
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
              timeout={auto ? features[features.findIndex((f) => f.word === selected)].timeout : -1}
              expired={expired}
            />
          )}
        </div>
      </div>
    </section>
  )
}
