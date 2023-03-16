import Link from 'next/link'
import { learnMoreURL } from './utils'
import DOSvg from '@/images/icons/home/digitalocean.svg'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="bg-white dark:bg-slate-900">
      <div className="py-18 px-6 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex">
            <Image alt="DigitalOcean Logo" width={80} src={DOSvg} className="mr-4  self-start" />{' '}
            <h2 className="text-3xl font-extrabold !leading-tight tracking-tight text-gray-900 dark:text-slate-300 sm:text-7xl">
              {/* <Image alt="DigitalOcean Logo" width={80} src={DOSvg} className="float-left mr-4" />{' '} */}
              Digital Ocean.
              <br /> All in one place.
            </h2>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-xl  font-semibold leading-8 text-gray-800 dark:text-slate-400">
            Add a complete user management into your apps without leaving DigitalOcean.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={'#add'}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-sky-600 dark:hover:bg-sky-700"
            >
              Get started
            </a>
            <Link
              href={learnMoreURL()}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
