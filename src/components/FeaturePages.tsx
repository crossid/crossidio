import { IFeature } from '@/data/features'
import { ReactNode, useMemo, useState } from 'react'

export const Hero = ({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) => {
  return (
    <div>
      <div className="mx-auto max-w-7xl py-16">
        <div className="overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-4xl font-extrabold text-black dark:text-slate-300 sm:text-5xl">
                <span className="block">{title}</span>
              </h2>
              <p className={`mt-8 text-lg leading-6`}>{subtitle}</p>
            </div>
          </div>
          {/* <div className="aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1"> */}
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  )
}

export const Feature = ({ title, description }: IFeature) => (
  <div className="flex">
    <svg
      className="h-6 w-6 flex-shrink-0 dark:text-sky-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
    <div className="ml-3">
      <dt className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-300">{title}</dt>
      <dd className="mt-2 text-base">{description}</dd>
    </div>
  </div>
)

export const Features = ({
  caption,
  title,
  description,
  features,
  moreFeatures = [],
}: {
  caption: string
  title: string
  description: string
  features: IFeature[]
  moreFeatures?: IFeature[]
}) => {
  const [showMore, setShowMore] = useState(false)

  const gridSize = Math.round(features.length / 2)
  const moreGridSize = Math.round(moreFeatures.length / 2)

  const showMoreSpan = useMemo(() => {
    return showMore ? 'hide more features...' : 'show more features...'
  }, [showMore])

  return (
    <>
      <div className="" id="store">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:py-24 lg:px-8">
          <div>
            <h2
              className={`text-base font-semibold uppercase tracking-wide text-indigo-600 dark:text-sky-500`}
            >
              {caption}
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-slate-300">
              {title}
            </p>
            <p className="mt-4 text-lg">{description}</p>
          </div>
          <div className="mt-12 lg:col-span-2 lg:mt-0">
            <dl
              className={`space-y-10 sm:grid sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-${gridSize} sm:gap-x-6 sm:gap-y-10 sm:space-y-0 lg:gap-x-8`}
            >
              {features.map((f) => (
                <Feature key={f.title} {...f} />
              ))}
            </dl>
            {showMore && (
              <dl
                className={`space-y-10 pt-10 sm:grid sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-${moreGridSize} sm:gap-x-6 sm:gap-y-10 sm:space-y-0 lg:gap-x-8`}
              >
                {moreFeatures.map((f) => (
                  <Feature key={f.title} {...f} />
                ))}
              </dl>
            )}
            <button
              className="text-indigo-600 dark:text-sky-500"
              onClick={() => setShowMore(!showMore)}
            >
              <span>{showMoreSpan}</span>
            </button>
          </div>
        </div>
      </div>
      <div className=""></div>
    </>
  )
}

export const ProductWithScreenshot = ({
  caption,
  title,
  description,
  features,
  children,
}: {
  caption: string
  title: string
  description: string
  features: IFeature[]
  children: ReactNode
}) => {
  return (
    <div className="overflow-hidden py-24 sm:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold uppercase leading-7 text-indigo-600 dark:text-sky-500">
                {caption}
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-300 sm:text-4xl">
                {title}
              </p>
              <p className="mt-6 text-lg leading-8">{description}</p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.title} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-slate-300">
                      {feature.icon && (
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-indigo-600 dark:text-sky-500"
                          aria-hidden="true"
                        />
                      )}
                      {feature.title}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

const LargeFeature = (feature: IFeature) => (
  <div className="flex">
    <div className="flex-shrink-0">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600 text-white dark:bg-sky-600`}
      >
        {feature.icon && (
          <feature.icon className="w-9/12 text-white dark:bg-sky-600" aria-hidden="true" />
        )}
      </div>
    </div>
    <div className="ml-4">
      <dt className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-300">
        {feature.title}
      </dt>
      <dd className="mt-2 text-base">{feature.description}</dd>
    </div>
  </div>
)

export const ProductWithScreenshotOnLeftLargeBullets = ({
  title,
  description,
  features,
  children,
}: {
  title: string
  description: string
  features: IFeature[]
  children: ReactNode
}) => {
  return (
    <div className="relative mx-auto mt-12 px-4 sm:mt-16 sm:px-6 lg:mt-24 lg:max-w-7xl lg:px-8">
      <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8">
        <div className="lg:col-start-2 lg:pl-8">
          <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-slate-300 sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 text-lg">{description}</p>

          <dl className="mt-10 space-y-10">
            {features.map((f) => (
              <LargeFeature
                key={f.title}
                title={f.title}
                description={f.description}
                icon={f.icon}
              />
            ))}
          </dl>
        </div>
        <div className="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
          <svg
            className="absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden"
            width="784"
            height="404"
            fill="none"
            viewBox="0 0 784 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="784" height="404" fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)" />
          </svg>
          {children}
        </div>
      </div>
    </div>
  )
}
