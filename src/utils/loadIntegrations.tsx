const integrationsTreeName = 'integrations'
const githubApiUrlPrefix = `https://api.github.com/repos/crossid/icatalog/git`

const apiKey = process.env.GITHUB_API_KEY

const headers = {
  Authorization: `Bearer ${apiKey}`,
  Accept: `application/vnd.github+json`,
}

interface ICollector {
  id: string
  title: string
  description: string
  type: 'info'
}

export interface ICollectorInfo extends ICollector {
  content: string
}

interface Integration {
  id: string
  displayName: string
  version: string
  keywords: string[]
  description: string
  logoURL: string
  poweredBy: string
  collectors: ICollector[]
  provisioning: Record<string, any>[]
}

export type GithubFile = {
  filename: string
  sha: string
  node_id: string
  size: number
  url: string
  // content
  content: string
  // content's encoding
  encoding: BufferEncoding
  // decoded content
  json: Integration
}

type fileObj = {
  path: string
  mode: string
  type: string
  sha: string
  size: number
  url: string
}

type GithubFolder = {
  sha: string
  url: string
  tree: fileObj[]
}

export async function getFolder(folderName: string): Promise<GithubFolder> {
  const url = `${githubApiUrlPrefix}/trees/main`
  const response = await fetch(url, { headers })
  const { tree } = await response.json()
  const folder = tree.find((n: fileObj) => n.path === folderName)
  if (!folder) {
    return { tree: [], sha: '', url: '' }
  }
  const folderResponse = await fetch(folder.url, { headers })
  const folderRespJson = await folderResponse.json()
  return folderRespJson
}

export async function getFileWithContentByName(filename: string): Promise<GithubFile | null> {
  const { tree } = await getFolder(integrationsTreeName)
  const fileToFetch = tree.find(
    (f) => f.path === filename || f.path.split('.')[0] === filename.split('.')[0]
  )
  if (!fileToFetch) {
    return null
  }

  return getFileWithContent(fileToFetch.url, filename)
}

async function getFile(fileUrl: string): Promise<GithubFile> {
  const response = await fetch(fileUrl, { headers })
  const responseJson = await response.json()
  return responseJson
}

async function getFileWithContent(fileUrl: string, path?: string): Promise<GithubFile> {
  const gFile = await getFile(fileUrl)
  let buff = Buffer.from(gFile.content, gFile.encoding)
  gFile.json = JSON.parse(buff.toString('utf-8'))
  gFile.filename = path || ''
  return gFile
}

export async function getAllIntegrations(): Promise<GithubFile[]> {
  const { tree } = await getFolder(integrationsTreeName)
  const fileContents: Promise<GithubFile>[] = []
  for (let fileObj of tree) {
    const fileContent = getFileWithContent(fileObj.url, fileObj.path)
    fileContents.push(fileContent)
  }

  return Promise.all(fileContents)
}

export function filterByKeywords(tags: string[]) {
  return function (f: GithubFile) {
    const filteredArray = f.json.keywords.filter((value) => tags.includes(value))
    return filteredArray.length > 0
  }
}
