import { Prose } from '@/components/Prose'
import Time from '@/components/Time'
import { GithubFile, ICollectorInfo } from '@/utils/loadIntegrations'
import {
  CalendarIcon,
  ChevronRightIcon,
  LockOpenIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import Markdoc from '@markdoc/markdoc'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IIntegrationProps } from '../integrations/[integration]'

export default function IntegrationLayout({
  integration,
  content,
}: IIntegrationProps) {
  if (!content) return null
  const {
    displayName,
    description,
    logoURL,
    keywords,
    poweredBy = 'Crossid',
    collectors,
  } = content?.json

  // TODO this is not safe
  const infoCollector = collectors[0] as ICollectorInfo

  return (
    <>
      <Head>
        <title>{displayName}</title>
        <meta
          name="og:title"
          content={`Integrate ${displayName} with Crossid`}
        />
        {description && <meta name="description" content={description} />}
        {description && <meta name="og:description" content={description} />}
        {/* TODO we don't have domain here as window does not exist in SSR */}
        <meta
          name="og:url"
          content={`https://crossid.io/integrations/${integration}`}
        />
      </Head>
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-18">
        <div className="md:flex md:items-center md:justify-between md:space-x-5">
          <div className="flex items-start space-x-5">
            <div className="flex-shrink-0">
              <div className="relative border border-gray-300 p-4 dark:border-sky-500">
                <Image
                  className="h-20 w-20"
                  src={logoURL}
                  width={20}
                  height={20}
                  alt="logo"
                />
              </div>
            </div>
            {/* Use vertical padding to simulate center alignment when both lines of text are one line,
      but preserve the same layout if the text wraps without making the image jump around. */}
            <div className="pt-1.5">
              <h1 className="text-4xl text-gray-900 dark:text-slate-300">
                Add {displayName}
              </h1>
              <p className="prose py-2 text-sm text-gray-500 lg:prose-xl dark:text-slate-200">
                {description}
              </p>
            </div>
          </div>
          {/* TODO: enable add integration if user is logged in and take the user directly to the integration itself in the webadmin */}
          {/* <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
          <Link
            href="/foo"
            role="button"
            className="inline-flex items-center rounded-md border border-indigo-600 bg-white px-4 py-2 text-base font-medium uppercase text-indigo-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusIcon className="-ml-1 mr-3 h-5 w-5" />
            Add Integration
          </Link>
        </div> */}
        </div>

        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-8 xl:py-10">
            <div className="max-w-3xl xl:grid xl:max-w-5xl xl:grid-cols-3">
              <div className="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8">
                <div>
                  <div>
                    <aside className="mt-8 xl:hidden">
                      <h2 className="sr-only">Details</h2>
                      <div className="space-y-5">
                        <div className="flex items-center space-x-2">
                          <LockOpenIcon className="h-5 w-5 text-green-500" />
                          <span className="text-sm font-medium text-green-700">
                            Available
                          </span>
                        </div>
                        {/* Take file's date */}
                        {/* <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          <span className="text-sm font-medium text-gray-900">
                            Last updated on <Time date={meta.lastModified} />
                          </span>
                        </span>
                      </div> */}
                      </div>
                      <div className="mt-6 space-y-8 border-t border-b border-gray-200 py-6">
                        <div>
                          <h2 className="text-sm font-medium text-gray-500">
                            Powered By
                          </h2>
                          <ul className="mt-3 space-y-3">
                            <li className="flex justify-start">
                              <Link
                                href="/"
                                className="flex items-center space-x-3"
                              >
                                <div className="text-sm font-medium text-gray-900">
                                  {poweredBy}
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h2 className="text-sm font-medium text-gray-500">
                            Tags
                          </h2>
                          <ul className="mt-2 leading-8">
                            {keywords.map((k) => (
                              <Keyword
                                key={k}
                                name={k}
                                linkTo={''}
                                //   linkTo={`/${tId}/${region}/marketplace`}
                              />
                            ))}
                          </ul>
                        </div>
                      </div>
                    </aside>
                    <div className="py-3 xl:pt-6 xl:pb-0">
                      <h2 className="sr-only">Description</h2>
                      <Prose className="max-w-none">
                        {infoCollector && (
                          <>
                            {Markdoc.renderers.react(
                              JSON.parse(infoCollector.content),
                              React,
                              {}
                            )}
                          </>
                        )}
                      </Prose>
                    </div>
                  </div>
                </div>
              </div>
              <aside className="hidden xl:block xl:pl-8">
                <h2 className="sr-only">Details</h2>
                <div className="space-y-5">
                  <div className="flex items-center space-x-2">
                    <LockOpenIcon className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-green-700">
                      Available
                    </span>
                  </div>
                  {/* Take file's date */}
                  {/* <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    Last updated on <Time date={meta.lastModified} />
                  </span>
                </div> */}
                </div>
                <div className="mt-6 space-y-8 border-t border-gray-200  py-6 dark:border-sky-500">
                  <div>
                    <h2 className="text-sm font-medium text-gray-500 dark:text-slate-500">
                      Powered By
                    </h2>
                    <ul className="mt-3 space-y-3">
                      <li className="flex justify-start">
                        <Link href="/" className="flex items-center space-x-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-sky-500">
                            Crossid
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">
                      Support
                    </h2>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="divide-y divide-gray-200 border-b border-gray-200 dark:divide-sky-500 dark:border-sky-500">
                        <SupportLink title="Support" to="/contact" />
                        <SupportLink title="Privacy" to="/privacy" />
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">Tags</h2>
                    <ul className="mt-2 leading-8">
                      {keywords.map((k) => (
                        <Keyword key={k} name={k} linkTo={``} />
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

const Keyword = ({ name, linkTo }: { name: string; linkTo: string }) => (
  <li className="inline">
    <Link
      href={'#'}
      className="relative mr-2 inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 dark:border-sky-600"
    >
      <div className="absolute flex flex-shrink-0 items-center justify-center">
        <span
          className="h-1.5 w-1.5 rounded-full bg-rose-500"
          aria-hidden="true"
        ></span>
      </div>
      <div className="ml-3.5 text-sm font-medium uppercase text-gray-900 dark:text-slate-300">
        {name}
      </div>
    </Link>
  </li>
)
const SupportLink = ({ title, to }: { title: string; to: string }) => (
  <li className="link flex cursor-pointer items-center justify-between py-1 pl-3 pr-4 text-sm text-indigo-600 dark:text-sky-600">
    <div className="flex w-0 flex-1 items-center">
      <a href={to} target="_blank" rel="noreferrer">
        <span className="ml-2 w-0 flex-1 truncate">{title}</span>
      </a>
    </div>
    <div className="ml-4 flex-shrink-0">
      <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
    </div>
  </li>
)
