import { AddSection } from '@/components/digitalocean/AddSection'
import { DeploySection } from '@/components/digitalocean/DeploySection'
import Hero from '@/components/digitalocean/Hero'
import { IntegrateSection } from '@/components/digitalocean/IntegrateSection'
import { RunSection } from '@/components/digitalocean/RunSection'
import ReadyToDiveIn from '@/components/digitalocean/ReadyToDiveIn'
import SectionsNav from '@/components/digitalocean/SectionsNav'
import { StorySteps, Step } from '@/components/StorySteps'
import { IOnStepEnterOrExit } from '@/components/StorySteps/types'
import Head from 'next/head'
import { useState } from 'react'

const links = [
  {
    id: 'add',
    title: 'Add',
  },
  {
    id: 'integrate',
    title: 'Integrate',
  },
  {
    id: 'deploy',
    title: 'Deploy',
  },
  {
    id: 'run',
    title: 'Run',
  },
]

const title = 'Crossid by DigitalOcean'
const desc = 'Use Crossid without leaving DigitalOcean'
export default function Page() {
  const [actives, setActives] = useState<string[]>([])
  const [lastExited, setLastExited] = useState<boolean>(false)

  const onStepEnter = ({ entry }: IOnStepEnterOrExit) => {
    if (actives.findIndex((p) => p === entry.target.id) === -1) {
      setActives(actives.concat(entry.target.id))
    }
    setLastExited(false)
  }

  const onStepExit = ({ entry, direction }: IOnStepEnterOrExit) => {
    const idx = actives.indexOf(entry.target.id)
    if (direction === 'up' && idx > -1) {
      const filtered = actives.filter((p) => p !== entry.target.id)
      setActives(filtered)
    }

    if (entry.target.id === 'run' && direction === 'down') {
      setLastExited(true)
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="description" content={desc} />
        <meta name="og:description" content={desc} />
      </Head>
      <div className="mx-auto max-w-7xl scroll-smooth py-8 px-4 sm:px-6 lg:px-8 lg:py-12">
        <Hero />

        <div className="flex gap-12">
          <SectionsNav links={links} actives={actives} lastExited={lastExited} />
          <section>
            <StorySteps onStepEnter={onStepEnter} onStepExit={onStepExit} offset={0.5}>
              <Step>
                <section id="add">
                  <AddSection />
                </section>
              </Step>
              <Step>
                <section id="integrate">
                  <IntegrateSection />
                </section>
              </Step>
              <Step>
                <section id="deploy">
                  <DeploySection />
                </section>
              </Step>
              <Step>
                <section id="run">
                  <RunSection />
                </section>
              </Step>
            </StorySteps>
          </section>
        </div>
        <ReadyToDiveIn />
      </div>
    </>
  )
}
