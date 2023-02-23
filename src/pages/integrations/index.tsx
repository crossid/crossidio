import { Icon } from '@/components/Icon'
import { filterByKeywords, getAllIntegrations } from '@/utils/loadIntegrations'
import clsx from 'clsx'
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

interface IMiniIntegration {
  id: string
  displayName: string
  description: string
  logoURL: string
  keywords: string[]
}

export const getStaticProps: GetStaticProps<{
  integrations: IMiniIntegration[]
}> = async () => {
  const all = await getAllIntegrations()
  const filtered = all.filter(
    filterByKeywords(['identityProvider', 'token extension'])
  )

  const minis = filtered.map((i) => {
    const { displayName, description = null, logoURL, keywords } = i.json
    const id = i.filename.split('.')[0]
    return {
      id,
      displayName,
      description,
      logoURL,
      keywords,
    } as IMiniIntegration
  })

  return {
    props: { integrations: minis },
  }
}

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { integrations } = props
  const title = 'Integrations'
  const description = 'Third party integrations'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
      </Head>
      {/* <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-18">
        
      </div> */}
      <div className="mx-auto max-w-2xl lg:max-w-5xl">
        {/* Header */}
        <div className="py-10 sm:py-18">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-300 sm:text-6xl">
                Integrations
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-slate-500">
                Boost experience and enhance functionality with zero-code third
                party integrations.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-32">
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {integrations.map((integ) => (
              <Integration key={integ.id} {...integ} />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

function Integration({ id, displayName, logoURL, keywords }: IMiniIntegration) {
  const disabled = false
  return (
    <li className="relative items-center rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2  hover:shadow-md dark:border-slate-600 dark:ring-offset-slate-900 dark:focus-within:ring-sky-500">
      <div className="flex space-x-5 px-6 py-5">
        <div className="flex-shrink-0">
          <div className="rounded-md border border-gray-100 p-1 dark:border-0 dark:border-sky-500 dark:bg-white">
            <Image
              className="h-10 w-10"
              src={logoURL}
              width={20}
              height={20}
              alt="logo"
            />
          </div>
        </div>
        <div
          className={clsx('min-w-0 flex-1', disabled && 'pointer-events-none')}
        >
          <Link href={`/integrations/${id}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true"></span>
            <p className="text-sm font-medium text-gray-900 dark:text-slate-300">
              {displayName}
            </p>
            <div className="min-h-max flex-row space-y-0 truncate py-1">
              {keywords.map((k) => (
                <span
                  key={k}
                  className="mr-2 inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-left text-xxs font-medium uppercase text-gray-800 dark:bg-slate-800 dark:text-sky-300"
                >
                  {k}
                </span>
              ))}
            </div>
          </Link>
        </div>
      </div>
      {/* <div className="truncate-2-lines px-6 pb-6 text-xs text-gray-400">
        DESC...
      </div> */}
    </li>
  )
}
