// https://github.com/FormidableLabs/prism-react-renderer/blob/c1430679ee6cb0fb652d3a1b63f62f0c270ad631/index.d.ts#L5
export type ICodeLang =
  | 'markup'
  | 'bash'
  | 'clike'
  | 'c'
  | 'cpp'
  | 'css'
  | 'javascript'
  | 'jsx'
  | 'coffeescript'
  | 'actionscript'
  | 'css-extr'
  | 'diff'
  | 'git'
  | 'go'
  | 'graphql'
  | 'handlebars'
  | 'json'
  | 'less'
  | 'makefile'
  | 'markdown'
  | 'objectivec'
  | 'ocaml'
  | 'python'
  | 'reason'
  | 'sass'
  | 'scss'
  | 'sql'
  | 'stylus'
  | 'tsx'
  | 'typescript'
  | 'wasm'
  | 'yaml'
  // difs
  | 'diff-javascript'
  // how come html is not in list?
  | 'html'
  | 'vue'

// IToken is in import-hightlight.d.ts

export interface IHighlightedLines {
  added: number[]
  removed: number[]
  highlighted: number[]
  code: string
}
