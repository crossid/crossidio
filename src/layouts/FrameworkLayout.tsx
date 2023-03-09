import { CodeWindow } from '@/components/CodeWindow'
import { Prose } from '@/components/Prose'
import { useActiveElement } from '@/hooks/useActiveElement'
import { ICode, IProps } from '@/pages/docs/frameworks/[framework]'
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import Markdoc from '@markdoc/markdoc'
import clsx from 'clsx'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import FooterSlim from '@/components/FooterSlim'
import Nav from '@/components/Nav'
import Link from 'next/link'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Logo } from '@/components/Logo'
import { IFramework } from '@/types'
import { useScrollPosition } from '@/hooks/usePositionScroll'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@/components/Icon'
import Head from 'next/head'
import { formatDate, MACHINE_FORMAT } from '@/utils/date'
import { useAuth } from '@crossid/crossid-react'
import { FieldsContext } from '@/hooks/useFieldsContext'
import { Field } from '@/components/markdoc/InlineInput'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { resolveCode } from '@/utils/code'
import { TenantContext } from '@/hooks/tenant'
import { Breadcrumb } from '@/components/Breadcrumb'
import { AppConfigurator } from '@/components/ConfigureApp'
import { LinkNode } from '@/components/markdoc/Link'
import { Callout } from '@/components/Callout'
import { FenceClient } from '@/components/Fence'
import { codeStyles } from '@/utils/prism/styles'
import DownloadSampleButton from '@/components/DownloadSample'
import { FrameworkApiRefLink } from '@/components/markdoc/FrameworkApiRefLink'
import { scroll } from '@/utils/scroll'
import { useRouter } from 'next/router'

const Heading: React.FC<
  {
    tag: keyof JSX.IntrinsicElements
    level: number
  } & React.HTMLAttributes<HTMLOrSVGElement>
> = ({ tag: Head, level, ...rest }) => {
  if (level === 1) {
    Head = 'h1'
  } else if (level === 2) {
    Head = 'h2'
  } else if (level === 3) {
    Head = 'h3'
  }

  let classes
  if (level === 1) {
    classes = '[counter-reset:h2counter]'
  } else if (level === 2) {
    classes =
      '[counter-increment:h2counter] before:content-[counter(h2counter)] before:inline-flex dark:before:bg-sky-500 before:mr-2 before:rounded-md before:bg-indigo-600 before:px-2 before:py-1 before:font-bold before:leading-none before:text-white scroll-mt-16'
  }

  return <Head {...rest} className={classes} />
}

// TODO we need to share the same components as with other markdoc renderers
const components = {
  Heading,
  Field,
  Link: LinkNode,
  Callout,
  FenceClient,
  FrameworkApiRefLink,
}

type Comp = 'code' | 'configure-app'

