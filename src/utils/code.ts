import get from 'lodash.get'
import { highligtedCodebyMarkdownMeta } from './prism/highligted'

const varPattern = /({{)([\w.\[\]]*)(}})/g

export function resolveCode(code: string, fields: Record<string, any>) {
  const vars = Array.from(code.matchAll(varPattern))
  vars.forEach((v) => {
    const fv = get(fields, v[2])
    if (fv) code = code.replace(v[0], fv)
  })
  return code
}

const startLine = 'section:start'
const endLine = 'section:end'

export function codeSections(code: string) {
  const segments: Record<string, string[]> = {}

  let start: number | undefined
  let end: number | undefined
  let section: string
  let substractedLines = 0
  const newCode: string[] = []
  code.split('\n').forEach((l: string, i: number) => {
    const startIdx = l.indexOf(startLine)
    let commentLine = false
    if (startIdx > -1) {
      section = l
        .substring(startIdx + startLine.length)
        .trim()
        .split(' ')[0]
      if (start) console.warn('previous code section not ended')
      start = i + 1
      commentLine = true
    }

    if (l.indexOf(endLine) > -1) {
      end = i - 1
      commentLine = true
    }

    if (start && end) {
      if (!segments[section]) segments[section] = []
      segments[section].push(`${start - substractedLines}:${end - substractedLines}`)
      substractedLines += 2
      start = undefined
      end = undefined
    }

    if (!commentLine) {
      newCode.push(l)
    }
    commentLine = false
  })

  // convert to lines
  const sections: Record<string, number[]> = {}
  Object.keys(segments).forEach((s) => {
    sections[s] = highligtedCodebyMarkdownMeta(segments[s].join(','))
  })

  return { sections: sections, code: newCode.join('\n') }
}
