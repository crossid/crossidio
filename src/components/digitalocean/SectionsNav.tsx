import clsx from 'clsx'
import styles from './SelectionsNav.module.css'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { NavSvg } from './NavSvg'

export interface INavSectionList {
  id: string
  title: string
}

export default function SectionsNav({
  links,
  actives,
  lastExited,
}: {
  links: INavSectionList[]
  actives: string[]
  lastExited: boolean
}) {
  const [fillPercent, setFillPercent] = useState<number>(0)

  useEffect(() => {
    switch (actives.length) {
      case 0:
        setFillPercent(0)
        break
      case 1:
        setFillPercent(30)
        break
      case 2:
        setFillPercent(42)
        break
      case 3:
        setFillPercent(60)
        break
      case 4:
        lastExited ? setFillPercent(100) : setFillPercent(70)
        break
    }
  }, [actives.length, lastExited])

  return (
    <nav
      className={clsx(
        'sticky top-12 hidden h-full w-32 place-content-center overflow-hidden grid-areas-[navbar] lg:grid'
      )}
    >
      <NavSvg fillPercent={fillPercent} />
      <ul
        className={clsx(
          'relative m-auto flex h-[60vh] flex-col items-center justify-between grid-in-[navbar]',
          styles.navlink
        )}
      >
        {links.map((l) => {
          return (
            <li
              className={clsx(
                'w-100 flex w-full items-center justify-center',
                actives.findIndex((p) => p === l.id) > -1 && styles.active
              )}
              key={l.id}
            >
              <a href={`#${l.id}`}>
                <span className="z-10">{l.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
