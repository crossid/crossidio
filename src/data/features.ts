import { UserIcon } from '@heroicons/react/24/outline'
import React from 'react'

export interface feature {
  id: string
  title: string
  description: string
  href: string
  icon: React.ElementType
}

export const features: feature[] = [
  {
    id: 'store',
    title: 'Identity Store',
    description: 'Manage users, groups and devices at scale.',
    href: '/store',
    icon: UserIcon,
  },
  // {
  //   name: 'Authentication',
  //   description: 'Sign users in, securely.',
  //   href: '#',
  //   icon: CursorClickIcon,
  // },
  // {
  //   name: 'Security',
  //   description: "Your customers' data will be safe and secure.",
  //   href: '#',
  //   icon: ShieldCheckIcon,
  // },
  // {
  //   name: 'Integrations',
  //   description: "Connect with third-party tools that you're already using.",
  //   href: '#',
  //   icon: ViewGridIcon,
  // },
]
