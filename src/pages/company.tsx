import Image from 'next/image'
import react from 'react'

const team = [
  {
    name: 'Asaf Shakarzy',
    title: 'CEO',
    avatar: '/images/avatars/asafs.jpg',
  },
  {
    name: 'Erez Sharim',
    title: 'R&D lead',
    avatar: '/images/avatars/erezs.png',
  },
  {
    name: 'Rani Sharim',
    title: 'Technology lead',
    avatar: '/images/avatars/ranis.jpg',
  },
  {
    name: 'Ishai Levi',
    title: 'Support lead',
    avatar: '/images/avatars/ishail.jpg',
  },
  {
    name: 'Emely Arnon',
    title: 'HR lead',
    avatar: '/images/avatars/emelya.jpg',
  },
]

export default function Company() {
  return (
    <div className="bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-5 sm:space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-sky-500 sm:text-4xl">
              Meet our team
            </h2>
            <p className="dark:t text-xl text-gray-500 dark:text-slate-300">
              Our team is based on specialists with over a decade of experience
              in identity.
            </p>
          </div>
          <div className="lg:col-span-2">
            <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
              {team.map((p) => (
                <li key={p.name}>
                  <div className="flex items-center space-x-4 lg:space-x-6">
                    <Image
                      className="h-16 w-16 rounded-full lg:h-20 lg:w-20"
                      width={36}
                      height={36}
                      style={{ filter: 'grayscale(100%)' }}
                      src={p.avatar}
                      alt=""
                    />
                    <div className="space-y-1 text-lg font-medium leading-6">
                      <h3 className="text-slate-900 dark:text-slate-400">
                        {p.name}
                      </h3>
                      <p className="text-gray-500 dark:text-slate-300">
                        {p.title}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Company.layoutProps = {
//   Layout: DefaultLayout,
//   meta: {
//     title: 'About',
//     description: 'About Company',
//   },
// }
