import { PuzzlePieceIcon, UserIcon } from '@heroicons/react/24/outline'
import React, { ForwardRefExoticComponent, ReactNode, SVGProps } from 'react'

export interface IFeature {
  title: string
  description: string
  icon?: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
  tags?: string[]
}

export interface feature {
  id: string
  title: string
  description: string
  href: string
  icon: React.ElementType
  features?: Record<string, IFeature[]>
}

export const features: feature[] = [
  {
    id: 'user-management',
    title: 'User Management',
    description: 'Manage users, groups and devices at scale.',
    href: '/user-management',
    icon: UserIcon,
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Third party integrations.',
    href: '/integrations',
    icon: PuzzlePieceIcon,
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
