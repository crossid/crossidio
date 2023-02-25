import { ICodeLang } from './types'

export function getGrammarName(lang: ICodeLang) {
  const isDiff = lang.startsWith('diff-')
  let language = isDiff ? (lang.substring(5) as ICodeLang) : lang

  // TODO this is a hack until we'll have a syntax for vue
  // https://github.com/PrismJS/prism/issues/1665
  if (language === 'vue') {
    language = 'html'
  }

  return language
}
