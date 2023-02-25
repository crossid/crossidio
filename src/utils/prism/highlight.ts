import Prism from 'prismjs'
import { codeStyles } from './styles'
import { normalizeTokens, tokenizeCode } from './token'
import { ICodeLang, IHighlightedLines } from './types'
import { getGrammarName } from './utils'

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

export function highlightedCode(code: string, prismLanguage: ICodeLang) {
  const grammarName = getGrammarName(prismLanguage)
  const highlights = highlightedLines(code, grammarName)
  const toks = tokenizeCode(highlights.code, prismLanguage)
  const lines = normalizeTokens(toks || '')
  return {
    highlights,
    lines,
  }
}

export function highlight(code: string, lang: ICodeLang) {
  const { highlights, lines } = highlightedCode(code, lang)
  const isDiff = highlights.added.length > 0 || highlights.removed.length > 0
  const ishighligted = highlights.highlighted.length > 0

  const grammar = getGrammarName(lang)

  function stringify(line: IToken[], className: string) {
    let empty = line.every((token) => token.empty)

    if (!className && empty) {
      return '\n'
    }

    let commonTypes: string[] = []
    for (let i = 0; i < line.length; i++) {
      let token = line[i]
      if (i === 0) {
        commonTypes.push(...token.types)
      } else {
        commonTypes = commonTypes.filter((type) => token.types.includes(type))
      }
    }
    if (commonTypes.length) {
      for (let i = 0; i < line.length; i++) {
        let token = line[i]
        token.types = token.types.filter((type) => !commonTypes.includes(type))
      }
    }

    let lineClassName = ['token', ...commonTypes, className]
      .filter(Boolean)
      .join(' ')

    if (empty) {
      return `<span class="${lineClassName}">\n</span>`
    }

    return `<span class="${lineClassName}">${line
      .map((token) =>
        token.types.length
          ? `<span class="token ${token.types.join(' ')}">${
              token.content
            }</span>`
          : token.content
      )
      .join('')}\n</span>`
  }

  if (isDiff || ishighligted) {
    if (isDiff) {
      code = lines
        .map((line, index) =>
          stringify(
            line,
            `language-${lang} ${
              highlights.added.includes(index)
                ? 'inserted'
                : highlights.removed.includes(index)
                ? 'deleted'
                : 'unchanged'
            }`
          )
        )
        .join('')
    } else {
      code = lines
        .map((line, index) =>
          stringify(
            line,
            `block${
              highlights.highlighted.includes(index)
                ? codeStyles.highlighted
                : ''
            }`
          )
        )
        .join('')
    }
  } else {
    code = Prism.highlight(code, Prism.languages[grammar], lang)
  }

  return grammar === 'html'
    ? code.replace(
        /\*\*(.*?)\*\*/g,
        (_, text) =>
          `<span class="code-highlight bg-code-highlight">${text}</span>`
      )
    : code
}
