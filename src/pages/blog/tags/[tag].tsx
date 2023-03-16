import { tags } from '@/data/tags'
import { getAllPostsWithFrontMatter, getTags, Post } from '@/utils/fsystem'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'

export const getStaticPaths = async () => {
  const tags = await getTags('posts')

  const paths = tags.map((tag: string) => ({
    params: {
      tag,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  posts: object[]
  tag: string
}> = async (context: GetStaticPropsContext<{ tag?: string }>) => {
  const posts = await getAllPostsWithFrontMatter('posts', context.params?.tag)

  return {
    props: {
      posts,
      tag: context.params?.tag || '',
    },
  }
}

const Page = ({ posts, tag }: { posts: Post[]; tag: string }) => {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center overflow-hidden">
        <div className="flex w-[108rem] flex-none justify-end">
          <picture>
            <source srcSet={require('@/images/beams/docs@30.avif').default.src} type="image/avif" />
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
      <div className="bg-white px-6 pt-16 pb-20 dark:bg-slate-900 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 dark:divide-sky-500 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-300 sm:text-4xl">
              {tag.toUpperCase()}
            </h2>
            <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-5">
              <p className="text-xl text-gray-500">{tags[tag]?.description}</p>
              {/* <form className="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 lg:max-w-xs"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-2 flex w-full flex-shrink-0 rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:inline-flex sm:w-auto">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:inline-flex sm:w-auto"
                >
                  Notify me
                </button>
              </div>
            </form> */}
            </div>
          </div>
          <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
            {posts.map((post) => (
              <div key={post.frontMatter.title} className="group">
                <div className="p-3 group-hover:bg-slate-50/70 dark:group-hover:bg-slate-800/50 sm:rounded-2xl md:-inset-y-4 md:-inset-x-6">
                  <p className="text-sm text-gray-500">
                    {/* <time dateTime={post.datetime}>{post.postMatter.date}</time> */}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900 dark:text-slate-200">
                      {post.frontMatter.title}
                    </p>
                    <p className="mt-3 text-base text-gray-400">{post.frontMatter.description}</p>
                  </Link>
                  <div className="mt-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-base font-semibold text-indigo-600 hover:text-indigo-500 dark:text-sky-600 dark:hover:text-sky-500"
                    >
                      Read
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
