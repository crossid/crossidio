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
  content: GithubFile | null
  integration: string
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
      content,
      integration: context.params?.integration || '',
    },
  }
}

const Page = (props: IIntegrationProps) => {
  return <IntegrationLayout {...props} />
}

export default Page
