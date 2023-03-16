import { TenantContext } from '@/hooks/tenant'
import { getCrossidManagementHost } from '@/utils/location'
import Link from 'next/link'
import { ReactNode, useContext } from 'react'

export function LinkNode({ children, href }: { children: ReactNode; href: string }) {
  const { tenant } = useContext(TenantContext)
  const mgmtHost = getCrossidManagementHost()

  if (href === 'management') {
    if (tenant) {
      href = `${mgmtHost}/admin/${tenant.id}/${tenant.regionCode.toLocaleLowerCase()}`
    } else {
      href = `${mgmtHost}/cockpit`
    }
  }

  return (
    <Link href={href} target={href.startsWith('http') ? 'blank' : ''}>
      {children}
    </Link>
  )
}
