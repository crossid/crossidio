interface IToken {
  content: string
  types: string[]
  empty?: boolean
}

declare module '*?highlight' {
  export const lines: IToken[][]
  export const highlightedCode: string
}
