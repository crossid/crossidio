import glob from 'glob-promise'
import path from 'path'
import fs from 'fs'
import Markdoc from '@markdoc/markdoc'
import React, { ReactElement } from 'react'
import { Prose } from '@/components/Prose'
import Link from 'next/link'
import yaml from 'js-yaml'
import { collectHeadings } from '@/utils/remark'
import clsx from 'clsx'
import { authors, IAuthor } from '@/data/authors'
import Image from 'next/image'
import Head from 'next/head'
import Nav from '@/components/Nav'
import FooterSlim from '@/components/FooterSlim'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { useTableOfContents } from '@/hooks/toc'
import { ITOC } from '@/types'
import { BlogPostLayout } from '@/layouts/BlogPostLayout'
import Footer from '@/components/Footer'

// see https://www.docploy.com/blog/how-to-build-a-blog-using-nextjs-and-markdoc

export const getStaticPaths = async () => {
  // blog md files are stored in the 'posts' directory
  const POSTS_DIR = path.join(process.cwd(), 'posts')

  // find all md files in the 'posts' directory
  // With The glob-promise library, we can use a one liner to find our Markdown files
  const postPaths = await glob(path.join(POSTS_DIR, '**/*.md'))

  // for each filename, the slug is the filename without the .md extension
  let paths = postPaths.map((postPath) => {
    const pathParts = postPath.split(path.sep)
    const slug = pathParts[pathParts.length - 2]
    return { params: { slug } }
  })

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{
  frontmatter: Record<string, any>
  content: string
}> = async (context: GetStaticPropsContext<{ slug?: string }>) => {
  // md files are stored in the 'posts' directory
  const POSTS_DIR = path.join(process.cwd(), 'posts')

  // generate the local md path from the URL slug
  const slug = context.params?.slug
  const fullPath = path.join(POSTS_DIR, slug + '/index.md')

  // read the md file contents
  const source = fs.readFileSync(fullPath, 'utf-8')

  // Use Markdoc to create a tree of tokens based on the Markdown file
  const ast = Markdoc.parse(source)

  // TODO
  const config = {
    tags: {
      //   callout,
    },
    nodes: {
      //   heading,
    },
    variables: {},
  }

  // Create a renderable tree
  const content = JSON.stringify(Markdoc.transform(ast, config))

  const frontmatter = yaml.load(ast.attributes.frontmatter) as Record<
    string,
    any
  >
  frontmatter.authors = frontmatter.authors?.map((a: string) => authors[a])
  frontmatter.date = frontmatter.date.getTime()

  // return the content as a prop to the React component,
  // we will render the content in the next section
  return {
    props: {
      frontmatter,
      content,
    },
  }
}

const components = {}

// Create a React component using Markdoc's React renderer and our list of custom components.
const Page = (props: any) => {
  const { content, frontmatter } = props
  const parsedContent = JSON.parse(content)

  const { title, description, authors, date, tags } = frontmatter
  const author = authors[0]
  const d = new Date(date)

  return (
    <BlogPostLayout
      authors={authors}
      date={d}
      title={title}
      content={parsedContent}
    />
  )
}

// Create a React component using Markdoc's React renderer and our list of custom components.
const Page1 = (props: any) => {
  const { content, frontmatter } = props
  const parsedContent = JSON.parse(content)

  const { title, description, authors, date, tags } = frontmatter
  const author = authors[0]
  let tableOfContents = collectHeadings(parsedContent)
  let currentSection = useTableOfContents(tableOfContents)
  const d = new Date(date)

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
      <Nav navigation={[]} />
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>
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
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          <article>
            <header className="not-format mb-4 lg:mb-6">
              <address className="mb-6 flex items-center not-italic">
                <div className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
                  <Image
                    className="mr-4 h-16 w-16 rounded-full"
                    src={author.thumbnail}
                    alt={author.displayName}
                    width={64}
                    height={64}
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {author.displayName}
                    </a>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      {author.title}
                    </p>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      <time dateTime="2022-02-08" title="February 8th, 2022">
                        {d.toLocaleDateString('en-US')}
                      </time>
                    </p>
                    <p>
                      {tags.map((t: string) => (
                        <span
                          key={t}
                          className="mr-2 inline-flex items-center rounded bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-800 focus:outline-none"
                        >
                          {t}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 dark:text-white lg:mb-6 lg:text-4xl">
                Best practices for successful prototypes
              </h1>
            </header>
            <Prose>
              {Markdoc.renderers.react(parsedContent, React, { components })}
            </Prose>
          </article>
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
                          {section.children.map((subSection) => (
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
      <FooterSlim />
    </>
  )
}

// Markdoc.renderers.react renders directly into the page so not sure how to use the layout
Page.getLayout = function getLayout(page: ReactElement) {
  return <></>
}

export default Page