export default function Layout(props: IProps) {
  const {
    articleContent,
    codes,
    frameworkMeta,
    framework,
    articleFrontmatter,
    host,
    timeToRead,
  } = props
  const { loginWithRedirect, signupWithRedirect, idToken } = useAuth()
  const { fields, setField, setFields } = useContext(FieldsContext)
  const { tenant, setApp } = useContext(TenantContext)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const parsedContent = JSON.parse(articleContent)
  const [activeElement] = useActiveElement('h2', containerRef, scrollerRef, 80)
  const comp = activeElement?.getAttribute('component') as Comp
  let dataAll = activeElement?.getAttribute('data')?.split('#')
  let activeElementSection = activeElement?.getAttribute('section')
  const scrollPos = useScrollPosition()

  let data
  let dataMeta
  if (dataAll) {
    data = dataAll[0]
    if (dataAll.length > 0) {
      dataMeta = dataAll[1]
    }
  }

  useEffect(() => {
    setField('tenant', tenant)
    setField('tenant_domain', tenant?.domains[0])
  }, [tenant])

  return (
    <>
      <Head>
        <title>{frameworkMeta.title}</title>
        <meta name="og:title" content={articleFrontmatter.title} />
        {articleFrontmatter.description && (
          <meta name="description" content={articleFrontmatter.description} />
        )}
        {articleFrontmatter.description && (
          <meta
            name="og:description"
            content={articleFrontmatter.description}
          />
        )}
        <meta name="og:url" content={`${host}/docs/frameworks/${framework}`} />
        {/*TODO og:image and twitter:image */}
        <meta property="og:type" content="article" />
        <meta
          property="article:tag"
          content={`${articleFrontmatter.tags.join(',')}`}
        />
        <meta
          property="article:author"
          content={`https://github.com/${articleFrontmatter.authors[0].github}`}
        />
        {articleFrontmatter.date && (
          <meta
            property="article:published_time"
            content={formatDate(articleFrontmatter.date, MACHINE_FORMAT)}
          />
        )}
      </Head>
      <Nav />
      <AnimatePresence initial={false} mode="wait">
        {scrollPos > 60 && (
          <motion.div
            key={framework}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-10"
          >
            <NavBar
              scrollerRef={scrollerRef}
              containerRef={containerRef}
              activeElementId={activeElement?.id || ''}
              frameworkMeta={frameworkMeta}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bgsm:px-2 relative mx-auto mt-8 flex max-w-8xl justify-center scroll-smooth lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 items-start gap-4 lg:gap-8 xl:grid-cols-2">
          <div className="grid grid-cols-1 gap-4 lg:col-span-1">
            <Breadcrumb
              pages={[
                {
                  title: 'Frameworks',
                  href: '/docs/frameworks',
                  current: false,
                },
                {
                  title: frameworkMeta.title,
                  href: `/${framework}`,
                  current: true,
                },
              ]}
            />
            <article>
              <header className="mb-9 space-y-1 py-8">
                <p className="font-display text-sm font-medium text-indigo-500 dark:text-sky-500">
                  {articleFrontmatter.title}
                </p>
                <h1 className="font-display text-2xl tracking-tight text-slate-600 dark:text-white">
                  {articleFrontmatter.description}
                </h1>
                <p className="py-1 text-sm text-slate-600 dark:text-slate-500">
                  {timeToRead} minutes reading
                </p>
              </header>
              <Prose>
                <div id="container" ref={containerRef}>
                  {Markdoc.renderers.react(parsedContent, React, {
                    components,
                  })}
                </div>
              </Prose>
            </article>
          </div>
          <div className="sticky top-40 hidden grid-cols-1 gap-4 xl:grid">
            {comp === 'configure-app' && !idToken && (
              <LoginOrSignup
                loginFunc={loginWithRedirect}
                signupFunc={signupWithRedirect}
              />
            )}
            {idToken && (
              <>
                {fields && fields.app && (
                  <div className={clsx(comp === 'configure-app' && 'hidden')}>
                    Configured for app{' '}
                    <a
                      href={`#configure-crossid`}
                      style={{ top: '-30px' }}
                      className="border-b-2 border-dashed border-indigo-400 font-bold text-gray-500 dark:border-sky-400 dark:text-slate-400"
                    >
                      {fields.app.displayName}
                    </a>
                  </div>
                )}
                <AppConfigurator
                  className={clsx(comp !== 'configure-app' && 'hidden')}
                  framework={frameworkMeta}
                  onChange={(app) => {
                    if (app) {
                      setFields({
                        app: app,
                        client_id: app.clientId,
                        login_redirect_uri: app.loginUri,
                        logout_redirect_uri: app.logoutUri,
                        cors_origin: app.corsOrigin,
                      })
                      setApp(app)
                    }
                  }}
                />
              </>
            )}
            {comp === 'code' && (
              <Code
                codes={codes}
                currentFileName={data || ''}
                meta={dataMeta}
                fields={fields || {}}
                section={activeElementSection || ''}
              />
            )}
          </div>
        </div>
      </div>
      <FooterSlim />
    </>
  )
}

function Code({
  codes,
  section,
  currentFileName,
  meta,
  fields,
  showLineNumbers = true,
}: {
  codes: ICode[]
  section: string
  currentFileName: string
  meta: string | undefined
  fields: Record<string, any>
  showLineNumbers?: boolean
}) {
  const [activeFilename, setActiveFilename] = useState<string | undefined>(
    currentFileName
  )
  const [code, setCode] = useState<ICode>()
  const [resolvedCode, setResolvedCode] = useState('')

  const filenames = codes.map((c) => c.frontmatter.name)

  useIsomorphicLayoutEffect(() => {
    setActiveFilename(currentFileName)
  }, [currentFileName])

  useIsomorphicLayoutEffect(() => {
    let singleCode = codes.filter(
      (c) => c.frontmatter.name === activeFilename
    )[0]
    setCode(singleCode)
    setResolvedCode(resolve(singleCode, fields))
  }, [activeFilename, fields.client_id])

  useEffect(() => {
    const cont = document.getElementById('code-container')
    const el = document.getElementById(`section:${section}`)
    if (el && cont) {
      scroll(cont, el, 0.5, 80)
    }
  }, [section])

  const resolve = (code: ICode, fields: Record<string, any>) => {
    return resolveCode(code.code, fields)
  }

  if (!code) return null

  // const highlighted = highligtedCodebyMarkdownMeta(meta || '')

  return (
    <CodeWindow border={false} className="xl:h-[50rem]">
      {/* <div className="relative min-w-full flex-none px-1"> */}
      <div className="flex justify-between px-1">
        <ul className="flex text-sm leading-6 text-slate-400">
          {filenames.map((tab) => (
            <li key={tab} className="flex-none">
              <button
                type="button"
                className={clsx(
                  'relative py-2 px-3',
                  tab === activeFilename
                    ? 'text-sky-300'
                    : 'hover:text-slate-300'
                )}
                onClick={() => setActiveFilename(tab)}
              >
                {tab}
                {tab === activeFilename && (
                  <span className="absolute inset-x-3 bottom-0 z-10 h-px bg-sky-300" />
                )}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mr-3 inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-700 dark:ring-offset-slate-900 dark:hover:bg-slate-800 dark:focus:ring-sky-500"
          onClick={() => {
            if (resolvedCode) navigator.clipboard.writeText(resolvedCode)
          }}
        >
          <DocumentDuplicateIcon
            className="-ml-0.5 mr-2 h-4 w-4"
            aria-hidden="true"
          />
          Copy
        </button>
        <div className="absolute inset-x-0 bottom-0 h-px bg-slate-500/30" />
      </div>
      <div
        id="code-container"
        className={'flex min-h-0 w-full flex-auto overflow-auto'}
      >
        {resolvedCode && (
          <Highlight
            {...defaultProps}
            code={resolvedCode}
            theme={undefined}
            // language={code.frontmatter.lang as Language}
            language={'jsx'}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={clsx(
                  'flex min-h-full text-sm leading-6',
                  code.frontmatter.lang && `language-${code.frontmatter.lang}`
                )}
                style={style}
              >
                {showLineNumbers && (
                  <div
                    aria-hidden="true"
                    // todo: in CodeWindow we have p-4 here it harms the lines alignment
                    className="hidden w-[3.125rem] flex-none select-none px-2 py-2 pr-4 text-right text-slate-600 md:block"
                  >
                    {Array.from(tokens).map((_, i) =>
                      i === 0 ? (
                        i + 1
                      ) : (
                        <Fragment key={i}>
                          <br />
                          {i + 1}
                        </Fragment>
                      )
                    )}
                  </div>
                )}
                <code className="px-2 py-2">
                  {tokens.map((line, lineIndex) => {
                    const lineProps = getLineProps({ line, key: lineIndex })
                    const hidx = code.sections[section]?.indexOf(lineIndex)
                    if (hidx > -1) {
                      lineProps.className += ` ${codeStyles.highlighted}`
                      if (hidx === 0) {
                        lineProps.id = `section:${section}`
                      }
                    }
                    return (
                      <div key={lineIndex} {...lineProps}>
                        {line.map((token, tokenIndex) => (
                          <span
                            key={tokenIndex}
                            {...getTokenProps({ token })}
                          />
                        ))}
                      </div>
                    )
                  })}
                </code>
              </pre>
            )}
          </Highlight>
        )}
        {/* <CodeWindow.Code2 lines={lines.length}>
          {lines.map((tokens, lineIndex) => {
            tokens = resolveLine(tokens)
            return (
              <Fragment key={lineIndex}>
                {tokens.map((token: IToken, tokenIndex: number) => {
                  if (
                    (token.types[token.types.length - 1] === 'class-name' ||
                      (token.types[token.types.length - 1] === 'tag' &&
                        /^([A-Z]|x-)/.test(token.content))) &&
                    tokens[tokenIndex - 1]?.types[
                      tokens[tokenIndex - 1].types.length - 1
                    ] === 'punctuation' &&
                    (tokens[tokenIndex - 1]?.content === '<' ||
                      tokens[tokenIndex - 1].content === '</')
                  ) {
                    return (
                      <span
                        key={tokenIndex}
                        className={getClassNameForToken(token)}
                      >
                        <ComponentLink
                          onClick={() =>
                            setActiveFilename(
                              filenames.find((x) =>
                                x.startsWith(
                                  `${token.content.replace(/^x-/, '')}.`
                                )
                              )
                            )
                          }
                        >
                          {token.content}
                        </ComponentLink>
                      </span>
                    )
                  }

                  if (
                    token.types[token.types.length - 1] === 'string' &&
                    /^(['"`])\.\/.*?\.(js|vue|jsx|tsx)\1$/.test(token.content)
                  ) {
                    const tab = token.content.substr(
                      3,
                      token.content.length - 4
                    )
                    return (
                      <span
                        key={tokenIndex}
                        className={getClassNameForToken(token)}
                      >
                        {token.content.substr(0, 1)}
                        <button
                          type="button"
                          className="underline"
                          onClick={() =>
                            setActiveFilename(
                              // Object.keys(filenames[framework]).indexOf(tab)
                              'TODO'
                            )
                          }
                        >
                          ./{tab}
                        </button>
                        {token.content.substr(0, 1)}
                      </span>
                    )
                  }

                  return (
                    <span
                      key={tokenIndex}
                      className={getClassNameForToken(token)}
                    >
                      {token.content}
                    </span>
                  )
                })}
                {'\n'}
              </Fragment>
            )
          })}
        </CodeWindow.Code2> */}
      </div>
    </CodeWindow>
  )
}

function LoginOrSignup({
  loginFunc,
  signupFunc,
}: {
  loginFunc: (opts: any) => void
  signupFunc: (opts: any) => void
}) {
  const router = useRouter()
  return (
    <div className="py-24 px-6 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h3 className="text-3xl font-normal tracking-tight">
          <button
            onClick={() => loginFunc({})}
            className="text-indigo-500 dark:text-sky-500"
          >
            Login
          </button>{' '}
          your account or{' '}
          <button
            onClick={() => signupFunc({})}
            className="text-indigo-500 dark:text-sky-500"
          >
            signup
          </button>{' '}
          a new account to configure your app directly from this tour.
        </h3>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={`/signup?return_to=${router.asPath}`}
            className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-sky-600 dark:hover:bg-sky-700"
          >
            Signup
          </Link>
          <button
            onClick={() => loginFunc({})}
            className="tetext-base font-semibold leading-7 text-gray-900"
          >
            Login
          </button>{' '}
        </div>
      </div>
    </div>
  )
}

interface ISection {
  id: string
  title: string
}

function NavBar({
  activeElementId,
  containerRef,
  scrollerRef,
  frameworkMeta,
}: {
  activeElementId: string
  containerRef: React.RefObject<HTMLDivElement>
  scrollerRef: React.RefObject<HTMLDivElement>
  frameworkMeta: IFramework
}) {
  const [sections, setSections] = useState<ISection[]>([])
  useEffect(() => {
    const sections: ISection[] = []
    const elements = containerRef.current?.querySelectorAll('h2')
    if (!elements) return
    for (let i = 0; i < elements.length; i++) {
      sections.push({ id: elements[i].id, title: elements[i].innerHTML })
    }
    setSections(sections)
  }, [containerRef])

  const activeSection = sections.filter((s) => s.id === activeElementId)[0]

  return (
    <Disclosure as="nav" className="bg-white dark:bg-slate-900">
      {({ open }) => (
        <>
          <div
            ref={scrollerRef}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Logo />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <Menu
                    as="div"
                    className="relative  items-center px-1 pt-1 text-sm font-medium"
                  >
                    <div>
                      <Menu.Button className="inline-flex text-lg font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-white dark:ring-offset-slate-900 dark:focus:ring-sky-500">
                        <span className="sr-only">Open sections</span>
                        {activeSection?.title}
                        <ChevronDownIcon
                          className="ml-2 -mr-1 h-7 w-7 text-violet-200 hover:text-violet-100"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2  w-96 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-900">
                        {sections.map((section, sectionIndex) => (
                          <Menu.Item key={section.id}>
                            {({ active }) => (
                              <a
                                href={`#${section.id}`}
                                className={clsx(
                                  active ? 'bg-gray-100 dark:bg-slate-800' : '',
                                  ' block px-4 py-2 text-lg text-gray-600 dark:text-slate-300'
                                )}
                              >
                                <div className="item-center flex">
                                  {/* <span className="mr-2 inline-flex rounded-full bg-indigo-600 px-3 py-1 font-bold text-white before:leading-none dark:before:bg-sky-500">
                                    {sectionIndex + 1}
                                  </span> */}
                                  <span className="mr-2 inline-flex items-center justify-center rounded-full bg-indigo-600 px-2 py-1 text-xs font-bold leading-none text-white dark:bg-sky-500 dark:text-white dark:before:bg-sky-500">
                                    {sectionIndex + 1}
                                  </span>
                                  {section.title}
                                </div>
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="flex-shrink-0">
                  <a
                    href={frameworkMeta.sample_repo.url}
                    target="_blank"
                    rel="noreferrer"
                    type="button"
                    className="mr-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:ring-offset-slate-900 dark:focus:ring-sky-500"
                  >
                    <Icon
                      icon="github"
                      color="gray"
                      className="-ml-1 mr-2 h-5 w-5"
                    />
                    <span>Samples Repo</span>
                  </a>
                  <DownloadSampleButton
                    repoName={`${frameworkMeta.sample_repo.owner}/${frameworkMeta.sample_repo.name}`}
                    folderName={
                      frameworkMeta.sample_repo.folders.filter(
                        (f) => f.type === 'auth'
                      )[0].name
                    }
                    className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-sky-500 dark:ring-offset-slate-900 dark:hover:bg-sky-700 dark:focus:ring-sky-500"
                  />
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-slate-800 dark:focus:ring-sky-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {sections.map((section) => (
                <Disclosure.Button
                  key={section.id}
                  as="a"
                  href={`#${section.id}`}
                  className={clsx(
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium text-gray-500  dark:bg-slate-900 dark:text-slate-400',
                    section.id === activeElementId
                      ? 'border-indigo-500 dark:border-sky-500'
                      : 'border-gray-300 dark:border-slate-800'
                  )}
                >
                  {section.title}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href={frameworkMeta.sample_repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Repo
                </Disclosure.Button>
                {/* <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Download Sample
                </Disclosure.Button> */}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
