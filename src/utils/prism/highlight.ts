import Prism from 'prismjs'
import { highlightedLines } from './highligted'
import { codeStyles } from './styles'
import { normalizeTokens, tokenizeCode } from './token'
import { ICodeLang } from './types'
import { getGrammarName } from './utils'

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

    let lineClassName = ['token', ...commonTypes, className].filter(Boolean).join(' ')

    if (empty) {
      return `<span class="${lineClassName}">\n</span>`
    }

    return `<span class="${lineClassName}">${line
      .map((token) =>
        token.types.length
          ? `<span class="token ${token.types.join(' ')}">${token.content}</span>`
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
            `block${highlights.highlighted.includes(index) ? codeStyles.highlighted : ''}`
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
        (_, text) => `<span class="code-highlight bg-code-highlight">${text}</span>`
      )
    : code
}
