import { useEffect, useState } from 'react'

/**
 * a hook that tracks the window Y offset when user scrolls the page
 *
 * @returns window's Y offset
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset)
    }

    window.addEventListener('scroll', updatePosition)

    updatePosition()

    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}
