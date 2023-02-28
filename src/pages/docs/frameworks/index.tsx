import path from 'path'
import glob from 'glob-promise'
import fs from 'fs'
import yaml from 'js-yaml'
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { IFramework } from '@/types'
import { Icon, iconTypes } from '@/components/Icon'
import Link from 'next/link'
const FW_DIR = path.join(process.cwd(), 'frameworks')

interface ISingleFw {
  // this is the metadata of the framework (index.yml)
  frameworkMeta: IFramework
  framework: string
}

export const getStaticProps: GetStaticProps<{
  frameworks: ISingleFw[]
}> = async (context: GetStaticPropsContext<{}>) => {
  // md files are stored in the 'frameworks' directory
  const paths = await glob(path.join(FW_DIR, '*/*.md'))
  const frameworks = paths.map((p) => {
    const parts = p.split(path.sep)
    const framework = parts[parts.length - 2]
    const fwMetaFileName = path.join(FW_DIR, framework + '/index.yml')
    const frameworkMeta = yaml.load(
      fs.readFileSync(fwMetaFileName, 'utf-8')
    ) as IFramework

    return {
      framework,
      frameworkMeta,
    }
  })

  return {
    props: {
      frameworks,
    },
  }
}

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { frameworks } = props

  return (
    <div className="mx-auto max-w-2xl lg:max-w-5xl">
      <header id="header" className="mb-10 md:flex md:items-start">
        <div className="max-w-4xl flex-auto">
          {/* <p className="mb-4 text-sm font-semibold leading-6 text-indigo-500 dark:text-sky-400">
            Frameworks
          </p> */}
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-4xl">
            Get started with Crossid
          </h1>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-400">
            Crossid integrates with many frameworks.
          </p>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-400">
            For guidance, choose the relevant framework.
          </p>
        </div>
      </header>
      <section className="relative mb-16"></section>
      <div className="not-prose mt-16 sm:mt-20">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3"
        >
          {frameworks.map((fw) => (
            <Framework key={fw.frameworkMeta.title} {...fw} />
          ))}
        </ul>
        <div className="dark:prose-dark prose prose-slate mt-16 max-w-3xl">
          <p>{`Don't see your framework of choice? contact us`}</p>
        </div>
      </div>
    </div>
  )
}

const Framework = (props: ISingleFw) => {
  const disabled = false
  const { framework, frameworkMeta } = props
  const { title, tags } = frameworkMeta
  const logo = frameworkMeta.logo as iconTypes

  return (
    <li key={title} className="relative flex flex-row-reverse">
      <div className="group peer ml-6 flex-auto">
        <h4 className="mb-2 font-semibold leading-6 text-slate-900 dark:text-slate-200">
          <Link
            href={`/docs/frameworks/${framework}`}
            className="before:absolute before:-inset-3 before:rounded-2xl"
          >
            {title}
            <svg
              viewBox="0 0 3 6"
              className="ml-3 -mt-px inline h-1.5 w-auto overflow-visible text-slate-400 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100"
            >
              <path
                d="M0 0L3 3L0 6"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </h4>
        <p className="text-sm leading-6 text-slate-700 dark:text-slate-400">
          {frameworkMeta.description}
        </p>
      </div>
      <div className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-md bg-white shadow ring-1 ring-slate-900/5 dark:bg-slate-800 dark:highlight-white/5">
        <Icon icon={logo} className="h-10 w-10" />
      </div>
      <div className="absolute -inset-3 -z-10 rounded-2xl bg-slate-50 opacity-0 peer-hover:opacity-100 dark:bg-slate-800/50" />
    </li>
  )
}
