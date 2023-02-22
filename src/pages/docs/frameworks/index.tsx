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
import clsx from 'clsx'
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
      <div className="mt-16 sm:mt-20">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {frameworks.map((fw) => (
            <Framework key={fw.frameworkMeta.title} {...fw} />
          ))}
        </ul>
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
    <li className="relative items-center rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2  hover:shadow-md dark:border-slate-600 dark:ring-offset-slate-900 dark:focus-within:ring-sky-500">
      <div className="flex space-x-5 px-6 py-5">
        <div className="flex-shrink-0">
          <Icon icon={logo} className="h-10 w-10" />
        </div>
        <div
          className={clsx('min-w-0 flex-1', disabled && 'pointer-events-none')}
        >
          <Link
            href={`/docs/frameworks/${framework}`}
            className="focus:outline-none"
          >
            <span className="absolute inset-0" aria-hidden="true"></span>
            <p className="text-sm font-medium text-gray-900 dark:text-slate-300">
              {title}
            </p>
            <div className="flex-row space-y-0 space-x-2 truncate py-1">
              {tags.map((k) => (
                <span
                  key={k}
                  className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xxs font-medium uppercase text-gray-800 dark:bg-slate-800 dark:text-sky-300"
                >
                  {k}
                </span>
              ))}
            </div>
          </Link>
        </div>
      </div>
      {/* <div className="truncate-2-lines px-6 pb-6 text-xs text-gray-400">
        DESC...
      </div> */}
    </li>
  )
}
