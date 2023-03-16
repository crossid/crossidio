import { ReactNode } from 'react'
import { LoginAlbum } from '../mocks/LoginAlbum'
import LoginBox from '../mocks/LoginBox'

export function Hero() {
  return (
    <Layout
      left={
        <div className="lg:-mr-18">
          <LoginAlbum />
        </div>
      }
    ></Layout>
  )
}

function Layout({ left, right }: { left: ReactNode; right?: ReactNode }) {
  return (
    <div className="mx-auto mt-20 max-w-7xl px-4 sm:mt-24 sm:px-6 md:px-8 lg:mt-32 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
      <div className="relative col-span-7 col-start-6 row-start-1 xl:col-span-6 xl:col-start-7">
        <div className="-mx-4 sm:mx-0">{right}</div>
      </div>
      <div className="relative col-span-5 col-start-1 row-start-1 -mt-10 xl:col-span-6">
        <div className="mx-auto flex h-[24.25rem] max-w-xl items-center justify-center lg:max-w-none">
          <div className="w-full flex-none">{left}</div>
        </div>
      </div>
    </div>
  )
}
