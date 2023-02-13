import Image from 'next/image'
import { useRouter } from 'next/router'

export function Img({
  name,
  alt,
  width,
  height,
}: {
  name: string
  alt: string
  width: number
  height: number
}) {
  const r = useRouter()

  let segment = '/images'
  if (r.pathname.startsWith('/docs')) {
    segment += '/docs'
  } else if (r.pathname.startsWith('/blog')) {
    segment += '/blog'
  }

  return (
    <Image
      src={`/images/docs/${name}`}
      width={width}
      height={height}
      alt={alt}
    />
  )
}
