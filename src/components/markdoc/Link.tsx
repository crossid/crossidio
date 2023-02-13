import Link from 'next/link'
import { ReactNode } from 'react'

export function LinkNode({
  children,
  href,
}: {
  children: ReactNode
  href: string
}) {
  return (
    <Link href={href} target={href.startsWith('http') ? 'blank' : ''}>
      {children}
    </Link>
  )
}
