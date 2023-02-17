import HeroScreenshot from '@/images/features/user_management/hero.png'
import EntitlementsScreenshot from '@/images/features/user_management/group_entitlements.png'
import AddRuleScreenshot from '@/images/features/user_management/add_rule.png'
import { ReactNode } from 'react'
import { features } from '@/data/features'
import Image from 'next/image'
import Head from 'next/head'

// const product = products.filter((p) => p.title === 'Store')[0]

const userm = features.filter((f) => f.id == 'user-management')[0]

const Hero = () => {
  return (
    <div className={`bg-white`}>
      <div className="mx-auto max-w-7xl py-16">
        <div className="overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-4xl font-extrabold text-black sm:text-5xl">
                <span className="block">Manage Users</span>
              </h2>
              <p className={`mt-8 text-lg leading-6`}>
                Unified management of user profiles, privileges and devices at
                scale.
              </p>
            </div>
          </div>
          <div className="aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <Image
              className="rounded-md object-cover object-left-top"
              src={HeroScreenshot}
              alt="App screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const FeatureItem = ({
  title,
  description,
}: {
  title: string
  description: string
}) => (
  <div className="flex">
    <svg
      className="h-6 w-6 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
    <div className="ml-3">
      <dt className="text-lg font-medium leading-6 text-gray-900">{title}</dt>
      <dd className="mt-2 text-base">{description}</dd>
    </div>
  </div>
)

const StoreSection = () => (
  <>
    <div className="bg-white" id="store">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:py-24 lg:px-8">
        <div>
          <h2
            className={`text-base font-semibold uppercase tracking-wide text-indigo-600`}
          >
            Securely store anything
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-black">
            Unified Store
          </p>
          <p className="mt-4 text-lg">
            Store and manage users, groups or any other IAM related objects.
          </p>
        </div>
        <div className="mt-12 lg:col-span-2 lg:mt-0">
          <dl className="space-y-10 sm:grid sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4 sm:gap-x-6 sm:gap-y-10 sm:space-y-0 lg:gap-x-8">
            <FeatureItem
              title="Elastic Storage"
              description="Simply store any form of data such users, groups, permissions and devices along their references."
            />
            <FeatureItem
              title="Identity overview in a glance"
              description="Applications assignments, devices and credentials within a single view."
            />
            <FeatureItem
              title="Revision control"
              description="Record, investigate and rollback any change made on users along with their access rights."
            />
            <FeatureItem
              title="Multi mastering sources"
              description="Import identities from multiple mastering sources such as CSV or customer's HR."
            />
            <FeatureItem
              title="Access control decisions"
              description="Supports multiple access control decision approaches such as ABAC and RBAC."
            />
            <FeatureItem
              title="Ownership"
              description="Link users to their identity with automated correlations tools."
            />
            <FeatureItem
              title="Audit Log"
              description="Increase visibility and fulfil audit demands with geo-enabled event log."
            />
            <FeatureItem
              title="Provisioning"
              description="De / Provision identities and entitlements using SCIM v2 cloud standards."
            />
          </dl>
        </div>
      </div>
    </div>
    <div className="bg-white"></div>
  </>
)

const RuleItem = ({ label, text }: { label: string; text: string }) => (
  <div className="flex">
    <svg
      className={`h-6 w-6 flex-shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
    <div className="ml-3">
      <dt className="text-lg font-medium leading-6 text-gray-900">{label}</dt>
      <dd className="mt-2 text-base">{text}</dd>
    </div>
  </div>
)

const RoleItem = ({
  label,
  text,
  children,
}: {
  label: string
  text: string
  children: ReactNode
}) => (
  <div className="flex">
    <div className="flex-shrink-0">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600 text-white`}
      >
        {children}
      </div>
    </div>
    <div className="ml-4">
      <dt className="text-lg font-medium leading-6 text-gray-900">{label}</dt>
      <dd className="mt-2 text-base">{text}</dd>
    </div>
  </div>
)

const AccessControlSection = () => (
  <>
    {/* <Section id="access-control">
      <SectionTitle>Access Control Decisions</SectionTitle>
      <SectionSubtitle>Rule based and role based access control.</SectionSubtitle>
    </Section> */}
    <div className="overflow-hidden py-16 lg:py-24">
      <div className="relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mb-8 overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
                  Simple, yet powerful dynamic rules.
                </h1>
              </div>
              <div className="mt-20 grid gap-5">
                <RuleItem
                  label="Simple"
                  text="Write buessiness level rules, no technical skills required."
                />
                <RuleItem
                  label="Powerful"
                  text="Evaluate rules on any identity attribute such as organization hierarchy and positions."
                />
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl lg:left-80 lg:right-0 lg:w-full"></div>
                <svg
                  className="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0"
                  width="404"
                  height="392"
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="4"
                        height="4"
                        className="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="404"
                    height="392"
                    fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                  />
                </svg>
              </div>
              <div className="relative -mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
                <Image src={AddRuleScreenshot} alt="rules screenshot" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* roles */}
      <svg
        className="absolute right-full hidden translate-x-1/2 translate-y-12 transform lg:block"
        width="404"
        height="784"
        fill="none"
        viewBox="0 0 404 784"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              className="text-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="784"
          fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
        />
      </svg>

      <div className="relative mx-auto mt-12 px-4 sm:mt-16 sm:px-6 lg:mt-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="lg:col-start-2">
            <h3 className="text-2xl font-extrabold tracking-tight text-black sm:text-3xl">
              Lightweight Groups
            </h3>
            <p className="mt-3 text-lg">
              Build business functional groups to abstract technical
              entitlements without RBAC hassle.
            </p>

            <dl className="mt-10 space-y-10">
              <RoleItem
                label="Applications"
                text="Assign multiple applications per group."
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </RoleItem>
              <RoleItem
                label="Any Privilege"
                text="Assign any kind of privilege including group membership and scopes."
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </RoleItem>
              <RoleItem
                label="Temporary"
                text="Increase security by assigning roles temporarily."
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </RoleItem>
            </dl>
          </div>
          <div className="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
            <svg
              className="absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden"
              width="784"
              height="404"
              fill="none"
              viewBox="0 0 784 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="784"
                height="404"
                fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
              />
            </svg>
            <Image
              className="relative mx-auto"
              width="600"
              src={EntitlementsScreenshot}
              alt="Groups screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  </>
)

export default function Store() {
  return (
    <>
      <Head>
        <title>{userm.title}</title>
        <meta name="description" content={userm.description} />
      </Head>
      <div className="bg-white">
        <main className="antialiased">
          <Hero />
          {/* <Map /> */}
          <StoreSection />
          <AccessControlSection />
          <div className="relative bg-white py-16 sm:py-24 lg:py-36"></div>
        </main>
      </div>
    </>
  )
}
