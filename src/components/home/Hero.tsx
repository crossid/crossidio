import { ChevronDownIcon } from '@heroicons/react/outline'
import GetStarted from '../GetStarted'

export const Hero = () => {
  return (
    <section id="hero">
      <div className="text-center mx-auto max-w-4xl pt-10 h-screen" style={{ height: '65vh' }}>
        <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl text-indigo-600 mb-4">
          <span className="block xl:inline">This is Crossid:</span>{' '}
        </h1>
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">the login box that your customers will love.</span>{' '}
        </h1>
        {/* <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Simplify your ...
            </p> */}
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <GetStarted />
          </div>
        </div>
        <div className="absolute bottom-10 left-2/4 -ml-6">
          <ChevronDownIcon className="text-gray-400 h-16 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
