import get from 'lodash.get'

const varPattern = /({)([\w.\[\]]*)(})/g

export function resolveCode(code: string, fields: Record<string, any>) {
  const vars = Array.from(code.matchAll(varPattern))
  vars.forEach((v) => {
    const fv = get(fields, v[2])
    if (fv) code = code.replace(v[0], fv)
  })
  return code
}
