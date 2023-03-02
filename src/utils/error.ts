export function formatError(e: any) {
  if ('message' in e) {
    return e.message
  }

  if (Array.isArray(e) && e.length) {
    if ('message' in e[0]) {
      return e[0].message
    }
  }

  return 'unexpected error'
}
