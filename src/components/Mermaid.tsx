import React from 'react'
import mermaid from 'mermaid'

let currentId = 0
const uuid = () => `mermaid-${(currentId++).toString()}`

mermaid.initialize({
  // todo change to dark if in darkmode
  theme: 'default',
  // see https://mermaid.js.org/config/theming.html#theme-variables-reference-table
  themeVariables: {
    textColor: '#94a3b8',
  },
})

export default function Mermaid({ definition }: { definition: string }) {
  const [html, setHtml] = React.useState('')

  React.useLayoutEffect(() => {
    if (definition) {
      try {
        mermaid.render(uuid(), definition, (svgCode) => setHtml(svgCode))
      } catch (e) {
        setHtml('')
        console.error(e)
      }
    }
  }, [definition])

  return definition ? <div dangerouslySetInnerHTML={{ __html: html }} /> : null
}
