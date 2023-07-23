import { feature } from './features'
import {
  ArrowTrendingUpIcon,
  ChartBarSquareIcon,
  CheckBadgeIcon,
  InboxIcon,
  KeyIcon,
  LightBulbIcon,
  ViewColumnsIcon,
} from '@heroicons/react/24/outline'

export const features: feature[] = [
  {
    id: 'recertification',
    title: 'Re-Certification',
    description: 'Manage and Streamline the process of certifying user entitlements.',
    href: '/recertification',
    features: {
      general: [
        {
          title: 'Certify anything',
          description:
            'Certiy any kind of owned entitlement, including group memberships, ,roles, devices and more.',
          tags: ['primary'],
        },
        {
          title: 'Multi Application',
          description:
            'Handle entitlements recertification across various platforms, applications, and systems used within the organization.',
          tags: ['primary'],
        },
        {
          title: 'Stories',
          description: 'Ready made stories covers most of the re-certification scnearios.',
          tags: ['primary'],
        },
        {
          title: 'Simplified Review UI',
          description:
            'Drastically cut the effort by letting reviewers certify multiple users and entitlements at once.',
          tags: ['primary'],
        },
        {
          title: 'Audit Trail',
          description:
            'All recertification activities and logged and audited to support compliance and accountability.',
        },
        // {
        //   title: 'Collaboration and Communication',
        //   description:
        //     'Built-in communication tools to enable reviewers, managers, and users to collaborate during the recertification process.',
        // },
        {
          title: 'Automatic Processing',
          description: 'Auto revocation denied entitlements without human interaction.',
        },
        {
          title: 'Flows',
          description:
            'Ready made flows let data owners and / or  hierarchial managers to review entitlements per scenario',
          // Flexibility to customize the recertification workflow according to the organization's unique requirements and compliance policies
          tags: ['primary'],
        },
        {
          title: 'Notifications and Reminders',
          description:
            'Automated notifications and reminders to reviewers about upcoming recertification campaigns and pending reviews.',
        },
        {
          title: 'Reporting and Analytics',
          description:
            'Comprehensive reporting and analytics capabilities to provide insights into user entitlements, recertification progress, and potential security risks.',
          tags: ['primary'],
        },
        {
          title: 'Compliance and Regulatory Reporting',
          description:
            'Generate compliance reports for internal audits and regulatory requirements.',
          // tags: ['primary'],
        },
        // {
        //   title: 'Expiration',
        //   description: 'Access Expiration and Revocation: An option to set access expiration dates or trigger automated access revocation if entitlements are not recertified within a specified time frame.'
        // }
        // {
        //   title: 'AI',
        //   description:
        //     'Role Mining and Analysis: Advanced features to analyze user behavior and suggest appropriate entitlements based on historical access patterns and job responsibilities. Continuous Monitoring: Real-time monitoring of access rights to identify and address potential security risks and unauthorized access.',
        // },
      ],
      portal: [
        {
          title: 'Inbox.',
          description:
            'A single inbox that groups multiple review tasks together for multi tasks review.',
          icon: InboxIcon,
        },
        {
          title: 'Aggregated Layouts.',
          description:
            'Reviewers have the ability to approve multiple users or entitlements in a single view, and they can easily switch between layouts for added convenience.',
          icon: ViewColumnsIcon,
        },
        {
          title: 'Decision insights.',
          description: 'Assists reviewers to take a more accurate decisions via insights.',
          icon: LightBulbIcon,
        },
      ],
      campaign: [
        {
          title: 'Certifications overview',
          description: 'Track how many certifications are opened & closed.',
          icon: ChartBarSquareIcon,
        },
        {
          title: 'Decisions',
          description: 'Track the total reviewers decisions.',
          icon: CheckBadgeIcon,
        },
        {
          title: 'Reviewers progress',
          description: 'Track reviewers effort progress.',
          icon: ArrowTrendingUpIcon,
        },
      ],
      stories: [
        {
          title: 'Simple.',
          description: 'Out of the box stories that covers most of the standard scenarios.',
          icon: InboxIcon,
        },
        {
          title: 'Adaptable.',
          description:
            'Support for custom stories to cover more specific demands such complex review flows.',
          icon: ViewColumnsIcon,
        },
      ],
    },
    icon: KeyIcon,
  },
]
