import Head from 'next/head'
import { ReactNode } from 'react'

export function Title({ suffix, children }: { suffix: string; children: ReactNode }) {
  let title = children + (suffix ? ` - ${suffix}` : '')

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="og:title" property="og:title" content={title} />
    </Head>
  )
}
