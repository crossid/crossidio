export const isOffsetInPixels = (offset: number | string) =>
  typeof offset === 'string' && offset.includes('px')

export const isBrowser = () => typeof window !== 'undefined'
