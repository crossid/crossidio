import glob from 'glob-promise'
import path from 'path'
import fs from 'fs'
import Markdoc, { Config, Tag } from '@markdoc/markdoc'
import React, { ReactElement } from 'react'
import yaml from 'js-yaml'
import { authors } from '@/data/authors'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { BlogPostLayout } from '@/layouts/BlogPostLayout'
import { pathToSlug } from '@/utils/fsystem'
import { getHost } from '@/utils/location'
import { highlightedCode } from '@/utils/prism/highlight'
import { readingTime } from '@/utils/content'

// see https://www.docploy.com/blog/how-to-build-a-blog-using-nextjs-and-markdoc

export const getStaticPaths = async () => {
  // blog md files are stored in the 'posts' directory
  const POSTS_DIR = path.join(process.cwd(), 'posts')

  // find all md files in the 'posts' directory
  // With The glob-promise library, we can use a one liner to find our Markdown files
  const postPaths = await glob(path.join(POSTS_DIR, '**/*.md'))

  // for each filename, the slug is the filename without the .md extension
  let paths = postPaths.map((postPath) => {
    const slug = pathToSlug(postPath)
    return { params: { slug } }
  })

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{
  frontmatter: Record<string, any>
  content: string
  timeToRead: number
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

  const config: Config = {
    tags: {
      callout: {
        attributes: {
          title: { type: String },
          type: {
            type: String,
            default: 'note',
            matches: ['note', 'warning'],
            errorLevel: 'critical',
          },
        },
        render: 'Callout',
      },
      img: {
        render: 'Img',
        attributes: {
          name: {
            type: String,
          },
          alt: {
            type: String,
          },
          width: {
            type: Number,
          },
          height: {
            type: Number,
          },
        },
      },
      mermaid: {
        render: 'Mermaid',
        attributes: {},
      },
    },
    nodes: {
      fence: {
        render: 'Fence',
        attributes: {
          language: {
            type: String,
          },
        },
        transform(node, config) {
          const attributes = node.transformAttributes(config)
          const children = node.transformChildren(config)
          const code = children.toString().trimEnd()
          const { lines, highlights } = highlightedCode(
            code,
            attributes.language
          )

          return new Tag(
            this.render,
            { ...attributes, lines, highlights },
            children
          )
        },
      },
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
      timeToRead: readingTime(source),
      slug,
      host: getHost({ protocol: true }),
    },
  }
}

// Create a React component using Markdoc's React renderer and our list of custom components.
const Page = (props: any) => {
  const { content, frontmatter, slug, host, timeToRead } = props
  const parsedContent = JSON.parse(content)

  const { title, description, authors, date, tags, card } = frontmatter
  const d = new Date(date)

  return (
    <BlogPostLayout
      authors={authors}
      date={d}
      title={title}
      content={parsedContent}
      description={description}
      tags={tags}
      slug={slug}
      card={card}
      host={host}
      timeToRead={timeToRead}
    />
  )
}

// Markdoc.renderers.react renders directly into the page so not sure how to use the layout
Page.getLayout = function getLayout(page: ReactElement) {
  return <></>
}

export default Page
