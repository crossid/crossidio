// components/Carousel.tsx
import clsx from 'clsx'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'

type CarouselProps = PropsWithChildren & EmblaOptionsType

export const Carousel = ({ children, ...options }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  // We need to track the selectedIndex to allow this component to re-render in react.
  // Since emblaRef is a ref, it won't re-render even if there are internal changes to its state.
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    function selectHandler() {
      // selectedScrollSnap gives us the current selected index.
      const index = emblaApi?.selectedScrollSnap()
      setSelectedIndex(index || 0)
    }

    emblaApi?.on('select', selectHandler)
    // cleanup
    return () => {
      emblaApi?.off('select', selectHandler)
    }
  }, [emblaApi])

  const length = React.Children.count(children)

  return (
    <>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>
    </>
  )
}
