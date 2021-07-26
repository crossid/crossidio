import DefaultLayout from '../layouts/default'
import useDisposableList from 'use-disposable-list'
import Notifications, { NotificationDef } from '@/components/Notifications'
import { useState } from 'react'
import * as gtag from '@/lib/gtag'
import { Hero } from '@/components/home/Hero'
import { ProductTeaser } from '@/components/home/ProductTeaser'
import { StartNow } from '@/components/home/StartNow'

function Home() {
  return (
    <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
      <div className="mx-auto max-w-7xl">
        <Hero />
        <ProductTeaser />
        <div className="pt-64" />
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
