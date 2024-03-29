import { GetStaticProps, GetStaticPropsContext } from 'next'
import {
  filterByKeywords,
  getAllIntegrations,
  getFileWithContentByName,
  GithubFile,
  ICollectorInfo,
} from '@/utils/loadIntegrations'
import IntegrationLayout from '../layouts/IntegrationLayout'
import Markdoc from '@markdoc/markdoc'
import { getHost } from '@/utils/location'

export const getStaticPaths = async () => {
  const integrations = await getAllIntegrations()

  const paths = integrations
    .filter(filterByKeywords(['identityProvider', 'token extension']))
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

export interface IIntegrationProps {
  slug: string
  content: GithubFile | null
  integration: string
  host: string
}
export const getStaticProps: GetStaticProps<IIntegrationProps> = async (
  context: GetStaticPropsContext<{ integration?: string }>
) => {
  const content = await getFileWithContentByName(context.params?.integration!)
  if (!content) {
    return { notFound: true }
  }

  const collectors = content?.json.collectors.map((c) => {
    if (c.type !== 'info') {
      return c
    }

    const cinfo = c as ICollectorInfo
    const ast = Markdoc.parse(cinfo.content)
    const content = JSON.stringify(Markdoc.transform(ast, {}))
    cinfo.content = content
    return cinfo
  })
  content.json.collectors = collectors

  return {
    props: {
      slug: context.params?.integration || '',
      content,
      integration: context.params?.integration || '',
      host: getHost({ protocol: true }) || '',
    },
  }
}

const Page = (props: IIntegrationProps) => {
  return <IntegrationLayout {...props} />
}

export default Page
