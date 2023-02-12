import Head from 'next/head'
import { collectHeadings } from '@/utils/remark'
import { MarkdocNextJsPageProps } from '@markdoc/next.js'
import { AppProps } from 'next/app'
import type { NextPage } from 'next'

// import 'focus-visible'
import '@/styles/globals.css'
import DocsLayout from './layouts/DocsLayout'
import { ReactElement, ReactNode } from 'react'
import DefaultLayout from './layouts/DefaultLayout'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps<MarkdocNextJsPageProps> & {
  Component: NextPageWithLayout
}

function getLayoutDefault(page: ReactElement): ReactNode {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if (pageProps.markdoc) {
    let title = pageProps.markdoc?.frontmatter.title

    let pageTitle =
      pageProps.markdoc?.frontmatter.pageTitle ||
      `${pageProps.markdoc?.frontmatter.title} - Docs`

    let description = pageProps.markdoc?.frontmatter.description

    let tableOfContents = pageProps.markdoc?.content
      ? collectHeadings(pageProps.markdoc.content)
      : []

    const props = pageProps as any
    return (
      <>
        <Head>
          <title>{pageTitle}</title>
          {description && <meta name="description" content={description} />}
        </Head>
        <DocsLayout title={title} tableOfContents={tableOfContents}>
          <Component {...props} />
        </DocsLayout>
      </>
    )
  } else {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout
      ? (page: any) => page
      : getLayoutDefault

    const props = pageProps as any
    return getLayout(<Component {...props} />)
  }
}
