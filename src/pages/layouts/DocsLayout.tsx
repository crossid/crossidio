import { ReactElement, useContext, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Navigation } from '@/components/docs/Nav'
import { Prose } from '@/components/Prose'
import { INav, ITOC } from '@/types'
import Nav from '@/components/Nav'
import DocsHero from '@/components/docs/Hero'
import FooterSlim from '@/components/FooterSlim'
import { useTableOfContents } from '@/hooks/toc'
import { TenantContext } from '@/hooks/tenant'
import { FieldsContext } from '@/hooks/useFieldsContext'

const navigation: INav = [
  {
    title: 'Integration',
    links: [
      {
        title: 'Frameworks',
        href: '/docs/frameworks',
      },
    ],
  },
  {
    title: 'How To',
    links: [
      {
        title: 'Machine to Machine',
        href: '/docs/howto/machine-to-machine',
      },
      {
        title: 'Custom Domain',
        href: '/docs/howto/custom-domain',
      },
    ],
  },
  {
    title: 'Concepts',
    links: [
      { title: 'Application', href: '/docs/concepts/application' },
      { title: 'Tenant', href: '/docs/concepts/tenant' },
      { title: 'User', href: '/docs/concepts/user' },
      { title: 'Custom Domain', href: '/docs/concepts/custom-domain' },
    ],
  },
  // {
  //   title: 'Get Started',
  //   links: [
  //     { title: 'Preface', href: '/docs/guides/get-started/preface' },
  //     {
  //       title: 'Sign-Up a tenant',
  //       href: '/docs/guides/get-started/signup',
  //     },
  //     { title: 'Add a Person', href: '/docs/guides/get-started/add-person' },
  //     { title: 'Add an App', href: '/docs/guides/get-started/add-app' },
  //     {
  //       title: 'User Assignment',
  //       href: '/docs/guides/get-started/user-assignment',
  //     },
  //     {
  //       title: 'Try to Login',
  //       href: '/docs/guides/get-started/try-to-login',
  //     },
  //     {
  //       title: 'Recap',
  //       href: '/docs/guides/get-started/recap',
  //     },
  //   ],
  // },
]

export default function DocsLayout({
  children,
  title,
  tableOfContents = [],
}: {
  children: ReactElement
  title: string
  tableOfContents: ITOC[]
}) {
  let router = useRouter()
  const { tenant } = useContext(TenantContext)
  const { setField } = useContext(FieldsContext)
  let isHomePage = router.pathname === '/docs'
  let allLinks = navigation.flatMap((section) => section.links)
  let linkIndex = allLinks.findIndex((link) => link.href === router.pathname)
  let previousPage = allLinks[linkIndex - 1]
  let nextPage = allLinks[linkIndex + 1]
  let section = navigation.find((section) =>
    section.links.find((link) => link.href === router.pathname)
  )

  let currentSection = useTableOfContents(tableOfContents)

  function isActive(section: any) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  useEffect(() => {
    setField('tenant', tenant)
    setField('tenant_domain', tenant?.domains[0])
  }, [tenant])

  return (
    <>
      <div className="relative items-center justify-between pt-6 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200 lg:pt-8">
        <Nav navigation={navigation} />
      </div>

      {isHomePage && <DocsHero />}

      {!isHomePage && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center overflow-hidden">
          <div className="flex w-[108rem] flex-none justify-end">
            <picture>
              <source
                srcSet={require('@/images/beams/docs@30.avif').default.src}
                type="image/avif"
              />
              <img
                src={require('@/images/beams/docs@tinypng.png').default.src}
                alt=""
                className="w-[71.75rem] max-w-none flex-none dark:hidden"
                decoding="async"
              />
            </picture>
            <picture>
              <source
                srcSet={require('@/images/beams/docs-dark@30.avif').default.src}
                type="image/avif"
              />
              <img
                src={
                  require('@/images/beams/docs-dark@tinypng.png').default.src
                }
                alt=""
                className="hidden w-[90rem] max-w-none flex-none dark:block"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      )}
      <div className="bgsm:px-2 relative mx-auto flex max-w-8xl justify-center lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
          <div className="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block" />
          <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-16 pl-0.5">
            <Navigation
              navigation={navigation}
              className="w-64 pr-8 xl:w-72 xl:pr-16"
            />
          </div>
        </div>
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          <article>
            {(title || section) && (
              <header className="mb-9 space-y-1">
                {section && (
                  <p className="font-display text-sm font-medium text-indigo-500 dark:text-sky-400">
                    {section.title}
                  </p>
                )}
                {title && (
                  <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
              </header>
            )}
            <Prose>{children}</Prose>
          </article>
          <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
            {previousPage && (
              <div>
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Previous
                </dt>
                <dd className="mt-1">
                  <Link
                    href={previousPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    <span aria-hidden="true">&larr;</span> {previousPage.title}
                  </Link>
                </dd>
              </div>
            )}
            {nextPage && (
              <div className="ml-auto text-right">
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Next
                </dt>
                <dd className="mt-1">
                  <Link
                    href={nextPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    {nextPage.title} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            {tableOfContents.length > 0 && (
              <>
                <h2
                  id="on-this-page-title"
                  className="font-display text-sm font-medium text-slate-900 dark:text-white"
                >
                  On this page
                </h2>
                <ol role="list" className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <Link
                          href={`#${section.id}`}
                          className={clsx(
                            isActive(section)
                              ? 'text-indigo-500 dark:text-sky-500'
                              : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                          )}
                        >
                          {section.title}
                        </Link>
                      </h3>
                      {section.children?.length > 0 && (
                        <ol
                          role="list"
                          className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                        >
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <Link
                                href={`#${subSection.id}`}
                                className={
                                  isActive(subSection)
                                    ? 'text-indigo-500 dark:text-sky-500'
                                    : 'hover:text-slate-600 dark:hover:text-slate-300'
                                }
                              >
                                {subSection.title}
                              </Link>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </nav>
        </div>
      </div>
      <FooterSlim />
    </>
  )
}
