import {
  ClockIcon,
  KeyIcon,
  PuzzlePieceIcon,
  Square3Stack3DIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import React, { ForwardRefExoticComponent, SVGProps } from 'react'

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
    features: {
      store: [
        {
          title: 'Elastic Storage',
          description:
            'Simply store any form of data such users, groups, permissions and devices along their references.',
          tags: ['primary'],
        },
        {
          title: 'Identity overview in a glance',
          description: 'Applications assignments, devices and credentials within a single view.',
          tags: ['primary'],
        },
        {
          title: 'Revision control',
          description:
            'Record, investigate and rollback any change made on users along with their access rights.',
          tags: ['primary'],
        },
        {
          title: 'Multi mastering sources',
          description:
            "Import identities from multiple mastering sources such as CSV or customer's HR.",
        },
        {
          title: 'Access control decisions',
          description:
            'Supports multiple access control decision approaches such as ABAC and RBAC.',
        },
        {
          title: 'Ownership',
          description: 'Link users to their identity with automated correlations tools.',
        },
        {
          title: 'Audit Log',
          description: 'Increase visibility and fulfil audit demands with geo-enabled event log.',
          tags: ['primary'],
        },
        {
          title: 'Provisioning',
          description: 'De / Provision identities and entitlements using SCIM v2 cloud standards.',
        },
      ],
      rules: [
        {
          title: 'Simple',
          description: 'Write buessiness level rules, no technical skills required.',
        },
        {
          title: 'Powerful',
          description:
            'Evaluate rules on any identity attribute such as organization hierarchy and positions.',
        },
      ],
      rbac: [
        {
          title: 'Applications',
          description: 'Assign multiple applications per group.',
          icon: Square3Stack3DIcon,
        },
        {
          title: 'Any Privilege',
          description: 'Assign any kind of privilege including group membership and scopes.',
          icon: KeyIcon,
        },
        {
          title: 'Temporary',
          description: 'Increase security by assigning roles temporarily.',
          icon: ClockIcon,
        },
      ],
    },
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
