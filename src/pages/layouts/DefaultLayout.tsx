import Nav from '@/components/Nav'
import { ReactNode } from 'react'

export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <div>{children}</div>
    </>
  )
}
