import DefaultLayout from '@/layouts/default'

const team = [
  {
    name: 'Asaf Shakarzy',
    title: 'CEO',
    avatar: '/avatars/asafs.jpg',
  },
  {
    name: 'Erez Sharim',
    title: 'R&D lead',
    avatar: '/avatars/erezs.png',
  },
  {
    name: 'Rani Sharim',
    title: 'Technology lead',
    avatar: '/avatars/ranis.jpg',
  },
  {
    name: 'Ishai Levi',
    title: 'Support lead',
    avatar: '/avatars/ishail.jpg',
  },
  {
    name: 'Emely Arnon',
    title: 'HR lead',
    avatar: '/avatars/emelya.jpg',
  },
]

export default function Company() {
  return (
    <div className="bg-white">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-5 sm:space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-indigo-600">
              Meet our team
            </h2>
            <p className="text-xl text-gray-500">
              Our team is based on specialists with over a decade of experience in identity.
            </p>
          </div>
          <div className="lg:col-span-2">
            <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
              {team.map((p) => (
                <li key={p.name}>
                  <div className="flex items-center space-x-4 lg:space-x-6">
                    <img
                      className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                      style={{ filter: 'grayscale(100%)' }}
                      src={p.avatar}
                      alt=""
                    />
                    <div className="font-medium text-lg leading-6 space-y-1">
                      <h3>{p.name}</h3>
                      <p className="text-gray-500">{p.title}</p>
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

Company.layoutProps = {
  Layout: DefaultLayout,
  meta: {
    title: 'About',
    description: 'About Company',
  },
}
