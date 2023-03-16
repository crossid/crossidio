import { Fragment } from 'react'
import { SPAFrameworks } from '@/data/frameworks'
import Link from 'next/link'
import {
  AuthFeatureLink,
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
import { CodeWindow, getClassNameForToken } from '../CodeWindow'
import { lines } from '@/samples/react-simple/index.jsx?highlight'
import clsx from 'clsx'

export function IntegrateSection() {
  return (
    <Section>
      <SectionTitle>Integrate</SectionTitle>
      <SectionSubtitle>Integrate into your framework of choice.</SectionSubtitle>
      <ProductSummary>
        <ProductIntro>
          <ProductIntroHeading>Few lines of code.</ProductIntroHeading>
          <ProductIntroContent>
            <p>
              Quickly integrate authentication features such as <AuthFeatureLink type="signup" />,
              <AuthFeatureLink type="login" />, <AuthFeatureLink type="logout" />
              and <AuthFeatureLink type="show user profile" /> by using our ready made samples in no
              time.
            </p>
          </ProductIntroContent>
        </ProductIntro>
        <ProductContent className="col-span-2 grid max-w-2xl auto-cols-max grid-cols-1 gap-y-16 gap-x-8 self-start sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:place-items-center">
          <div className="col-span-2">
            <div className="flex">
              <div className="mr-6 pr-6">
                <Link href="/docs/frameworks">
                  <span className="text-sm font-semibold text-gray-800 underline dark:text-slate-500">
                    SPA Frameworks
                  </span>{' '}
                  <span aria-hidden="true" className="text-indigo-400 dark:text-sky-400">
                    →
                  </span>
                </Link>
                <ul className="pt-4">
                  {SPAFrameworks.map((f) => (
                    <li
                      key={f.id}
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
        <ProductFeaturesTitle>SDKs</ProductFeaturesTitle>
        <ProductFeaturesIntro>SDKs available for most common frameworks.</ProductFeaturesIntro>
        {/* <ProductFeaturesContent>
          <div>
            <h4 className="font-semibold text-gray-800">title1</h4>
            <p>Content...</p>
          </div>
        </ProductFeaturesContent> */}
      </ProductFeatures>
      <ProductFeatures sub>
        <ProductFeaturesTitle sub>React</ProductFeaturesTitle>
        <ProductFeaturesIntro>
          Add authentication to your React apps, see{' '}
          <Link href="/docs/frameworks/react" className="text-indigo-500 dark:text-sky-500">
            react tour
          </Link>
          .
        </ProductFeaturesIntro>
        <ProductFeaturesContent>
          <div className="col-span-2">
            <h4 className="pb-4 font-semibold text-gray-800 dark:text-slate-600">
              Login code sample
            </h4>
            <div
              className={clsx(
                'relative flex h-[21.625rem] max-h-[60vh] overflow-hidden bg-slate-800 shadow-xl dark:bg-slate-900/70 dark:ring-1 dark:ring-inset dark:ring-white/10 dark:backdrop-blur sm:max-h-[none] sm:rounded-xl lg:h-[24.6875rem] xl:h-[21.625rem]'
              )}
            >
              <CodeWindow.Code2 lines={lines.length} showLineNumbers={false}>
                {lines.map((tokens, li) => (
                  <Fragment key={li}>
                    {tokens.map((token: IToken, ti: number) => {
                      return (
                        <span key={ti} className={getClassNameForToken(token)}>
                          {token.content}
                        </span>
                      )
                    })}
                    {'\n'}
                  </Fragment>
                ))}
              </CodeWindow.Code2>
            </div>
            <ProductFeatureLinks>
              <ProductFeaturesLink href="/docs/frameworks/react">React Tour</ProductFeaturesLink>
            </ProductFeatureLinks>
          </div>
        </ProductFeaturesContent>
      </ProductFeatures>
    </Section>
  )
}
