import { gradients } from '@/utils/gradients'
import Icon from '@/img/icons/home/developer.svg'
import { BigText, Caption, IconContainer, InlineCode, Paragraph } from './common'
import { Widont } from '../Widont'
import Link from 'next/link'
import { GradientLockup } from '../GradientLockup'
import { Tabs } from '../Tabs'
import ReactLogo from '@/img/icons/react.svg'
import { LogoutIcon } from '@heroicons/react/outline'
import { MouseEventHandler, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
// @ts-ignore
import { tokenizeWithLines } from '../../macros/tokenize.macro'
import { CodeWindow, getClassNameForToken, Line } from '../CodeWindow'
import { AnimatePresence, AnimateSharedLayout, motion, useIsPresent } from 'framer-motion'
import { usePrevious } from '@/hooks/use-previous'
import clsx from 'clsx'
import { useOnScreen } from '@/hooks/use-on-screen'
import VueLogo from '@/img/icons/vue.svg'
import JSLogo from '@/img/icons/js.svg'

type framework = 'react' | 'vue' | 'js'

const tabs: Record<framework, Record<string, Line[][]>> = {
  react: {
    'App.tsx': tokenizeWithLines.tsx(
      `import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CrossidAuthProvider as AuthProvider } from "@crossid/crossid-react";
import ProtectedRoute from "./ProtectedRoute";
import AuthButton from "./AuthButton";

const redirectTo = window.location.origin +"/"
const App = () => {
  return (
    <AuthProvider
      tenant_id="acme"
      client_id="niqBcdJl9dFjaftlJ0WmI7zHKpi5hyzx"
      redirect_uri={redirectTo}
      post_logout_redirect_uri={redirectTo}
      audience="acme.io"
      scope="openid profile email"
      cache_type="session_storage"
    >
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
          <AuthButton />
          <Switch>
            <Route path="/public">
              <h3>Public</h3>
            </Route>
            <Route path="/protected">
              <ProtectedRoute path="/protected">
                {() => <h3>Protected</h3>}
              </ProtectedRoute>
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;`
    ).lines,
    'ProtectedRoute.tsx': tokenizeWithLines.jsx(
      `import { withAuth } from '@crossid/crossid-react'
import { ComponentType } from 'react'

/**
 * Wrap your component with this one will redirect anonymous visitors to the login page.
 * Your component will be rendered if user is already authenticated.
 */
const ProtectedRoute = ({
    children,
    path,
}: {
    children: ComponentType
    path: string
}) => {
    const returnTo =
        path || window.location.pathname + window.location.search

    const Comp = withAuth(children, { returnTo })
    return <Comp />
}

export default ProtectedRoute      
      `
    ).lines,
    'AuthButton.tsx': tokenizeWithLines.jsx(
      `
import { useAuth, useAuthActions } from '@crossid/crossid-react'

/**
 * A component that renders a signout button or
 * welcome authenticated user.
 */
const AuthButton = () => {
    let { user } = useAuth()
    let { logoutWithRedirect } = useAuthActions()

    return user ? (
        <p>
            Welcome {user.sub}
            <button
                onClick={() => {
                    logoutWithRedirect({})
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
}

export default AuthButton
      `
    ).lines,
  },
  vue: {
    'main.ts': tokenizeWithLines.js(
      `import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Unprotected from "./components/Unprotected.vue";
import Protected from "./components/Protected.vue";
import { create } from "@crossid/vue-wrapper";

async function init() {
  const [AuthProvider, AuthCallback] = await create({
    tenant_id: "acme",
    client_id: "niqBcdJl9dFjaftlJ0WmI7zHKpi5hyzx",
    audience: ["acme.io"],
    scope: "openid profile email",
    redirect_uri: "https://acme.io/callback",
    post_logout_redirect_uri: "https://acme.io",
  });

  const routes = [
    {
      path: "/",
      name: "Unprotected",
      component: Unprotected,
    },
    {
      path: "/protected",
      name: "Protected",
      component: Protected,
    },
    {
      path: "/callback",
      name: "AuthCallback",
      component: AuthCallback,
    },
  ];
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  createApp(App)
    .use(router)
    .component("AuthProvider", AuthProvider)
    .component("AuthCallback", AuthCallback)
    .mount("#app");
}

init();
      `
    ).lines,
    'App.vue': tokenizeWithLines.html(
      `<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <router-view />
</template>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style>
OAuthCallback #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>    
  `
    ).lines,
    'components/Protected.vue': tokenizeWithLines.html(
      `<template>
  <AuthProvider
    v-bind:post_logout_redirect_uri="post_logout_redirect_uri"
    v-slot="{
      user,
      logoutWithRedirect,
      isAuthenticated,
    }"
  >
    <div v-if="isAuthenticated">
      <h1>Hello {{ user.name }}</h1>
      <button v-on:click="logoutWithRedirect({})">
        Logout
      </button>
    </div>
    <div v-else>You are not logged in</div>
  </AuthProvider>
</template>

<script>
export default {
  name: "Protected",
  data() {
    return { post_logout_redirect_uri: window.location.origin };
  },
};
</script>    
  `
    ).lines,
    'components/Unprotected.vue': tokenizeWithLines.html(
      `<template>
  <div>
    <h1>Public Page</h1>
    <router-link to="/protected">Move to protected route</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Unprotected",
});
</script>    
  `
    ).lines,
  },
  js: {
    'index.html': tokenizeWithLines.html(
      `
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/@crossid/crossid-spa-js@0.4.0/dist/crossid-spa-js.js"></script>
  </head>
  <body>
    <!-- clicking on this button starts the signin process -->
    <button id="login">Login</button>
    <button id="logout" style="display: none">Logout</button>
    <!-- will contain the user details once the user signs-in -->
    <p id="profile"></p>
    <script>
      window.onload = async () => {
        // configure the client
        const client = await crossid.newCrossidClient({
          // tenant at crossid.io.
          // for other providers see https://crossid.github.io/crossid-spa-js
          tenant_id: "acme",
          // your oauth2 client_id
          client_id: "niqBcdJl9dFjaftlJ0WmI7zHKpi5hyzx",
          // the audience to request access for
          audience: ["acme.io"],
          // the scopes to be requested
          scope: "openid profile email",
          // where to redirect upon a completion of a successful signin
          redirect_uri: "https://acme.io",
          // where to redirect upon a completion of a successfull logout
          post_logout_redirect_uri: "http://acme.io",
        });

        const qp = new URLSearchParams(window.location.search);
        // if we see in URL a code then it means the user was signed in successfully
        if (qp.has("code")) {
          // completes the flow
          await client.handleRedirectCallback();
          // remove the 'code' query param from URL
          window.history.replaceState(null, document.title, "/");
        }

        document.getElementById("login").addEventListener("click", async () => {
          // redirect browser to the login page
          await client.loginWithRedirect();
        });

        document
          .getElementById("logout")
          .addEventListener("click", async () => {
            // redirect browser to the logout page
            await client.logoutWithRedirect();
          });

        // get user from cache.
        const user = await client.getUser();
        if (user) {
          document.getElementById("login").style.display = "none";
          document.getElementById("profile").innerHTML = \`Hi \${user.name}\`;
          document.getElementById("logout").style.display = "";
        } else {
          document.getElementById(
            "profile"
          ).innerHTML = \`User is not authenticated, please login.\`;
        }
      };
    </script>
  </body>
</html>
      `
    ).lines,
  },
}

// lineRanges maps framework to key -> lines where:
// key is the page name:token -> from -> to lines to highlight
const lineRanges: Record<framework, Record<string, number[]>> = {
  react: {
    'App.tsx:public-btn-hover': [29, 31],
    'App.tsx:protected-btn-hover': [32, 36],
    'AuthButton.tsx:signout-btn-hover': [14, 20],
  },
  vue: {
    'components/Unprotected.vue:public-btn-hover': [0, 6],
    'components/Protected.vue:protected-btn-hover': [1, 16],
    'components/Protected.vue:signout-btn-hover': [9, 14],
  },
  js: {
    'index.html:public-btn-hover': [54, 57],
    'index.html:protected-btn-hover': [58, 62],
    'index.html:signout-btn-hover': [45, 50],
  },
}

const elements: Record<framework, { [e: string]: string }> = {
  react: {
    public: 'App.tsx:public-btn-hover',
    protected: 'App.tsx:protected-btn-hover',
    signout: 'AuthButton.tsx:signout-btn-hover',
  },
  vue: {
    public: 'components/Unprotected.vue:public-btn-hover',
    protected: 'components/Protected.vue:protected-btn-hover',
    signout: 'components/Protected.vue:signout-btn-hover',
  },
  js: {
    public: 'index.html:public-btn-hover',
    protected: 'index.html:protected-btn-hover',
    signout: 'index.html:signout-btn-hover',
  },
}

export function Developer() {
  const [framework, setFramework] = useState<framework>('react')
  const [states, setStates] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState('')
  const ref: any = useRef<HTMLDivElement>()
  const observe: boolean = useOnScreen<HTMLDivElement>(ref, '-20px')
  const [play, setPlay] = useState(true)

  useEffect(() => {
    if (play && observe && framework === 'react') {
      const keys = Object.keys(elements[framework])
      const idx = keys.findIndex((f) => f === selectedItem)
      const nextIdx = idx === keys.length - 1 ? 0 : idx + 1
      const timeoutID = window.setTimeout(() => {
        setSelectedItem(keys[nextIdx])
        setStates((states) => [elements[framework][keys[nextIdx]]])
      }, 4000)

      return () => {
        window.clearTimeout(timeoutID)
      }
    }
  }, [selectedItem, play, observe, framework])

  return (
    <section id="developer" ref={ref}>
      <div className="px-4 sm:px-6 md:px-8 mb-10 sm:mb-16 md:mb-20 mt-8 lg:mt-24">
        <IconContainer className={`${gradients.indigo[0]} mb-8`}>
          <Icon />
        </IconContainer>
        <Caption as="h2" className="text-indigo-600 mb-3">
          Developer
        </Caption>
        <BigText className="mb-8">
          <Widont>Integrate, seamlessly.</Widont>
        </BigText>
        <Paragraph className="mb-6">
          Want to add authentication to your single page application? Whether you use{' '}
          <InlineCode>React</InlineCode>,<InlineCode>Vue</InlineCode> or plain{' '}
          <InlineCode>javascript</InlineCode>, we got you covered.
        </Paragraph>
        <Link href="/docs/extracting-components">
          <a className="text-indigo-600 hover:text-indigo-800">Learn more -&gt;</a>
        </Link>
      </div>
      <GradientLockup
        color="indigo"
        rotate={2}
        header={
          <div className="flex overflow-auto py-0.5 pl-0.5 -my-0.5 -mx-4 sm:-mx-6 md:-mx-8 xl:-ml-4 xl:mr-0">
            <Tabs
              tabs={{
                react: (
                  <div className="flex flex-col items-center py-1">
                    <ReactLogo className="mb-2" />
                    React
                  </div>
                ),
                vue: (
                  <div className="flex flex-col items-center py-1">
                    <VueLogo className="mb-2" />
                    Vue
                  </div>
                ),
                js: (
                  <div className="flex flex-col items-center py-1">
                    <JSLogo className="mb-2" />
                    Javascript
                  </div>
                ),
              }}
              grid={true}
              spacing="loose"
              selected={framework}
              onChange={(tab: any) => {
                setSelectedItem('')
                setFramework(tab)
              }}
              className="mx-auto xl:mx-0 px-4 sm:px-6 md:px-8 xl:px-0"
            />
          </div>
        }
        left={
          <div className="relative z-10 bg-white rounded-tl-xl sm:rounded-t-xl lg:rounded-xl shadow-lg lg:-mr-8 divide-y divide-gray-100">
            <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
              <header className="flex items-center justify-between">
                <nav className="p-4 text-sm font-medium">
                  <ul className="flex space-x-2">
                    <li>
                      <div
                        className={clsx(
                          'px-4 py-2 rounded-md cursor-pointer',
                          selectedItem === 'public' && 'text-indigo-700 bg-indigo-100'
                        )}
                        onMouseEnter={() => {
                          setPlay(false)
                          setStates((states) => [elements[framework]['public']])
                          setSelectedItem('public')
                        }}
                        onMouseLeave={() => {
                          setStates((states) =>
                            states.filter((x) => x !== elements[framework]['public'])
                          )
                        }}
                      >
                        Public
                      </div>
                    </li>
                    <li>
                      <div
                        className={clsx(
                          'px-4 py-2 rounded-md cursor-pointer',
                          selectedItem === 'protected' && 'text-indigo-700 bg-indigo-100'
                        )}
                        onMouseEnter={() => {
                          setPlay(false)
                          setStates((states) => [elements[framework]['protected']])
                          setSelectedItem('protected')
                        }}
                        onMouseLeave={() => {
                          setStates((states) =>
                            states.filter((x) => x !== elements[framework]['protected'])
                          )
                        }}
                      >
                        Protected
                      </div>
                    </li>
                  </ul>
                </nav>
                <div
                  className={clsx(
                    'hover:bg-indigo-200 hover:text-indigo-800 group flex items-center rounded-md text-xs font-medium px-2 py-1 cursor-pointer',
                    selectedItem === 'signout' && 'text-indigo-700 bg-indigo-100'
                  )}
                  onMouseEnter={() => {
                    setPlay(false)
                    setStates((states) => [elements[framework]['signout']])
                    setSelectedItem('signout')
                  }}
                  onMouseLeave={() => {
                    setStates((states) =>
                      states.filter((x) => x !== elements[framework]['signout'])
                    )
                  }}
                >
                  <LogoutIcon
                    width="20"
                    height="20"
                    className="group-hover:text-indigo-600 text-indigo-500 mr-2"
                  />
                  Signout
                </div>
              </header>
              <div>
                <p className="my-14 text-base text-gray-500">
                  {selectedItem === 'public' && (
                    <span>Public is seen by everyone, even if user is not authenticated.</span>
                  )}
                  {selectedItem !== 'public' && (
                    <span>Protected is seen only by authenticated users.</span>
                  )}
                  {selectedItem === 'signout' && <span>Sign users.</span>}
                </p>
              </div>
            </section>
          </div>
        }
        right={<CodeExample framework={framework} states={states} />}
      />
    </section>
  )
}

function TabBar({ children }: { children: ReactNode }) {
  const isPresent = useIsPresent()
  return (
    <motion.ul
      initial={{ y: '100%' }}
      animate={{ y: '0%' }}
      exit={{ y: '-100%' }}
      transition={{ type: 'spring', mass: 0.4 }}
      className={`${isPresent ? '' : 'absolute top-0 left-0 w-full'} flex text-sm text-indigo-300`}
    >
      {children}
    </motion.ul>
  )
}

function ComponentLink({
  onClick,
  children,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>
  children: JSX.Element
}) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const modifier = e.ctrlKey || e.shiftKey || e.altKey || e.metaKey
      if (!active && modifier) {
        setActive(true)
      } else if (active && !modifier) {
        setActive(false)
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKey)
    }
  }, [active])

  return active ? (
    <button type="button" className="hover:underline" onClick={onClick}>
      {children}
    </button>
  ) : (
    children
  )
}

