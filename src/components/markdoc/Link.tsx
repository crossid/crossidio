import { TenantContext } from '@/hooks/tenant'
import { getCrossidManagementHost } from '@/utils/location'
import Link from 'next/link'
import { ReactNode, useContext } from 'react'

const mgmt = 'management'

export function LinkNode({ children, href }: { children: ReactNode; href: string }) {
  const { tenant } = useContext(TenantContext)
  const mgmtHost = getCrossidManagementHost()

  if (href.indexOf(mgmt) === 0) {
    if (tenant) {
      let mgmtHref = `${mgmtHost}/admin/${tenant.id}/${tenant.regionCode.toLocaleLowerCase()}`
      const ext = href.substring(mgmt.length)
      if (ext.length > 0) {
        mgmtHref += ext
      }
      href = mgmtHref
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
