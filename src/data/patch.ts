type PatchOP = {
  path: string
  op: string
  value: any
  oldValue?: any
}

export type Patch = {
  Operations: PatchOP[]
  revision: number
}
