import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel-react'

import clsx from 'clsx'

// indicator button
//
type ButtonPropType = PropsWithChildren<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>

export const IndicatorButton: React.FC<ButtonPropType & { active: boolean }> = (props) => {
  const { active, children, className, ...restProps } = props

  return (
    <button
      type="button"
      {...restProps}
      className={clsx(
        'mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-clip-padding p-0',
        !active && 'opacity-50',
        className || 'bg-white'
      )}
    >
      {children}
    </button>
  )
}

// previous button
//
export const PrevButton: React.FC<ButtonPropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      type="button"
      {...restProps}
      className="group absolute left-0 top-0 z-10 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none disabled:opacity-0"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-600/30 group-hover:bg-gray-600/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-slate-800/30 dark:group-hover:bg-slate-800/60 dark:group-focus:ring-slate-800/70">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5 stroke-2 text-white dark:text-slate-800"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>

        <span className="sr-only">Previous</span>
      </span>
      {children}
    </button>
  )
}

export const NextButton: React.FC<ButtonPropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      type="button"
      {...restProps}
      className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none disabled:opacity-0"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-600/30 group-hover:bg-gray-600/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-slate-800/30 dark:group-hover:bg-slate-800/60 dark:group-focus:ring-slate-700/70">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5 stroke-2 text-white dark:text-slate-800"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <span className="sr-only">Next</span>
      </span>
      {children}
    </button>
  )
}

type PropType = PropsWithChildren & {
  noNav?: boolean
  noIndicators?: boolean
  indicatorClassName?: string
  options?: EmblaOptionsType
}

const Carousel: React.FC<PropType> = (props) => {
  const { noNav, noIndicators, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    // viewport
    <div className="relative overflow-hidden" ref={emblaRef}>
      {/* container */}
      <div className="flex">{props.children}</div>
      {/* indicators */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0">
        {!noIndicators &&
          scrollSnaps.map((_, index) => (
            <IndicatorButton
              className={props.indicatorClassName}
              key={index}
              onClick={() => scrollTo(index)}
              active={index === selectedIndex}
            />
          ))}
      </div>
      {/* controls */}
      {!noNav && (
        <div>
          <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
          <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
        </div>
      )}
    </div>
  )
}

export default Carousel
