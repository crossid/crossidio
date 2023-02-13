import { Navigation } from '@/components/docs/Nav'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { ReactNode } from 'react'

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
