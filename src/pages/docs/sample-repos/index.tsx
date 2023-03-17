import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

const SAMPLES_FILE = path.join(process.cwd(), 'data', 'sample_repos.yml')

interface IGithubRepo {
  description: string
  html_url: string
  topics: string[]
}

interface IRepo {
  repo: string
  github: IGithubRepo
}

export const getStaticProps: GetStaticProps<{
  repos: IRepo[]
}> = async (_: GetStaticPropsContext<{}>) => {
  const repos = yaml.load(fs.readFileSync(SAMPLES_FILE, 'utf-8')) as IRepo[]

  const p: Promise<Response>[] = []
  repos.forEach((r) => {
    p.push(fetch(`https://api.github.com/repos/${r.repo}`))
  })

  const resolved = await Promise.all(p)
  const responses = await Promise.all(resolved.map((r) => r.json()))

  repos.forEach((r, i) => {
    r.github = responses[i]
  })

  return {
    props: {
      repos,
    },
  }
}

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { repos } = props
  return (
    <div className="not-prose overflow-hidden bg-white shadow dark:bg-slate-800/30 sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-slate-800">
        {repos.map((r, i) => (
          <Repo key={i} repo={r}></Repo>
        ))}
      </ul>
    </div>
  )
}

function Repo({ repo }: { repo: IRepo }) {
  return (
    <li key={repo.repo}>
      <a href={repo.github.html_url} className="block hover:bg-gray-50 dark:hover:bg-slate-800/50">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="truncate text-sm font-medium text-indigo-600 dark:text-sky-600">
              {repo.repo}
            </p>
            <div className="ml-2 flex flex-shrink-0">
              {repo.github.topics.map((t) => (
                <span
                  key={t}
                  className="mr-1 inline-flex rounded-full bg-indigo-50 px-2 text-xs font-semibold leading-5 text-indigo-800 dark:bg-slate-800 dark:text-slate-500"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="text-xsm flex items-center text-gray-500">{repo.github.description}</p>
            </div>
          </div>
        </div>
      </a>
    </li>
  )
}
