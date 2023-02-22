type INavLink = {
  title: string
  href: string
}

type INavItem = {
  title: string
  links: INavLink[]
}

export type INav = INavItem[]

export interface ITOC {
  id: string
  title: string
  children: ITOC[]
}

interface IRepo {
  name: string
  url: string
  branch: string
  // the coding languages, e.g., "javascript", "typescript"
  languages: string[]
}

export interface IFramework {
  // the title of the tech, e.g., "React"
  title: string
  // framework tags (e.g., 'javascript', 'spa')
  tags: string[]
  // the logo of the framework
  logo: string
  // the repo of the framework
  framework_repo: IRepo
  // the code of the sdk
  sdk_repo: IRepo
  // the repo of the sample code
  sample_repo: IRepo
  // e.g., 'react > 18'
  requirements: string[]
}
