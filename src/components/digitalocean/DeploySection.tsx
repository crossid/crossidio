import Link from 'next/link'
import {
  ProductContent,
  ProductFeatureLinks,
  ProductFeatures,
  ProductFeaturesContent,
  ProductFeaturesIntro,
  ProductFeaturesLink,
  ProductFeaturesTitle,
  ProductIntro,
  ProductIntroContent,
  ProductIntroHeading,
  ProductSummary,
  Section,
  SectionSubtitle,
  SectionTitle,
} from './Sections'
import AppGithubSvg from './apps_github.png'
import Image from 'next/image'

const computing = [
  {
    title: 'Apps',
    href: '/',
  },
  {
    title: 'Kubernetes',
    href: '/',
  },
  {
    title: 'Droplets',
    href: '/',
  },
]

export function DeploySection() {
  return (
    <Section>
      <SectionTitle>Deploy</SectionTitle>
      <SectionSubtitle>
        Deploy your configured app into Apps, Kubernetes or Droplet.
      </SectionSubtitle>
      <ProductSummary>
        <ProductIntro>
          <ProductIntroHeading>Choose the right computing service</ProductIntroHeading>
          <ProductIntroContent>
            <p>
              Whether your apps are running on{' '}
              <span className="text-gray-500 dark:text-slate-500">Apps engine</span>,{' '}
              <span className="text-gray-500 dark:text-slate-500">Kubernetes cluster</span> or
              simple <span className="text-gray-500 dark:text-slate-500">Droplets</span>, we got you
              covered.
            </p>
          </ProductIntroContent>
        </ProductIntro>
        <ProductContent className="col-span-2 grid max-w-2xl auto-cols-max grid-cols-1 gap-y-16 gap-x-8 self-start sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:place-items-center">
          <div className="col-span-2">
            <div className="flex">
              <div className="mr-6 pr-6">
                <Link href="/docs/frameworks">
                  <span className="text-sm font-semibold text-gray-800 underline dark:text-slate-500">
                    DO&apos;s Computing Services
                  </span>{' '}
                  <span aria-hidden="true" className="text-indigo-400 dark:text-sky-400">
                    →
                  </span>
                </Link>
                <ul className="pt-4">
                  {computing.map((f, i) => (
                    <li
                      key={i}
                      className="text-sm font-semibold leading-6 text-gray-600 dark:text-slate-400"
                    >
                      <a href={f.href}>{f.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ProductContent>
      </ProductSummary>
      <ProductFeatures>
        <ProductFeaturesTitle>Deploy</ProductFeaturesTitle>
        <ProductFeaturesIntro>Choose the most convinient way to run you apps</ProductFeaturesIntro>
      </ProductFeatures>
      <ProductFeatures sub>
        <ProductFeaturesTitle sub>Apps</ProductFeaturesTitle>
        <ProductFeaturesIntro>
          DO&apos;s apps engine detect apps directly from github repo, then it builds and deploy
          everything for you so you can focus on code, not servers.
        </ProductFeaturesIntro>
        <ProductFeaturesContent>
          <div className="col-span-2">
            <h4 className="pb-4 font-semibold text-gray-800 dark:text-slate-600">
              Apps via Github Repo
            </h4>
            <Image alt="apps via github" src={AppGithubSvg} />
            <ProductFeatureLinks>
              <ProductFeaturesLink href="https://github.com/crossid/sample-monorepo">
                Monorepo sample
              </ProductFeaturesLink>
            </ProductFeatureLinks>
          </div>
        </ProductFeaturesContent>
      </ProductFeatures>
    </Section>
  )
}