function CodeExample({ framework, states }: { framework: framework; states: string[] }) {
  const [activeTab, setActiveTab] = useState(0)
  const lines = tabs[framework][Object.keys(tabs[framework])[activeTab]]
  const codeContainerRef = useRef<HTMLDivElement>(null)
  // const linesContainerRef = useRef<HTMLElement>()
  const [linesRef, setLinesRef] = useState<HTMLElement>()
  const linesContainerRef = useCallback((node) => {
    setLinesRef(node)
  }, [])

  const prevStates = usePrevious<string[]>(states)

  function scrollTo(tab: string, rangeOrRanges: any) {
    const tabIdx = Object.keys(tabs[framework]).indexOf(tab)
    if (activeTab !== tabIdx) {
      setActiveTab(tabIdx)
    }

    const ranges = Array.isArray(rangeOrRanges) ? rangeOrRanges : [rangeOrRanges]
    if (ranges.length === 0) return
    const linesSorted = ranges.flat().sort((a, b) => a - b)
    const minLine = linesSorted[0]
    const maxLine = linesSorted[linesSorted.length - 1]
    const lines = linesRef?.children

    if (lines) {
      const containerHeight = codeContainerRef.current?.offsetHeight || 0
      const top = (lines[minLine] as HTMLElement)?.offsetTop
      const maxEl = lines[maxLine] as HTMLElement
      const height = maxEl?.offsetTop + maxEl?.offsetHeight - top

      codeContainerRef.current?.scrollTo({
        top: top - containerHeight / 2 + height / 2,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (prevStates && prevStates?.length > states.length) {
    } else if (states.length) {
      if (states.length) {
        const sp = states[states.length - 1]
        scrollTo(sp.split(':')[0], lineRanges[framework][sp])
      }
    }
  }, [states, prevStates, linesRef])

  useEffect(() => {
    setActiveTab(0)
  }, [framework])

  // this is a hack: when moving between frameworks, it takes a moment for the activeTab to be reset
  // so if we click Vue -> select some item (Protected) then move to Javascript, we'll get here
  if (!lines) {
    return null
  }

  const lineClasses = (lineIndex: number): string => {
    switch (framework) {
      case 'react': {
        return (states.includes('App.tsx:public-btn-hover') &&
          lineIndex >= lineRanges[framework]['App.tsx:public-btn-hover'][0] &&
          lineIndex <= lineRanges[framework]['App.tsx:public-btn-hover'][1]) ||
          (states.includes('App.tsx:protected-btn-hover') &&
            lineIndex >= lineRanges[framework]['App.tsx:protected-btn-hover'][0] &&
            lineIndex <= lineRanges[framework]['App.tsx:protected-btn-hover'][1]) ||
          (states.includes('AuthButton.tsx:signout-btn-hover') &&
            lineIndex >= lineRanges[framework]['AuthButton.tsx:signout-btn-hover'][0] &&
            lineIndex <= lineRanges[framework]['AuthButton.tsx:signout-btn-hover'][1])
          ? 'not-mono'
          : ''
      }
      case 'vue': {
        return (states.includes('components/Unprotected.vue:public-btn-hover') &&
          lineIndex >= lineRanges[framework]['components/Unprotected.vue:public-btn-hover'][0] &&
          lineIndex <= lineRanges[framework]['components/Unprotected.vue:public-btn-hover'][1]) ||
          (states.includes('components/Protected.vue:protected-btn-hover') &&
            lineIndex >= lineRanges[framework]['components/Protected.vue:protected-btn-hover'][0] &&
            lineIndex <=
              lineRanges[framework]['components/Protected.vue:protected-btn-hover'][1]) ||
          (states.includes('components/Protected.vue:signout-btn-hover') &&
            lineIndex >= lineRanges[framework]['components/Protected.vue:signout-btn-hover'][0] &&
            lineIndex <= lineRanges[framework]['components/Protected.vue:signout-btn-hover'][1])
          ? 'not-mono'
          : ''
      }
      case 'js': {
        return (states.includes('index.html:public-btn-hover') &&
          lineIndex >= lineRanges[framework]['index.html:public-btn-hover'][0] &&
          lineIndex <= lineRanges[framework]['index.html:public-btn-hover'][1]) ||
          (states.includes('index.html:protected-btn-hover') &&
            lineIndex >= lineRanges[framework]['index.html:protected-btn-hover'][0] &&
            lineIndex <= lineRanges[framework]['index.html:protected-btn-hover'][1]) ||
          (states.includes('index.html:signout-btn-hover') &&
            lineIndex >= lineRanges[framework]['index.html:signout-btn-hover'][0] &&
            lineIndex <= lineRanges[framework]['index.html:signout-btn-hover'][1])
          ? 'not-mono'
          : ''
      }
    }
  }

  return (
    <CodeWindow className="bg-indigo-500">
      <div className="flex-none relative overflow-auto whitespace-nowrap">
        <AnimateSharedLayout>
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 flex text-sm font-medium text-transparent pointer-events-none select-none"
          >
            {Object.keys(tabs[framework]).map((tab, tabIndex) => (
              <div
                key={tabIndex}
                className="flex-none relative py-2 px-4 border border-transparent"
              >
                {tabIndex === activeTab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -inset-px bg-white bg-opacity-10"
                  />
                )}
                {tab}
              </div>
            ))}
          </div>
        </AnimateSharedLayout>
        <AnimatePresence initial={false}>
          <TabBar key={framework}>
            {Object.keys(tabs[framework]).map((tab, tabIndex) => (
              <li key={tab} className="flex-none">
                <button
                  type="button"
                  className={`border border-transparent py-2 px-4 font-medium focus:outline-none hover:text-indigo-100 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-indigo-300 ${
                    tabIndex === activeTab ? 'text-indigo-200' : ''
                  }`}
                  onClick={() => setActiveTab(tabIndex)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </TabBar>
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={framework + activeTab}
          className="w-full flex-auto flex min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CodeWindow.Code2 ref={codeContainerRef} lines={lines.length}>
            <div
              key={framework + activeTab}
              ref={linesContainerRef}
              className={clsx('mono', { 'mono-active': states.length > 0 })}
            >
              {lines.map((tokens, lineIndex) => (
                <div key={framework + activeTab + lineIndex} className={lineClasses(lineIndex)}>
                  {tokens.map((token, tokenIndex) => {
                    if (
                      (token.types[token.types.length - 1] === 'class-name' ||
                        (token.types[token.types.length - 1] === 'tag' &&
                          /^([A-Z]|x-)/.test(token.content))) &&
                      tokens[tokenIndex - 1]?.types[tokens[tokenIndex - 1].types.length - 1] ===
                        'punctuation' //&&
                      // (tokens[tokenIndex - 1]?.content === '<' ||
                      // tokens[tokenIndex - 1].content === '</')
                    ) {
                      return (
                        <span key={tokenIndex} className={getClassNameForToken(token)}>
                          <ComponentLink
                            onClick={() =>
                              setActiveTab(
                                Object.keys(tabs[framework]).findIndex((x) =>
                                  x.startsWith(`${token.content.replace(/^x-/, '')}.`)
                                )
                              )
                            }
                          >
                            <span>{token.content}</span>
                          </ComponentLink>
                        </span>
                      )
                    }

                    if (
                      token.types[token.types.length - 1] === 'string' &&
                      // /^(['"`])\.\/.*?\.(jsx|tsx|vue)\1$/.test(token.content)
                      /^(['"`])\.\/.*?\1$/.test(token.content)
                    ) {
                      let tab = token.content.substr(3, token.content.length - 4)
                      if (framework === 'react') {
                        tab += '.tsx'
                      }

                      return (
                        <span key={tokenIndex} className={getClassNameForToken(token)}>
                          {token.content.substr(0, 1)}
                          <button
                            type="button"
                            className="underline"
                            onClick={() => setActiveTab(Object.keys(tabs[framework]).indexOf(tab))}
                          >
                            ./{tab}
                          </button>
                          {token.content.substr(0, 1)}
                        </span>
                      )
                    }

                    return (
                      <span key={tokenIndex} className={getClassNameForToken(token)}>
                        {token.content}
                      </span>
                    )
                  })}
                  {'\n'}
                </div>
              ))}
            </div>
          </CodeWindow.Code2>
        </motion.div>
      </AnimatePresence>
    </CodeWindow>
  )
}
