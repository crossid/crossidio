interface IAuthor {
  displayName: string
  title: string
  thumbnail: string
}

export const authors: Record<string, IAuthor> = {
  asaf: {
    displayName: 'Asaf Shakarzy',
    title: 'CEO',
    thumbnail: '/images/avatars/asafs.jpg',
  },
}
