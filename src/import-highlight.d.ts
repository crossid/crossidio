type ILines = ILineArr[]
type ILineArr = ILine[]

interface ILine {
  content: string
  types: string[]
  //   I've never seen this field in token but getClassNameForToken uses this
  empty: boolean
}

declare module '*?highlight' {
  const lines: ILines

  export const lines
}
