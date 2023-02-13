import Image from 'next/image'

export function ImageNode({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} width={800} height={800} alt={alt} />
}
