import clsx from 'clsx'
import Head from 'next/head'
import { NextPageWithLayout } from './_app'
import styles from './index.module.css'
import { ReactElement } from 'react'
import { Hero } from '@/components/home/Hero'
import Nav from '@/components/Nav'
import Link from 'next/link'
import { StartNow } from '@/components/home/StartNow'
import ReadyToTry from '@/components/home/ReadyToTry'
import Footer from '@/components/Footer'

function Header() {
  return (
    <header className="relative">
      <div className="px-4 sm:px-6 md:px-8">
        <div
          className={clsx(
            'absolute inset-0 bottom-10 bg-slate-50 bg-bottom bg-no-repeat dark:bg-[#0B1120]',
            styles.beams
          )}
        >
          <div
            className="absolute inset-0 bg-[bottom_1px_center] bg-grid-slate-900/[0.04] dark:border-b dark:border-slate-100/5 dark:bg-bottom dark:bg-grid-slate-400/[0.05]"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent, black)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
            }}
          />
        </div>
        <div className="relative items-center justify-between pt-6 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200 lg:pt-8">
          <Nav />
        </div>
        <div className="relative mx-auto max-w-5xl pt-20 sm:pt-24 lg:pt-32">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Add user management
            <span className="relative whitespace-nowrap">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-2/3 left-0 h-[0.58em] w-full fill-indigo-300/70 dark:fill-sky-300/70"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
              <span className="font-display to inline bg-gradient-to-r from-indigo-400 via-indigo-800 to-indigo-400 bg-clip-text tracking-tight text-transparent dark:from-sky-200 dark:via-sky-400 dark:to-sky-200">
                seamlessly{' '}
              </span>
            </span>
            into your apps.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-400">
            More than authentication, rapidly integrate a complete user
            management into your websites and apps.
          </p>
          <div className="mt-6 flex justify-center space-x-6 text-sm sm:mt-10">
            <Link
              href="/docs"
              className="flex h-12 w-full items-center justify-center rounded-lg bg-slate-900 px-6 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 sm:w-auto"
            >
              Get started for free
            </Link>
            <Link
              href="/contact"
              className="flex h-12 w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-6 font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-slate-700 dark:bg-slate-400 dark:highlight-white/20 dark:hover:bg-slate-300 dark:focus:ring-slate-800 dark:focus:ring-offset-slate-300 sm:w-auto"
            >
              Request demo
            </Link>
            {/* <GetStarted/> */}
          </div>
        </div>
      </div>
      <Hero />
    </header>
  )
}

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <meta
          key="twitter:title"
          name="twitter:title"
          content="Crossid - Modern identity."
        />
        <meta
          key="og:title"
          property="og:title"
          content="Crossid - Modern identity."
        />
        <title>Crossid - A login box that your customers will love.</title>
      </Head>
      <div className="mb-20 overflow-hidden sm:mb-32 md:mb-40">
        <Header />
        <section className="mt-20 px-8 text-center sm:mt-32 md:mt-40">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Make user management our problem, not yours.
          </h2>
          <figure>
            <blockquote>
              <p className="mx-auto mt-6 max-w-3xl text-lg">
                Lorem ipsum dolor sit amet. Et illum iure eos aperiam fugit in
                dolorum eaque 33 voluptas dolores et voluptate impedit aut fuga
                consequuntur ea neque libero. Et nesciunt suscipit sed dolorem
                culpa At dolorum labore qui laudantium nihil! Nam ullam animi
                aut temporibus assumenda quo voluptates voluptate.
              </p>
            </blockquote>
          </figure>
        </section>
      </div>
      <div className="mb-20 flex flex-col gap-y-20 overflow-hidden pt-20 sm:mb-32 sm:gap-y-32 sm:pt-32 md:mb-40 md:gap-y-40 md:pt-40">
        <ReadyToTry />
        <StartNow />
      </div>
      <Footer />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <></>
}

export default Page
