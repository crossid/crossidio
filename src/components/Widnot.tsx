// todo not sure the correct children type
export function Widont({ children }: { children: any }) {
  if (typeof children === 'string') {
    return children.replace(/ ([^ ]+)$/, '\u00A0$1')
  }
  return children
}
