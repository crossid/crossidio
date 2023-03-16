import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import LoginBox from './LoginBox'
import OtpBox from './OtpBox'

interface ISection {
  id: string
  comp: () => JSX.Element
}

const sections: ISection[] = [
  {
    id: 'login',
    comp: LoginBox,
  },
  {
    id: 'otp',
    comp: OtpBox,
  },
]

export function LoginAlbum({ className }: { className?: string }) {
  const [activeSection, setActiveSection] = useState<ISection>(sections[0])

  useEffect(() => {
    const id = window.setInterval(() => {
      const currIdx = sections.findIndex((p) => p.id === activeSection.id)
      const idx = currIdx === sections.length - 1 ? 0 : currIdx + 1
      setActiveSection(sections[idx])
    }, 5000)
    return () => {
      window.clearInterval(id)
    }
  })

  return (
    <AnimateSharedLayout>
      <motion.div layout transition={{ delay: 0, duration: 2 }} className={className}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 1.0, duration: 1 },
            }}
            exit={{
              opacity: 0,
              transition: { delay: 0, duration: 1 },
            }}
          >
            <div>
              {activeSection.id === 'login' && <LoginBox />}
              {activeSection.id === 'otp' && <OtpBox />}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimateSharedLayout>
  )
}
