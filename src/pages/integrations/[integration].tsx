import { GetStaticProps, GetStaticPropsContext } from 'next'
import {
  getAllIntegrations,
  getFileWithContentByName,
  GithubFile,
} from '@/utils/loadIntegrations'

function filterByKeywords(tags: string[]) {
  return function (f: GithubFile) {
    const filteredArray = f.json.keywords.filter((value) =>
      tags.includes(value)
    )
    return filteredArray.length > 0
  }
}

export const getStaticPaths = async () => {
  const integrations = await getAllIntegrations()

  const paths = integrations
    .filter(filterByKeywords(['identityProvider']))
    .map((tf) => {
      return {
        params: {
          integration: tf.filename.split('.')[0],
        },
      }
    })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  content: GithubFile | null
  integration: string
}> = async (context: GetStaticPropsContext<{ integration?: string }>) => {
  const content = await getFileWithContentByName(context.params?.integration!)

  return {
    props: {
      content,
      integration: context.params?.integration || '',
    },
  }
}

const Page = ({
  content,
  integration,
}: {
  content: GithubFile
  integration: string
}) => {
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
      <div className="bg-white px-6 pt-16 pb-20 dark:bg-slate-900 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 dark:divide-sky-500 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-300 sm:text-4xl">
              {integration.toUpperCase()}
            </h2>
            <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-5">
              <pre className="text-xl text-gray-500">
                {JSON.stringify(content.json, undefined, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
