import DefaultLayout from '../layouts/default'
import { Hero } from '@/components/home/Hero'
import { ProductTeaser } from '@/components/home/ProductTeaser'
import { StartNow } from '@/components/home/StartNow'
import { Developer } from '@/components/home/Developer'

function Home() {
  return (
    <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
      <div className="mx-auto max-w-7xl">
        <Hero />
        <ProductTeaser />
        {/* a workaround for the absolute, fixed height ProductTeaser */}
        <div className="pt-24 lg:pt-48" />
        <Developer />
        <StartNow />
      </div>
    </main>
  )
}

Home.layoutProps = {
  Layout: DefaultLayout,
  meta: {
    title: 'Home',
  },
}

export default Home
