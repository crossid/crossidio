import Image from 'next/image'
import {
  ArrowRightOnRectangleIcon,
  CloudArrowUpIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline'
import { crossidAddonURL, learnMoreURL } from './utils'
import Link from 'next/link'
import {
  ProductContent,
  ProductIntro,
  ProductIntroContent,
  ProductIntroHeading,
  ProductSummary,
  Section,
  SectionSubtitle,
  SectionTitle,
} from './Sections'
import AddonsSvg from './addons.png'

const features = [
  {
    name: 'Register.',
    description: (
      <span>
        Setup a tenant in seconds in the <span className="font-semibold">Add-Ons</span> section.
      </span>
    ),
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Single Sign On.',
    description: 'Manage Crossid using your DigitalOcean credentials.',
    icon: ArrowRightOnRectangleIcon,
  },
  {
    name: 'Billing.',
    description:
      "Ready to go beyond free tier? payment is charged DigitalOcean so you don't have to provide additional credit card details.",
    icon: CreditCardIcon,
  },
]

export function AddSection() {
  return (
    <Section>
      <SectionTitle>Add</SectionTitle>
      <SectionSubtitle>Manage via DigitalOcean&apos;s control panel</SectionSubtitle>
      <ProductSummary gridCols={2}>
        <ProductIntro>
          <ProductIntroHeading>Crossid as an Addon</ProductIntroHeading>
          <ProductIntroContent>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-slate-400">
              Signup and login to Crossid directly from DigitalOcean&apos;s control panel.
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-slate-400 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900 dark:text-slate-400">
                    <feature.icon
                      className="absolute top-1 left-1 h-5 w-5 text-indigo-600 dark:text-sky-600"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>{' '}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-col gap-y-4">
              <a
                href={crossidAddonURL()}
                className="text-md rounded-md bg-indigo-600 px-4 py-2.5 text-center font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-sky-600 dark:hover:bg-sky-700"
              >
                Start using as an for free
              </a>
              <Link
                href={learnMoreURL()}
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-300"
              >
                Expore more about DigitalOcean & Crossid <span aria-hidden="true">→</span>
              </Link>
            </div>
          </ProductIntroContent>
        </ProductIntro>
        <ProductContent className="hidden lg:block">
          <Image alt="control panel" width={500} height={500} src={AddonsSvg} />
        </ProductContent>
      </ProductSummary>
    </Section>
  )
}
