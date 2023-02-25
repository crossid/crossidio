import {
  IconContainer,
  Caption,
  BigText,
  Paragraph,
  Link,
  Widont,
  InlineCode,
  Tabs,
  TabType,
} from '@/components/home/Common'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { Fragment, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// react
import { lines as reactLoginSample } from '@/samples/react/App.jsx?highlight'
import { lines as reactProtectedRouteSample } from '@/samples/react/ProtectedRoute.jsx?highlight'
import { lines as reactAuthButtonSample } from '@/samples/react/AuthButton.jsx?highlight'

// vue
import { lines as vueMainSample } from '@/samples/vue/main.js?highlight'
import { lines as vueAppSample } from '@/samples/vue/App.vue?highlight'
import { lines as vueCompProtectedSample } from '@/samples/vue/components/Protected.vue?highlight'
import { lines as vueCompUnprotectedSample } from '@/samples/vue/components/Unprotected.vue?highlight'

// javascript
import { lines as jsIndexSample } from '@/samples/javascript/index.html?highlight'

import { CodeWindow, ComponentLink, getClassNameForToken } from '../CodeWindow'
import clsx from 'clsx'
import { GridLockup } from './GridLockup'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'

type FrameworkType = 'React' | 'Vue' | 'Javascript'

export function Frameworks() {
  const [framework, setFramework] = useState<FrameworkType>('React')

  return (
    <section id="frameworks">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <IconContainer
          className="dark:bg-sky-500 dark:highlight-white/20"
          light={require('@/images/icons/home/frameworks.png').default.src}
          dark={require('@/images/icons/home/frameworks-dark.png').default.src}
        />
        <Caption className="text-indigo-500 dark:text-sky-500">
          Framework Driven
        </Caption>
        <BigText>
          <Widont>Any framework, simplified.</Widont>
        </BigText>
        <Paragraph>
          Want to add authentication to your single page application? Whether
          you use <InlineCode>React</InlineCode>, <InlineCode>Vue</InlineCode>{' '}
          or plain <InlineCode>javascript</InlineCode>, we got you covered.
        </Paragraph>
        <Link href="/docs/frameworks" color="sky" darkColor="gray">
          Learn more<span className="sr-only">, reusing styles</span>
        </Link>
        <div className="mt-10">
          <Tabs<FrameworkType>
            tabs={tabItems}
            className="text-indigo-500 dark:text-sky-500"
            iconClassName="dark:text-sky-500 text-indigo-500"
            selected={framework}
            onChange={setFramework}
          />
        </div>
      </div>
      <GridLockup.Container className="mt-10 xl:mt-2" beams={8}>
        <GridLockup.Grid
          left={<AppSample />}
          right={<ComponentExample framework={framework}></ComponentExample>}
        />
      </GridLockup.Container>
    </section>
  )
}

const tabItems: Record<FrameworkType, TabType> = {
  React: (selected: boolean) => (
    <>
      <path
        d="M30.685 27.536c-5.353 9.182-12.462 15.042-15.878 13.089-3.416-1.953-1.846-10.98 3.508-20.161 5.353-9.182 12.462-15.042 15.878-13.089 3.416 1.953 1.846 10.98-3.508 20.161Z"
        fill="currentColor"
        fillOpacity={selected ? '.1' : '0'}
        stroke="currentColor"
        strokeWidth="2"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="7"
        ry="19"
        transform="rotate(90 24 24)"
        fill="currentColor"
        fillOpacity={selected ? '.1' : '0'}
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M17.315 27.536c5.353 9.182 12.462 15.042 15.878 13.089 3.416-1.953 1.846-10.98-3.508-20.161-5.353-9.182-12.462-15.042-15.878-13.089-3.416 1.953-1.846 10.98 3.508 20.161Z"
        fill="currentColor"
        fillOpacity={selected ? '.1' : '0'}
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M24 27a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        fill={selected ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  ),
  Vue: (selected: boolean) => (
    <>
      <path
        d="M24 12.814 20.474 7H15l9 15 9-15h-5.476l-3.525 5.814Z"
        fill="currentColor"
        fillOpacity={selected ? '.1' : '0'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M37.408 7 24 28.982 10.592 7H3l21 34L45 7h-7.592Z"
        fill="currentColor"
        fillOpacity={selected ? '.1' : '0'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </>
  ),
  Javascript: (selected: boolean) => (
    <path
      fill="currentColor"
      fillOpacity={selected ? '.1' : '0'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      d="M45.274,2.325C45.084,2.118,44.817,2,44.536,2H5.464C5.183,2,4.916,2.118,4.726,2.325S4.443,2.81,4.468,3.089l3.52,39.427 c0.037,0.412,0.324,0.759,0.722,0.873l16.01,4.573C24.809,47.987,24.902,48,24.994,48s0.185-0.013,0.274-0.038l16.024-4.573 c0.398-0.114,0.685-0.461,0.722-0.873l3.518-39.427C45.557,2.81,45.463,2.532,45.274,2.325z M12,29.004l7,1.942V11h4v26l-11-3.051 V29.004z M38.054,22L37,34.25L27,37v-4.601l6.75-1.855l0.25-3.75L27,28V11h12l-0.345,4H31v8L38.054,22z"
    />
  ),
}

const tabs: Record<FrameworkType, Record<string, IToken[][]>> = {
  React: {
    'Login.jsx': reactLoginSample,
    'ProtectedRoute.jsx': reactProtectedRouteSample,
    'AuthButton.jsx': reactAuthButtonSample,
  },
  Vue: {
    'main.js': vueMainSample,
    'App.vue': vueAppSample,
    'components/Protected.vue': vueCompProtectedSample,
    'components/Unprotected.vue': vueCompUnprotectedSample,
  },
  Javascript: {
    'index.html': jsIndexSample,
  },
}
function ComponentExample({ framework }: { framework: FrameworkType }) {
  const [activeTab, setActiveTab] = useState(0)
  const lines = tabs[framework][Object.keys(tabs[framework])[activeTab]] || []

  useIsomorphicLayoutEffect(() => {
    setActiveTab(0)
  }, [framework])

  return (
    <CodeWindow border={false}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={framework}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-none overflow-auto whitespace-nowrap"
        >
          <div className="relative min-w-full flex-none px-1">
            <ul className="flex text-sm leading-6 text-slate-400">
              {Object.keys(tabs[framework]).map((tab, tabIndex) => (
                <li key={tab} className="flex-none">
                  <button
                    type="button"
                    className={clsx(
                      'relative py-2 px-3',
                      tabIndex === activeTab
                        ? 'text-sky-300'
                        : 'hover:text-slate-300'
                    )}
                    onClick={() => setActiveTab(tabIndex)}
                  >
                    {tab}
                    {tabIndex === activeTab && (
                      <span className="absolute inset-x-3 bottom-0 z-10 h-px bg-sky-300" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <div className="absolute inset-x-0 bottom-0 h-px bg-slate-500/30" />
          </div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={framework + activeTab}
          className="flex min-h-0 w-full flex-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CodeWindow.Code2 lines={lines.length}>
            {lines.map((tokens, lineIndex) => (
              <Fragment key={framework + activeTab + lineIndex}>
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
                            setActiveTab(
                              Object.keys(tabs[framework]).findIndex((x) =>
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
                            setActiveTab(
                              Object.keys(tabs[framework]).indexOf(tab)
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
            ))}
          </CodeWindow.Code2>
        </motion.div>
      </AnimatePresence>
    </CodeWindow>
  )
}

function AppSample() {
  const [selectedItem, setSelectedItem] = useState('')

  return (
    <div className="relative z-10 my-auto hidden divide-y divide-slate-100 rounded-xl bg-white shadow-xl ring-1 ring-slate-900/5 dark:divide-slate-200/5 dark:bg-slate-800 dark:highlight-white/10 lg:block xl:mt-18">
      <section className="space-y-4 px-4 pt-4 pb-4 sm:px-6 sm:pb-6 lg:px-4 lg:pb-4 xl:px-6 xl:pb-6">
        <header className="flex items-center justify-between">
          <nav className="p-4 text-sm font-medium">
            <ul className="flex space-x-2">
              <li>
                <div
                  className={clsx(
                    'cursor-pointer rounded-md  px-4 py-2 text-slate-400',
                    selectedItem === 'public' &&
                      'bg-indigo-100 text-indigo-700 dark:bg-sky-500 dark:text-slate-100'
                  )}
                  onMouseEnter={() => {
                    setSelectedItem('public')
                  }}
                  onMouseLeave={() => {
                    setSelectedItem('')
                  }}
                >
                  Public
                </div>
              </li>
              <li>
                <div
                  className={clsx(
                    'cursor-pointer rounded-md  px-4 py-2 text-slate-400',
                    selectedItem === 'protected' &&
                      'bg-indigo-100 text-indigo-700 dark:bg-sky-500 dark:text-slate-100'
                  )}
                  onMouseEnter={() => {
                    setSelectedItem('protected')
                  }}
                  onMouseLeave={() => {
                    setSelectedItem('')
                  }}
                >
                  Protected
                </div>
              </li>
            </ul>
          </nav>
          <div
            className={clsx(
              'group flex cursor-pointer items-center rounded-md px-2 py-1 text-xs font-medium hover:bg-indigo-200 hover:text-indigo-800',
              selectedItem === 'signout' &&
                'bg-indigo-100 text-indigo-700 dark:bg-sky-500 dark:text-slate-100'
            )}
            onMouseEnter={() => {
              setSelectedItem('signout')
            }}
            onMouseLeave={() => {
              setSelectedItem('')
            }}
          >
            <ArrowLeftOnRectangleIcon
              width="20"
              height="20"
              className="mr-2 text-indigo-500 group-hover:text-indigo-600 dark:text-sky-500 dark:group-hover:text-sky-100"
            />
            Signout
          </div>
        </header>
        <div>
          <p className="my-14 text-base text-gray-500">
            {selectedItem === 'public' && (
              <span>
                Public is seen by everyone, even if user is not authenticated.
              </span>
            )}
            {selectedItem === 'protected' && (
              <span>Protected is seen only by authenticated users.</span>
            )}
            {selectedItem === 'signout' && <span>Sign user out.</span>}
            {selectedItem === '' && <span>Hover some menu option.</span>}
          </p>
        </div>
      </section>
    </div>
  )
}
