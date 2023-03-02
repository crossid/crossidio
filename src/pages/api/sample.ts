import type { NextApiRequest, NextApiResponse } from 'next'
import stream from 'stream'
import { promisify } from 'util'

const pipeline = promisify(stream.pipeline)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query
  const { data } = query
  if (!data) {
    res.status(500).json({ message: 'data is required' })
    return
  }

  let dataStr = ''
  if (Array.isArray(data)) {
    dataStr = data[0]
  } else {
    dataStr = data
  }

  const dataObj = JSON.parse(Buffer.from(dataStr, 'base64').toString('utf-8'))
  res.status(200).json(dataObj)

  const { repoName, ...rest } = dataObj

  // res.setHeader('Content-Type', 'application/zip')
  // res.setHeader('Content-Disposition', 'attachment; filename=example.zip')
  // await pipeline(response.body, res)
}
