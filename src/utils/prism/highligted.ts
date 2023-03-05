import { arrayRange } from './array'
import { ICodeLang, IHighlightedLines } from './types'

// returns true if code has highlighted lines, these lines marked with a > prefix (e.g., ">  <div>hello</div>")
function hasLineHighlights(code: string) {
  if (!/^>/m.test(code)) {
    return false
  }

  return code
    .split('\n')
    .every((line) => line === '' || line === '>' || /^[> ] /.test(line))
}

// returns highlighted lines numbers, when in diff mode returns added/removed lines numbers
export function highlightedLines(
  code: string,
  lang: ICodeLang
): IHighlightedLines {
  const isDiff = lang.startsWith('diff-')

  let addedLines: number[] = []
  let removedLines: number[] = []
  // if this is a diff we remove all diff markers (-,+) and add their line numbers to the relevant array
  if (isDiff) {
    code = code.replace(/(?:^[+\- ] |^[+-]$)/gm, (match, offset) => {
      let line = code.substring(0, offset).split('\n').length - 1
      if (match.startsWith('+')) {
        addedLines.push(line)
      } else if (match.startsWith('-')) {
        removedLines.push(line)
      }
      return ''
    })
  }

  // if some lines are highlighted, remove highlight marker (>) and add their line numbers to the array
  let highlightedLines: number[] = []
  if (hasLineHighlights(code)) {
    let match
    let re = /^>/m
    while ((match = re.exec(code)) !== null) {
      let line = code.substring(0, match.index).split('\n').length - 1
      highlightedLines.push(line)
      code = code.substring(0, match.index) + ' ' + code.substr(match.index + 1)
    }
    // code = redent(code)
  }

  return {
    added: addedLines,
    removed: removedLines,
    highlighted: highlightedLines,
    code,
  }
}

// e.g, '4:8,5,9,15:20'
export function highligtedCodebyMarkdownMeta(meta: string) {
  const highlights: number[] = []
  const ranges = meta.split(',')
  ranges.forEach((r) => {
    if (r.indexOf(':') > -1) {
      const p = r.split(':')
      highlights.push(...arrayRange(Number(p[0]) - 1, Number(p[1]) - 1, 1))
    } else {
      highlights.push(Number(r) - 1)
    }
  })

  return highlights
}
