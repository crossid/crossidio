import { ReactElement } from 'react'
import Image from 'next/image'

interface AvatarProps {
  size: 6 | 8 | 10 | 16 | 20
  name?: string
  url?: string
}

const getInitials = (fullName: string) => {
  const allNames = fullName.trim().split(' ')
  const initials = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`
    }
    return acc
  }, '')
  return initials
}

const Avatar = ({ size, url, name }: AvatarProps) => {
  let Comp: ReactElement
  if (url) {
    Comp = <Image className={`inline-block h-${size} w-${size} rounded-full`} src={url} alt="" />
  } else if (name) {
    Comp = (
      <span
        className={`inline-flex items-center justify-center h-${size} w-${size} rounded-full bg-gray-500`}
      >
        <span className="text-xs font-medium leading-none text-white">{getInitials(name)}</span>
      </span>
    )
  } else {
    Comp = (
      <span className={`inline-block h-${size} w-${size} overflow-hidden rounded-full bg-gray-100`}>
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    )
  }

  return Comp
}

export default Avatar
