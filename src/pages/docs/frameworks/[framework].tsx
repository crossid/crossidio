import path from 'path'
import glob from 'glob-promise'
import fs from 'fs'
import { pathToSlug } from '@/utils/fsystem'
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import Markdoc, { Config, RenderableTreeNode } from '@markdoc/markdoc'
import yaml from 'js-yaml'
import { authors } from '@/data/authors'
import FrameworkLayout from '@/layouts/FrameworkLayout'
import { Tag } from '@markdoc/markdoc'
import { ReactElement } from 'react'
import { IFramework } from '@/types'
import { getHost } from '@/utils/location'
import {
  normalizeTokens,
  simplifyToken,
  tokenizeCode,
} from '@/utils/prism/token'
import { ICodeLang } from '@/utils/prism/types'
import { highlight } from '@/utils/prism/highlight'
import { FieldProvider } from '@/hooks/useFieldsContext'
import { readingTime } from '@/utils/content'
import { codeSections } from '@/utils/code'

const FW_DIR_NAME = 'frameworks'
const PARTIALS_DIR = path.join(process.cwd()) + '/partials'

export const getStaticPaths = async () => {
  // blog md files are stored in the 'posts' directory
  const dir = path.join(process.cwd(), FW_DIR_NAME)
  const fwPaths = await glob(path.join(dir, '*/*.md'), {})

  // for each filename, the slug is the filename without the .md extension
  let paths = fwPaths.map((postPath) => {
    const framework = pathToSlug(postPath)
    return { params: { framework } }
  })

  return { paths, fallback: false }
}

export interface IProps {
  // the framework name (e.g., "react")
  framework: string
  // this is the metadata of the framework (index.yml)
  frameworkMeta: IFramework
  // the md article content of the quickstart
  articleContent: string
  // the frontmatter of the article
  articleFrontmatter: Record<string, any>
  // parsed code files relevant for this article
  codes: ICode[]
  // server's host name
  host: string
  // estimated minutes to read
  timeToRead: number
}

interface ICodeFrontmatter {
  name: string
  lang: ICodeLang
}

export interface ICode {
  frontmatter: ICodeFrontmatter
  tokens: string
  lines: string
  content: string
  code: string
  highlitedCode: string
  sections: Record<string, number[]>
}

function generateID(
  children: RenderableTreeNode[],
  attributes: Record<string, any>
) {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

export const getStaticProps: GetStaticProps<IProps> = async (
  context: GetStaticPropsContext<{ framework?: string }>
) => {
  // md files are stored in the 'frameworks' directory
  const dir = path.join(process.cwd(), FW_DIR_NAME)
  // generate the local md path from the URL slug
  const framework = context.params?.framework || ''

  // load the article content and frontmatter
  //
  const fullPath = path.join(dir, framework + '/index.md')
  // read the md file contents
  const source = fs.readFileSync(fullPath, 'utf-8')

  // load the raframework metadata
  //
  const fwMetaFileName = path.join(dir, framework + '/index.yml')
  const fwMeta = yaml.load(
    fs.readFileSync(fwMetaFileName, 'utf-8')
  ) as IFramework

  // Use Markdoc to create a tree of tokens based on the Markdown file
  const ast = Markdoc.parse(source)
  const config = await createConfig(fwMeta)
  const articleContent = JSON.stringify(Markdoc.transform(ast, config))
  const frontmatter = yaml.load(ast.attributes.frontmatter) as Record<
    string,
    any
  >
  frontmatter.authors = frontmatter.authors?.map((a: string) => authors[a])
  frontmatter.date = frontmatter.date.getTime()

  // load code
  //
  const codePaths = await glob(path.join(dir, '**/code/*.md'))
  const codes = codePaths.map((fwPath): ICode => {
    const source = fs.readFileSync(fwPath, 'utf-8')
    const ast = Markdoc.parse(source)
    const frontmatter = yaml.load(
      ast.attributes.frontmatter
    ) as ICodeFrontmatter
    const { lang } = frontmatter
    const codeOrg = ast.children[0].attributes.content

    const { sections, code } = codeSections(codeOrg)
    const tokens = tokenizeCode(code, lang)
    if (!tokens) {
      throw 'no tokens'
    }
    const tokensStr = JSON.stringify(tokens?.map(simplifyToken))
    const linesStr = JSON.stringify(normalizeTokens(tokens))
    const codeStr = JSON.stringify(code)
    const highligtedCodeStr = JSON.stringify(highlight(code, lang))

    return {
      frontmatter,
      tokens: tokensStr,
      lines: linesStr,
      content: codeStr,
      code,
      highlitedCode: highligtedCodeStr,
      sections,
    }
  })

  return {
    props: {
      framework,
      frameworkMeta: fwMeta,
      articleContent,
      articleFrontmatter: frontmatter,
      codes,
      host: getHost({ protocol: true }) || '',
      timeToRead: readingTime(source),
    },
  }
}

async function createConfig(fwMeta: IFramework): Promise<Config> {
  const paths = await glob(path.join(PARTIALS_DIR, '**/*.md'), {})
  const partials: Record<string, any> = {}
  paths.forEach((p) => {
    const parts = p.split(path.sep)
    const content = fs.readFileSync(p, 'utf-8')
    partials[parts[parts.length - 1]] = Markdoc.parse(content)
  })

  const config: Config = {
    variables: {
      fw_meta: fwMeta,
    },
    partials,
    tags: {
      field: {
        render: 'Field',
        attributes: {
          path: { type: String },
        },
      },
      callout: {
        render: 'Callout',
        attributes: {
          title: { type: String },
          type: {
            type: String,
            default: 'note',
            matches: ['note', 'warning'],
            errorLevel: 'critical',
          },
        },
      },
      sdkApiLink: {
        render: 'FrameworkApiRefLink',
        attributes: {
          to: { type: String },
        },
        transform(node, config) {
          const attributes = node.transformAttributes(config)
          const children = node.transformChildren(config)
          return new Tag(
            this.render,
            {
              ...attributes,
              apiRef: config.variables?.fw_meta.sdk_repo.api_reference,
            },
            children
          )
        },
      },
    },
    nodes: {
      heading: {
        ...Markdoc.nodes.heading,
        render: 'Heading',
        // not sure what this means
        // children: ['inline'],
        attributes: {
          ...Markdoc.nodes.heading.attributes,
          component: { type: String },
          data: { type: String },
          section: { type: String },
        },
        transform(node, config) {
          const attributes = node.transformAttributes(config)
          const children = node.transformChildren(config)
          const id = generateID(children, attributes)
          return new Tag(
            this.render,
            { ...attributes, id, level: node.attributes['level'] },
            children
          )
        },
      },
      link: {
        render: 'Link',
        attributes: {
          ...Markdoc.nodes.link.attributes,
          rel: {
            type: String,
          },
          target: {
            type: String,
          },
        },
      },
      fence: {
        render: 'FenceClient',
        attributes: {
          ...Markdoc.nodes.fence.attributes,
          language: {
            type: String,
          },
          resolve: {
            type: Boolean,
          },
        },
      },
    },
  }

  return config
}

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <FieldProvider>
      <FrameworkLayout {...props} />
    </FieldProvider>
  )
}

// Markdoc.renderers.react renders directly into the page so not sure how to use the layout
Page.getLayout = function getLayout(page: ReactElement) {
  return <></>
}
