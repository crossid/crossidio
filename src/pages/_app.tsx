import React, { useEffect, Fragment, ReactNode } from 'react'
import '../css/fonts.css'
import '../css/main.css'
import Router from 'next/router'
import { Title } from '@/components/Title'
import Head from 'next/head'
// import { ToastProvider } from '../toasts'
import * as gtag from '@/lib/gtag'
// import twitterLargeCard from '@/img/crossid-large-card.jpg'
import ProgressBar from '@badrap/bar-of-progress'
import { IntercomProvider, useIntercom } from 'react-use-intercom'
const INTERCOM_APP_ID = 'j176kjoq'

const progress = new ProgressBar({
  size: 2,
  color: 'white',
  className: 'bar-of-progress',
  delay: 100,
})

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', () => {
  progress.finish()
  window.scrollTo(0, 0)
})
Router.events.on('routeChangeError', progress.finish)

export default function App({
  Component,
  pageProps,
  router,
}: {
  Component: any
  pageProps: any
  router: any
}) {
  // const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const Layout = Component.layoutProps?.Layout || Fragment
  const layoutProps = Component.layoutProps?.Layout ? { layoutProps: Component.layoutProps } : {}
  const meta = Component.layoutProps?.meta || {}
  const description = meta.metaDescription || meta.description || 'CrossID - modern cloud identity.'

  return (
    <>
      <Title suffix="CrossID">{meta.metaTitle || meta.title}</Title>
      <Head>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:site" name="twitter:site" content="@crossidio" />
        <meta key="twitter:description" name="twitter:description" content={description} />
        {/*
        <meta
          key="twitter:image"
          name="twitter:image"
          content={`...}`}
        />
        */}
        <meta key="twitter:creator" name="twitter:creator" content="@crossidio" />
        <meta key="og:url" property="og:url" content={`https://crossid.io${router.pathname}`} />
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:description" property="og:description" content={description} />
        <meta name="description" content={description}></meta>
        {/* 
        <meta
          key="og:image"
          property="og:image"
          content={....}
        />
         */}
      </Head>
      {/* <ToastProvider> */}
      <Layout {...layoutProps}>
        <IntercomProvider appId={INTERCOM_APP_ID} autoBoot>
          <Component {...pageProps} />
        </IntercomProvider>
      </Layout>
      {/* </ToastProvider> */}
    </>
  )
}
