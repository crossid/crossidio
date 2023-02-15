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
import { pathToSlug } from '@/utils/fsystem'

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
      tags={tags}
    />
  )
}

// Markdoc.renderers.react renders directly into the page so not sure how to use the layout
Page.getLayout = function getLayout(page: ReactElement) {
  return <></>
}

export default Page
