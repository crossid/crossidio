import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { ReactNode } from 'react'

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative items-center justify-between pt-6 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200 lg:pt-8">
        <Nav />
      </div>
      {children}
      <Footer />
    </>
  )
}
