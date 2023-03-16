import { useEffect, useState } from 'react'

/**
 * Tracks which element is currently active based on its position
 *
 * @param selector the DOM query selector of the elements to track (e.g., 'h2')
 * @param containerRef a ref to the DOM element which contains the elements to track
 * @param ref a reference to an element on the page to find the distance from the tracked elements (e.g., some nav that shows which element is active)
 * @param refLeeway an offset leeway from the ref's element
 * @returns
 */
export function useActiveElement(
  selector: string,
  containerRef: React.RefObject<HTMLDivElement | undefined>,
  ref: React.RefObject<HTMLDivElement | undefined>,
  refLeeway = 1
) {
  const [activeIndex, setActiveIndex] = useState<Element>()

  useEffect(() => {
    function updateActiveIndex() {
      let bodyRect = document.body.getBoundingClientRect()
      let offset = bodyRect.top + (ref.current?.offsetHeight || 0) + refLeeway

      let elements = containerRef.current?.querySelectorAll(selector)
      if (window.scrollY >= Math.floor(bodyRect.height) - window.innerHeight) {
        if (!elements) return
        setActiveIndex(elements[elements.length - 1])
        return
      }

      if (!elements) {
        return
      }

      for (let index = 0; index < elements.length; index++) {
        if (window.scrollY >= elements[index].getBoundingClientRect().top - offset) {
          setActiveIndex(elements[index])
        } else {
          break
        }
      }
    }

    updateActiveIndex()

    window.addEventListener('resize', updateActiveIndex)
    window.addEventListener('scroll', updateActiveIndex, { passive: true })

    return () => {
      window.removeEventListener('resize', updateActiveIndex)
      window.removeEventListener('scroll', updateActiveIndex)
    }
  }, [containerRef, ref, refLeeway, selector])

  return [activeIndex]
}
