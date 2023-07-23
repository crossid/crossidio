import { IFeature } from '@/data/features'
import clsx from 'clsx'
import { ReactNode, useMemo, useState } from 'react'

// HERO
//

export const HeroTitle = ({ title }: { title: string }) => (
  <h2 className="text-4xl font-extrabold text-black dark:text-slate-300 sm:text-5xl">
    <span className="block">{title}</span>
  </h2>
)

export const HeroSubtitle = ({ subtitle }: { subtitle: string }) => (
  <p className={`mt-8 text-lg leading-6`}>{subtitle}</p>
)

export const HeroInfo = ({ children }: { children: ReactNode }) => (
  <div className="px-6 pb-12 pt-10 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:px-20 xl:py-20">
    <div className="lg:self-center">{children}</div>
  </div>
)

export const HeroDiagram = ({
  children,
  noAspect,
}: {
  children: ReactNode
  noAspect?: boolean
}) => (
  <div className={clsx(!noAspect && 'aspect-h-3 aspect-w-5 md:aspect-h-1 md:aspect-w-2')}>
    {children}
  </div>
)

export const HeroLayout = ({ children }: { children: ReactNode }) => (
  <div>
    <div className="mx-auto max-w-7xl py-16">
      <div className="overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">{children}</div>
    </div>
  </div>
)

// FEATURES
//
export const FeaturesLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:py-24">
    {children}
  </div>
)

export const FeaturesInfo = ({
  caption,
  title,
  subtitle,
}: {
  caption: string
  title: string
  subtitle: string
}) => (
  <div>
    <h2
      className={`text-base font-semibold uppercase tracking-wide text-indigo-600 dark:text-sky-500`}
    >
      {caption}
    </h2>
    <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-slate-300">{title}</p>
    <p className="mt-4 text-lg">{subtitle}</p>
  </div>
)

export const FeatureList = ({ children }: { children?: ReactNode }) => (
  <div className="mt-12 lg:col-span-2 lg:mt-0">{children}</div>
)

export const Features = ({
  features,
  gridRows = 'sm:grid-rows-2',
  secondary,
}: {
  features: IFeature[]
  gridRows: string
  secondary?: boolean
}) => {
  const [showMore, setShowMore] = useState(!secondary)

  const showFeatures = !secondary || showMore

  return (
    <>
      {showFeatures && (
        <dl
          className={clsx(
            `space-y-10 sm:grid sm:grid-flow-col sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:space-y-0 lg:gap-x-8`,
            secondary && 'mt-12',
            gridRows
          )}
        >
          {showMore && features.map((f) => <Feature key={f.title} {...f} />)}
        </dl>
      )}
      {secondary && (
        <button
          className="py-6 text-indigo-600 dark:text-sky-500"
          onClick={() => setShowMore(!showMore)}
        >
          <span>{showMore ? 'show less...' : 'show more...'}</span>
        </button>
      )}
    </>
  )
}

export const Feature = (feature: IFeature) => (
  <div className="flex">
    {feature.icon ? (
      <feature.icon className="h-6 w-6 flex-shrink-0 dark:text-sky-400" />
    ) : (
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
    )}
    <div className="ml-3">
      <dt className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-300">
        {feature.title}
      </dt>
      <dd className="mt-2 text-base">{feature.description}</dd>
    </div>
  </div>
)

export const TwoSections = ({ children }: { children: ReactNode }) => (
  <div className="overflow-hidden py-16 lg:py-24">{children}</div>
)

export const Section1Left = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <div className="mb-8 overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">{children}</div>
  </div>
)

export const Section1LeftContentLayout = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
    <div>{children}</div>
  </div>
)

export const Section1LeftContentTitle = ({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) => (
  <div>
    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-slate-300 sm:text-5xl">
      {title}
    </h1>
    {subtitle && <p className="mt-3 text-lg">{subtitle}</p>}
  </div>
)

export const Section1LeftContentFeatures = ({ children }: { children: ReactNode }) => (
  <div className="mt-20 grid gap-5">{children}</div>
)

export const Section1Right = ({ children }: { children: ReactNode }) => (
  <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
    <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <div className="hidden sm:block">
        <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl lg:left-80 lg:right-0 lg:w-full"></div>
        <svg
          className="absolute right-1/2 top-8 -mr-3 lg:left-0 lg:m-0"
          width="404"
          height="392"
          fill="none"
          viewBox="0 0 404 392"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
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
                className="text-gray-200 dark:text-slate-800"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
        </svg>
      </div>
      <div className="relative -mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
        {children}
      </div>
    </div>
  </div>
)

export const Section2 = ({ children }: { children: ReactNode }) => (
  <>
    <svg
      className="absolute right-full hidden translate-x-1/2 translate-y-12 transform lg:block"
      width="404"
      height="784"
      viewBox="0 0 404 784"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
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
            className="text-gray-200 dark:text-slate-800"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width="404" height="784" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
    </svg>
    <div className="relative mx-auto mt-12 px-4 sm:mt-16 sm:px-6 lg:mt-24 lg:max-w-7xl lg:px-8">
      <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-16">
        {children}
      </div>
    </div>
  </>
)
export const Section2Content = ({ children }: { children: ReactNode }) => (
  <div className="lg:col-start-2">{children}</div>
)

export const Section2Title = ({ content }: { content: string }) => (
  <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-slate-300 sm:text-3xl">
    {content}
  </h3>
)

export const Section2SubTitle = ({ content }: { content: string }) => (
  <p className="mt-3 text-lg">{content}</p>
)

export const Section2Features = ({ children }: { children: ReactNode }) => (
  <dl className="mt-10 space-y-10">{children}</dl>
)

export const Section2Right = ({ children }: { children: ReactNode }) => (
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
          <rect x="0" y="0" width="4" height="4" className="text-gray-200 dark:text-slate-800" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="784" height="404" fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)" />
    </svg>
    {children}
  </div>
)

// TODO it could be nice if we had a reversed layout where image is on the left
export const ProductFeaturesWithScreenshot = ({
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
    <div className="overflow-hidden py-24 sm:py-36">
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

export const LargeFeature = (feature: IFeature) => (
  <div className="flex">
    <div className="flex-shrink-0">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600 text-white dark:bg-sky-600`}
      >
        {feature.icon && (
          <feature.icon className="w-6/12 text-white dark:bg-sky-600" aria-hidden="true" />
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

/*
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
      <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center">
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
*/
