import type { NextApiRequest, NextApiResponse } from 'next'
import JSZip from 'jszip'
import stream from 'stream'
import { promisify } from 'util'

const pipeline = promisify(stream.pipeline)

function replaceFileContent(content: string, dataObj: Record<string, string>): string {
  let newContent = content
  for (const [key, value] of Object.entries(dataObj)) {
    newContent = newContent.replaceAll(`{{${key}}}`, value)
  }
  return newContent
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query
  const { data } = query
  if (!data) {
    res.status(400).json({ message: 'data is required' })
    return
  }

  let dataStr = ''
  if (Array.isArray(data)) {
    dataStr = data[0]
  } else {
    dataStr = data
  }

  // decode base64 data object
  const dataObj = JSON.parse(Buffer.from(dataStr, 'base64').toString('utf-8'))

  const { repoName, folderName, ...configData } = dataObj
  try {
    // download the repo as zip file
    const githubUrl = `https://api.github.com/repos/${repoName}/zipball/main`
    const githubResp = await fetch(githubUrl, {
      headers: {
        Accept: `application/vnd.github+json`,
      },
    })

    if (!githubResp.ok) {
      throw 'failed to fetch repo from github'
    }

    const _blob = await githubResp.blob()
    // inflate the zip
    const zip = new JSZip()
    const repo = await zip.loadAsync(_blob.arrayBuffer(), {
      createFolders: true,
    })

    if (!repo) {
      res.status(500).json({ message: 'failed to inflate repo' })
      return
    }

    // iterate over the downloaded files
    const newZip = new JSZip()
    for (const [name, content] of Object.entries(repo.files)) {
      let newZipName = name
      const whereFolder = name.indexOf(folderName)
      if (!!folderName) {
        if (whereFolder > -1) {
          newZipName = name.slice(whereFolder + folderName.length + 1)
        } else {
          continue
        }
      }

      if (!content.dir) {
        // for files, replace their content with configuration data
        const fileContent = (await repo.file(name)?.async('string')) || ''
        newZip.file(newZipName, replaceFileContent(fileContent, configData))
      } else {
        // for folders, just create the same folder in the new zip, if needed
        if (!folderName) {
          newZip.folder(newZipName)
        }
      }
    }

    // generate a file stream the browser can download
    const zipFile = newZip.generateNodeStream({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    })

    // set the correct headers for zip file and the file itself
    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', 'attachment; filename=example.zip')
    res.status(200)
    await pipeline(zipFile, res)
  } catch (e: any) {
    res.status(500).json({ message: e.toString() })
  }
}
