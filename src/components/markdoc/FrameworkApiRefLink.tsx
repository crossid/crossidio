import { ReactNode } from 'react'

export function FrameworkApiRefLink({
  children,
  to,
  apiRef,
}: {
  children: ReactNode
  to: string
  apiRef: string
}) {
  return (
    <a href={`${apiRef}/${to}`} target={'blank'}>
      {children}
    </a>
  )
}
