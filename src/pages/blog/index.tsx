import Link from 'next/link'
import fs from 'fs'
import glob from 'glob-promise'
import matter from 'gray-matter'
import path from 'path'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { PostMatter } from '@/utils/fsystem'
import { Prose } from '@/components/Prose'
import Time from '@/components/Time'

export const getStaticProps: GetStaticProps<{ posts: PostMatter[] }> = async (
  context: GetStaticPropsContext<{}>
) => {
  // md files are stored in the 'posts' directory
  const POSTS_DIR = path.join(process.cwd(), 'posts')
  const postPaths = await glob(path.join(POSTS_DIR, '**/*.md'))
  const pdata = postPaths.map((postPath) => {
    const pathParts = postPath.split(path.sep)
    const slug = pathParts[pathParts.length - 2]
    const source = fs.readFileSync(postPath, 'utf-8')

    // Use gray-matter to fetch the data between the `---` at the top of our Markdown files.
    const matterResult = matter(source)
    const { title, date, description } = matterResult.data

    return {
      title,
      date,
      slug,
      description,
    }
  })

  // Sort the posts by date
  const sortedPosts = pdata.sort((a, b) => b.date.getTime() - a.date.getTime())

  // We need to format the dates into strings because Next.js expects the props to be serializable as JSON.
  const parsedDatePosts = sortedPosts.map((post) => {
    return {
      ...post,
      date: post.date.getTime(),
    }
  })
  return { props: { posts: parsedDatePosts } }
}

//e.g., December 15, 2022
const BlogItem = ({
  date,
  title,
  description,
  slug,
}: {
  date: number
  title: String
  description: string
  slug: string
}) => {
  const d = new Date(date)
  return (
    <article className="group relative">
      <div className="absolute -inset-y-2.5 -inset-x-4 group-hover:bg-slate-50/70 dark:group-hover:bg-slate-800/50 sm:rounded-2xl md:-inset-y-4 md:-inset-x-6"></div>
      <svg
        viewBox="0 0 9 9"
        className="absolute right-full top-2 mr-6 hidden h-[calc(0.5rem+1px)] w-[calc(0.5rem+1px)] overflow-visible text-slate-200 dark:text-slate-600 sm:block md:mr-12"
      >
        <circle
          cx="4.5"
          cy="4.5"
          r="4.5"
          stroke="currentColor"
          className="fill-white dark:fill-slate-900"
          strokeWidth="2"
        ></circle>
      </svg>
      <div className="relative">
        <h3 className="pt-8 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 lg:pt-0">
          {title}
        </h3>
        <Prose className="line-clamp-2 mt-2 mb-4">
          <p>{description}</p>
        </Prose>
        <dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
          <dt className="sr-only">Date</dt>
          <dd className="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
            <Time date={d} />
          </dd>
        </dl>
      </div>
      <Link
        className="flex items-center text-sm font-medium text-sky-500"
        href={`/blog/${slug}`}
      >
        <span className="absolute -inset-y-2.5 -inset-x-4 sm:rounded-2xl md:-inset-y-4 md:-inset-x-6"></span>
        <span className="relative">
          Read more
          <span className="sr-only">{title}</span>
        </span>
        <svg
          className="relative mt-px ml-2.5 overflow-visible text-sky-300 dark:text-sky-700"
          width="3"
          height="6"
          viewBox="0 0 3 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 0L3 3L0 6"></path>
        </svg>
      </Link>
    </article>
  )
}

const Blog = (props: any) => {
  const { posts } = props
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
      <main className="mx-auto max-w-[52rem] px-4 pb-28 sm:px-6 md:px-8 lg:max-w-6xl xl:px-12">
        <header className="py-16 sm:text-center">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-4xl">
            Latest Updates
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-400">
            All the latest Crossid news, straight from the&nbsp;team.
          </p>
          <section className="mt-3 max-w-sm sm:mx-auto sm:px-4">
            <h2 className="sr-only">Sign up for our newsletter</h2>
            <form
              action="https://app.convertkit.com/forms/3181837/subscriptions"
              method="post"
              className="-mx-2 flex flex-wrap"
            >
              {/* <div className="mt-3 grow-[9999] basis-64 px-2">
              <div className="group relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-3 h-full w-6 text-slate-400 group-focus-within:text-sky-500 dark:group-focus-within:text-slate-400"
                >
                  <path d="M5 7.92C5 6.86 5.865 6 6.931 6h10.138C18.135 6 19 6.86 19 7.92v8.16c0 1.06-.865 1.92-1.931 1.92H6.931A1.926 1.926 0 0 1 5 16.08V7.92Z"></path>
                  <path d="m6 7 6 5 6-5"></path>
                </svg>
                <input
                  type="email"
                  name="email_address"
                  required
                  autoComplete="email"
                  aria-label="Email address"
                  className="block w-full appearance-none rounded-md border border-transparent bg-white py-2 pl-12 pr-3 leading-5 text-slate-900 shadow ring-1 ring-slate-900/5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-slate-700/20 dark:text-white dark:ring-slate-200/20 dark:focus:ring-sky-500 sm:text-sm"
                  placeholder="Subscribe via email"
                />
              </div>
            </div>
            <div className="mt-3 flex grow px-2">
              <button
                type="submit"
                className="flex-auto rounded-md border-y border-transparent bg-sky-500 py-2 px-3 text-sm font-semibold text-white shadow hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 dark:hover:bg-sky-400 dark:focus:ring-sky-700 dark:focus:ring-offset-slate-900"
              >
                Subscribe
              </button>
            </div> */}
            </form>
          </section>
        </header>
        <div className="relative sm:ml-[calc(2rem+1px)] sm:pb-12 md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
          <div className="absolute top-3 bottom-0 right-full mr-7 hidden w-px bg-slate-200 dark:bg-slate-800 sm:block md:mr-[3.25rem]"></div>
          <div className="space-y-16">
            {posts.map((p: PostMatter) => (
              <BlogItem
                key={p.slug}
                slug={p.slug}
                title={p.title}
                date={p.date}
                description={p.description}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Blog
