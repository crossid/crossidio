import Mermaid from '../Mermaid'

export default function MarkdocMermaid(props: any) {
  // this looks so hacky but couldn't find another way accessing the body of the markdoc tag as  string
  const graph = props.children.props.children.join('\n')

  return <Mermaid definition={graph} />
}
