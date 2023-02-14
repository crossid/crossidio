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
