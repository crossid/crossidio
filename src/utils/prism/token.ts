import Prism, { Token as PrismToken, TokenStream } from 'prismjs'
import { ICodeLang } from './types'
import { getGrammarName } from './utils'
var loadLanguages = require('prismjs/components/index')
// loads Prism.languages
loadLanguages()

const HTML_TAG =
  /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/gi
const PSEUDO_CLASSES = [
  'active',
  'any-link',
  'blank',
  'checked',
  'current',
  'default',
  'defined',
  'dir',
  'disabled',
  'drop',
  'empty',
  'enabled',
  'first',
  'first-child',
  'first-of-type',
  'fullscreen',
  'future',
  'focus',
  'focus-visible',
  'focus-within',
  'has',
  'host',
  'host',
  'host-context',
  'hover',
  'indeterminate',
  'in-range',
  'invalid',
  'is',
  'lang',
  'last-child',
  'last-of-type',
  'left',
  'link',
  'local-link',
  'not',
  'nth-child',
  'nth-col',
  'nth-last-child',
  'nth-last-col',
  'nth-last-of-type',
  'nth-of-type',
  'only-child',
  'only-of-type',
  'optional',
  'out-of-range',
  'past',
  'picture-in-picture',
  'placeholder-shown',
  'read-only',
  'read-write',
  'required',
  'right',
  'root',
  'scope',
  'state',
  'target',
  'target-within',
  'user-invalid',
  'valid',
  'visited',
  'where',
]

// TODO this code runs multiple times, not sure if this is safe
Prism.hooks.add('wrap', (env) => {
  if (env.type === 'atrule') {
    const content = env.content.replace(HTML_TAG, '')
    if (content.startsWith('@apply')) {
      env.classes.push('atapply')
    }
  } else if (env.type === 'pseudo-class') {
    if (!new RegExp(`^::?(${PSEUDO_CLASSES.join('|')})`).test(env.content)) {
      env.classes = env.classes.filter((x) => x !== 'pseudo-class')
    }
  }
})

// TODO this code runs multiple times, not sure if this is safe
Prism.hooks.add('after-tokenize', ({ language, tokens }) => {
  if (language === 'css') {
    fixSelectorEscapeTokens(tokens)
  }
})

export function simplifyToken(token: any) {
  if (typeof token === 'string') return token
  return [
    token.type,
    Array.isArray(token.content)
      ? token.content.map(simplifyToken)
      : token.content,
  ]
}

export function fixSelectorEscapeTokens(tokens: (string | Prism.Token)[]) {
  for (let token of tokens) {
    if (typeof token === 'string') continue
    if (token.type !== 'selector') continue
    for (let i = 0; i < token.content.length; i++) {
      // @ts-ignore TODO!!!!!!!!!!!!
      if (token.content[i] === '\\' && token.content[i - 1]?.type === 'class') {
        // @ts-ignore
        token.content[i] = new Prism.Token('punctuation', token.content[i])
        // @ts-ignore
        token.content[i + 1].type = 'class'
      }
    }
  }
}

// https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/utils/normalizeTokens.js
const newlineRe = /\r\n|\r|\n/

// Empty lines need to contain a single empty token, denoted with { empty: true }
function normalizeEmptyLines(line: IToken[]) {
  if (line.length === 0) {
    line.push({
      types: ['plain'],
      content: '',
      empty: true,
    })
  } else if (line.length === 1 && line[0].content === '') {
    line[0].empty = true
  }
}

function appendTypes(types: string[], add: string[] | string): string[] {
  const typesSize = types.length
  if (typesSize > 0 && types[typesSize - 1] === add) {
    return types
  }

  return types.concat(add)
}

// Takes an array of Prism's tokens and groups them by line, turning plain
// strings into tokens as well. Tokens can become recursive in some cases,
// which means that their types are concatenated. Plain-string tokens however
// are always of type "plain".
// This is not recursive to avoid exceeding the call-stack limit, since it's unclear
// how nested Prism's tokens can become
//
// An array of Prim's tokens looks like this:
// [
//   'module.exports = ',
//   Token {
//     type: 'punctuation',
//     content: '{',
//     alias: undefined,
//     length: 0
//   },
//   '\n>  ',
//   Token {
//     type: 'property',
//     content: '"i18n"',
//     alias: undefined,
//     length: 0
//   },
//   Token { type: 'operator', content: ':', alias: undefined, length: 0 },
//   ' ',
//   Token {
//     type: 'punctuation',
//     content: '{',
//     alias: undefined,
//     length: 0
//   }
// ]
export function normalizeTokens(tokens: TokenStream): IToken[][] {
  const typeArrStack: string[][] = [[]]
  const tokenArrStack = [tokens]
  const tokenArrIndexStack = [0]
  const tokenArrSizeStack = [tokens.length]

  let i = 0
  let stackIndex = 0
  let currentLine: IToken[] = []

  const acc = [currentLine]

  while (stackIndex > -1) {
    while (
      (i = tokenArrIndexStack[stackIndex]++) < tokenArrSizeStack[stackIndex]
    ) {
      let content
      let types = typeArrStack[stackIndex]

      const tokenArr = tokenArrStack[stackIndex]
      let token: string | Prism.Token = ''
      if (Array.isArray(tokenArr)) {
        token = tokenArr[i]
      }

      // Determine content and append type to types if necessary
      if (typeof token === 'string') {
        types = stackIndex > 0 ? types : ['plain']
        content = token
      } else {
        if (token as PrismToken) {
          types = appendTypes(types, token.type)
          if (token.alias) {
            types = appendTypes(types, token.alias)
          }

          content = token.content
        }
      }

      // If token.content is an array, increase the stack depth and repeat this while-loop
      // if (typeof content !== 'string') {
      if (Array.isArray(content)) {
        stackIndex++
        typeArrStack.push(types)
        tokenArrStack.push(content)
        tokenArrIndexStack.push(0)
        tokenArrSizeStack.push(content.length)
        continue
      }

      // Split by newlines
      if (typeof content === 'string') {
        const splitByNewlines = content.split(newlineRe)
        const newlineCount = splitByNewlines.length
        currentLine.push({ types, content: splitByNewlines[0] })

        // Create a new line for each string on a new line
        for (let i = 1; i < newlineCount; i++) {
          normalizeEmptyLines(currentLine)
          acc.push((currentLine = []))
          currentLine.push({ types, content: splitByNewlines[i] })
        }
      }
    }

    // Decreate the stack depth
    stackIndex--
    typeArrStack.pop()
    tokenArrStack.pop()
    tokenArrIndexStack.pop()
    tokenArrSizeStack.pop()
  }

  normalizeEmptyLines(currentLine)
  return acc
}

export function tokenizeCode(
  code: string,
  lang: ICodeLang
): (string | Prism.Token)[] | null {
  const gn = getGrammarName(lang)
  const grammar = Prism.languages[gn]
  if (!grammar) {
    console.warn(
      `Unrecognised language ${grammar} for code: ${code.substring(0, 20)}...`
    )
    // return Prism.util.encode(code)
    return null
  }

  const tokenized = Prism.tokenize(code, grammar)
  if (lang === 'css') {
    fixSelectorEscapeTokens(tokenized)
  }

  return tokenized
  // return encode Prism.util.encode(tokenized) : tokenized
}
