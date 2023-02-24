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
const Prism = require('prismjs')
const {
  highlightCode,
  fixSelectorEscapeTokens,
  simplifyToken,
  normalizeTokens,
} = require('@/utils/tokens')
import QuickstartLayout from '@/layouts/QuickstartLayout'
import { Tag } from '@markdoc/markdoc'
import { ReactElement } from 'react'
import { IFramework } from '@/types'
import { getHost } from '@/utils/location'

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
}

interface ICodeFrontmatter {
  name: string
  lang: string
}

export interface ICode {
  frontmatter: ICodeFrontmatter
  tokens: string
  lines: string
  content: string
  code: string
  highlitedCode: string
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
  // Use Markdoc to create a tree of tokens based on the Markdown file
  const ast = Markdoc.parse(source)
  const config = await createConfig()
  const articleContent = JSON.stringify(Markdoc.transform(ast, config))
  const frontmatter = yaml.load(ast.attributes.frontmatter) as Record<
    string,
    any
  >
  frontmatter.authors = frontmatter.authors?.map((a: string) => authors[a])
  frontmatter.date = frontmatter.date.getTime()

  // load the raframework metadata
  //
  const fwMetaFileName = path.join(dir, framework + '/index.yml')
  const fwMeta = yaml.load(
    fs.readFileSync(fwMetaFileName, 'utf-8')
  ) as IFramework

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
    const code = ast.children[0].attributes.content

    // note: this code is a dup of next.config.js
    let grammar = Prism.languages[lang]
    let tokens = Prism.tokenize(code, grammar, lang)
    if (lang === 'css') {
      fixSelectorEscapeTokens(tokens)
    }
    const tokensStr = JSON.stringify(tokens.map(simplifyToken))
    const linesStr = JSON.stringify(normalizeTokens(tokens))
    const codeStr = JSON.stringify(source)
    const highligtedCodeStr = JSON.stringify(highlightCode(source, lang))

    return {
      frontmatter,
      tokens: tokensStr,
      lines: linesStr,
      content: codeStr,
      code,
      highlitedCode: highligtedCodeStr,
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
    },
  }
}

async function createConfig(): Promise<Config> {
  const paths = await glob(path.join(PARTIALS_DIR, '**/*.md'), {})
  const partials: Record<string, any> = {}
  paths.forEach((p) => {
    const parts = p.split(path.sep)
    const content = fs.readFileSync(p, 'utf-8')
    partials[parts[parts.length - 1]] = Markdoc.parse(content)
  })

  const config: Config = {
    partials,
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
    },
  }

  return config
}

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <QuickstartLayout {...props} />
}

// Markdoc.renderers.react renders directly into the page so not sure how to use the layout
Page.getLayout = function getLayout(page: ReactElement) {
  return <></>
}
