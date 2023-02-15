export interface IAuthor {
  name: string
  title: string
  avatar: string
  twitter: string
  github: string
}

export const authors: Record<string, IAuthor> = {
  asaf: {
    name: 'Asaf Shakarzy',
    title: 'CEO',
    twitter: 'asaf_sh',
    avatar: '/images/avatars/asafs.jpg',
    github: 'asaf',
  },
}
