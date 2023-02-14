import Head from 'next/head'
import { collectHeadings } from '@/utils/remark'
import { MarkdocNextJsPageProps } from '@markdoc/next.js'
import { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { AuthProvider } from '@crossid/crossid-react'

// import 'focus-visible'
import '@/styles/globals.css'
import '@/styles/fonts.css'
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
  const pathname = useRouter().pathname
  let AppComp

  if (pageProps.markdoc && pathname.startsWith('/docs')) {
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
      <WrapApp>
        <>
          <Head>
            <title>{pageTitle}</title>
            {description && <meta name="description" content={description} />}
          </Head>
          <DocsLayout title={title} tableOfContents={tableOfContents}>
            <Component {...props} />
          </DocsLayout>
        </>
      </WrapApp>
    )
  } else {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout
      ? (page: any) => page
      : getLayoutDefault

    const props = pageProps as any
    return <WrapApp>{getLayout(<Component {...props} />)}</WrapApp>
  }
}

function WrapApp({ children, ...props }: { children: ReactElement }) {
  return (
    <AuthProvider
      tenant_id={process.env.NEXT_PUBLIC_CID_AUTH_TENANT_ID || ''}
      client_id={process.env.NEXT_PUBLIC_CID_AUTH_CLIENT_ID || ''}
      redirect_uri={process.env.NEXT_PUBLIC_CID_AUTH_REDIRECT_URI || ''}
      // @ts-ignore TODO
      region={'us.dev'}
      post_logout_redirect_uri={
        process.env.NEXT_PUBLIC_CID_AUTH_LOGOUT_REDIRECT_URI || ''
      }
      scope={'customer openid email'}
      cache_type="session_storage"
    >
      {children}
    </AuthProvider>
  )
}
