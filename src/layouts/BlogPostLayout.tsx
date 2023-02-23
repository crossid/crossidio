import { Callout } from '@/components/Callout'
import Nav from '@/components/Nav'
import { Prose } from '@/components/Prose'
import { Widont } from '@/components/Widnot'
import { IAuthor } from '@/data/authors'
import { useTableOfContents } from '@/hooks/toc'
import { ITOC } from '@/types'
import { formatDate, MACHINE_FORMAT } from '@/utils/date'
import { collectHeadings } from '@/utils/remark'
import { Fence } from '@/components/Fence'
import Markdoc from '@markdoc/markdoc'
import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Img } from '@/components/markdoc/Img'
import Mermaid from '@/components/markdoc/Mermaid'
import Time from '@/components/Time'

// TODO
const components = {
  Callout,
  Img,
  Fence,
  Mermaid,
}

export function BlogPostLayout({
  title,
  authors,
  date,
  content,
  tags,
  description,
  slug,
  card,
}: {
  title: string
  authors: IAuthor[]
  date: Date
  content: string
  tags: string[]
  description: string
  slug: string
  card: string
}) {
  let tableOfContents = collectHeadings(content)
  let currentSection = useTableOfContents(tableOfContents)

  function isActive(section: any) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center overflow-hidden">
        <div className="flex w-[108rem] flex-none justify-end">
          <picture>
            <source
              srcSet={require('@/images/beams/docs@30.avif').default.src}
              type="image/avif"
            />
            <img
              src={require('@/images/beams/docs@tinypng.png').default.src}
              alt=""
              className="w-[71.75rem] max-w-none flex-none dark:hidden"
              decoding="async"
            />
          </picture>
          <picture>
            <source
              srcSet={require('@/images/beams/docs-dark@30.avif').default.src}
              type="image/avif"
            />
            <img
              src={require('@/images/beams/docs-dark@tinypng.png').default.src}
              alt=""
              className="hidden w-[90rem] max-w-none flex-none dark:block"
              decoding="async"
            />
          </picture>
        </div>
      </div>
      <div className="relative items-center justify-between pt-6 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200 lg:pt-8">
        <Nav />
      </div>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        {description && <meta name="description" content={description} />}
        {description && <meta name="og:description" content={description} />}
        {/* TODO we don't have domain here as window does not exist in SSR */}
        <meta name="og:url" content={`https://crossid.io/blog/${slug}`} />
        {/* {card && (
          <meta
            property="og:image"
            content={`https://crossid.io/public/images/blog/${slug}/${card}`}
          />
        )}
        {card && (
          <meta
            property="twitter:image"
            content={`https://crossid.io/public/images/blog/${slug}/${card}`}
          />
        )} */}

        <meta property="og:type" content="article" />
        <meta property="article:tag" content={`${tags.join(',')}`} />
        <meta
          property="article:author"
          content={`https://github.com/${authors[0].github}`}
        />
        {/* <meta property="article:published_time" content="2018-05-14T00:00:00.000Z"/> */}
        <meta
          property="article:published_time"
          content={formatDate(date, MACHINE_FORMAT)}
        />
      </Head>
      <div className="">
        <div className="mx-auto max-w-8xl">
          <div className="flex px-4 pt-8 pb-10 lg:px-8">
            <Link
              href="/blog"
              className="group flex text-sm font-semibold leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
            >
              <svg
                viewBox="0 -9 3 24"
                className="mr-3 h-6 w-auto overflow-visible text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
              >
                <path
                  d="M3 0L0 3L3 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Go back
            </Link>
          </div>
        </div>
        <div className="bgsm:px-2 relative mx-auto flex max-w-7xl justify-center lg:px-8 xl:px-12">
          {/* <div className="hidden lg:relative lg:block lg:flex-none">
            <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
            <div className="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
            <div className="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block" />
            <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-16 pl-0.5">
              <nav className={'text-base lg:text-sm'}>
                <ul role="list" className="space-y-9"></ul>
              </nav>
            </div>
          </div> */}

          <div className="min-w-0 max-w-2xl flex-auto px-4 py-4 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
            {/* TODO should wrap under <main> as in tailwindcss project? */}
            <main>
              <article className="relative pt-10">
                <h1
                  className={clsx(
                    'text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl '
                  )}
                >
                  <Widont>{title}</Widont>
                </h1>
                <p>
                  {tags.map((t: string) => (
                    <Link key={t} href={`/blog/tags/${t}`}>
                      <span className="mr-2 inline-flex items-center rounded bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-800 focus:outline-none">
                        {t.toUpperCase()}
                      </span>
                    </Link>
                  ))}
                </p>
                <div className="text-sm leading-6">
                  <dl>
                    <dt className="sr-only">Date</dt>
                    <dd
                      className={clsx(
                        'absolute inset-x-0 top-0 text-slate-700 dark:text-slate-400'
                      )}
                    >
                      <Time date={date} />
                    </dd>
                  </dl>
                </div>
                <div className="mt-6">
                  <ul
                    className={clsx(
                      '-mx-5 -mt-6 flex flex-wrap text-sm leading-6'
                    )}
                  >
                    {authors.map((author) => (
                      <li
                        key={author.name}
                        className="mt-6 flex items-center whitespace-nowrap px-5 font-medium"
                      >
                        <Image
                          src={author.avatar}
                          alt={author.name}
                          className="mr-3 h-9 w-9 rounded-full bg-slate-50 dark:bg-slate-800"
                          decoding="async"
                          width={32}
                          height={32}
                        />
                        <div className="text-sm leading-4">
                          <div className="text-slate-900 dark:text-slate-200">
                            {author.name}
                          </div>
                          <div className="mt-1">
                            <a
                              href={`https://github.com/${authors[0].github}`}
                              className="text-sky-500 hover:text-sky-600 dark:text-sky-400"
                            >
                              @{author.github}
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <Prose className="pt-10">
                  <p className="lead">{description}</p>
                  {Markdoc.renderers.react(content, React, { components })}
                </Prose>
              </article>
            </main>
            <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800"></dl>
          </div>
          <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
            <nav aria-labelledby="on-this-page-title" className="w-56">
              {tableOfContents.length > 0 && (
                <>
                  <h2
                    id="on-this-page-title"
                    className="font-display text-sm font-medium text-slate-900 dark:text-white"
                  >
                    On this page
                  </h2>
                  <ol role="list" className="mt-4 space-y-3 text-sm">
                    {tableOfContents.map((section: ITOC) => (
                      <li key={section.id}>
                        <h3>
                          <Link
                            href={`#${section.id}`}
                            className={clsx(
                              isActive(section)
                                ? 'text-sky-500'
                                : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                            )}
                          >
                            {section.title}
                          </Link>
                        </h3>
                        {section.children?.length > 0 && (
                          <ol
                            role="list"
                            className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                          >
                            {section.children.map((subSection: ITOC) => (
                              <li key={subSection.id}>
                                <Link
                                  href={`#${subSection.id}`}
                                  className={
                                    isActive(subSection)
                                      ? 'text-sky-500'
                                      : 'hover:text-slate-600 dark:hover:text-slate-300'
                                  }
                                >
                                  {subSection.title}
                                </Link>
                              </li>
                            ))}
                          </ol>
                        )}
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
