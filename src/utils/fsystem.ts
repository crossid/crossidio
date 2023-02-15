import glob from 'glob-promise'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function collateTags(dataType: 'posts') {
  // blog md files are stored in the 'posts' directory
  const POSTS_DIR = path.join(process.cwd(), dataType)

  // find all md files in the 'posts' directory
  // With The glob-promise library, we can use a one liner to find our Markdown files
  const files = await glob(path.join(POSTS_DIR, '**/*.md'))

  let tags = new Set<string>() // to ensure only unique tags are added

  files.map((fn) => {
    const source = fs.readFileSync(fn, 'utf8')
    const { data } = matter(source)

    data.tags.forEach((tag: string) => tags.add(tag))
  })

  return Array.from(tags.values())
}

export async function getTags(dataType: 'posts') {
  const tags = await collateTags('posts')
  return tags
}

export interface PostMatter {
  slug: string
  title: string
  description: string
  date: number
}

export interface Post {
  frontMatter: PostMatter
  slug: string
}

export async function getAllPostsWithFrontMatter(
  dataType: 'posts',
  filterByTag: string | null = null
): Promise<Post[]> {
  // blog md files are stored in the 'posts' directory
  const POSTS_DIR = path.join(process.cwd(), dataType)
  const files = await glob(path.join(POSTS_DIR, '**/*.md'))

  // todo fix this
  // @ts-ignore
  const posts = files.reduce<Post[]>((allPosts, file) => {
    const source = fs.readFileSync(file, 'utf8')
    const { data } = matter(source)

    if (filterByTag) {
      if (data.tags.includes(filterByTag)) {
        return [
          {
            frontMatter: {
              ...data,
              date: data.date.getTime(),
            },
            slug: pathToSlug(file),
          },
          ...allPosts,
        ]
      } else {
        return allPosts
      }
    }

    return allPosts
  }, [] as Post[])

  // todo fix this
  // @ts-ignore
  return posts as Post[]
}

export function pathToSlug(fullPath: string) {
  const pathParts = fullPath.split(path.sep)
  const slug = pathParts[pathParts.length - 2]
  return slug
}
