import { ReactNode } from 'react'

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <Nav /> */}
      <div>{children}</div>
    </>
  )
}
