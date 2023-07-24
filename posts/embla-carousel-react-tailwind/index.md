---
slug: embla-carousel-react-tailwind
title: A Lightweight Carousel Styled with Tailwind
description: Build a lightweight Carousel with React and Tailwind using embla-carousel
authors: [asaf]
tags: ['react', 'tailwind', 'ui', 'web component']
date: 2023-07-23T13:00:02.000Z
---

## Preface

If you're interested in styling a carousel component using Tailwind CSS, then this post is for you.

However, if you intend to implement the carousel state using frameworks other than React, you can simply utilize the [provided styles below](#just-the-styles) and integrate them into your preferred framework.

If you plan to write the carousel state using a framework other than React, you can just grab the styles below and hook them into your favorite framework.

The subsequent sections of this post will explain how to use the React version of [Embla Carousel](https://www.embla-carousel.com) to manage the carousel state effectively.

[Embla Carousel](https://www.embla-carousel.com/) is a g lightweight carousel library with fluid motion and great swipe precision.

## Just the styles

If you just want the tailwind styles and use your own Carousel component to manage the state:

View it live in the [tailwind playground](https://play.tailwindcss.com/8j0bXAhrqf)

```html
<div class="relative bg-slate-200">
  <!-- wrapper -->
  <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
    <!-- slides -->
  </div>
  <!-- indicators -->
  <div
    class="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
  >
    <!-- remove opacity-50 for active -->
    <button
      class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 opacity-50"
    ></button>
  </div>
  <!-- controls -->
  <div>
    <button
      type="button"
      class="group absolute left-0 top-0 z-10 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
    >
      <span
        class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-slate-800/30 dark:group-hover:bg-slate-800/60 dark:group-focus:ring-slate-800/70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-5 w-5 stroke-2 text-white dark:text-slate-800"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>

        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button
      type="button"
      class="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
      data-carousel-next=""
    >
      <span
        class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-slate-800/30 dark:group-hover:bg-slate-800/60 dark:group-focus:ring-slate-700/70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-5 w-5 stroke-2 text-white dark:text-slate-800"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
</div>
```

## Setup a new project

Let's start a new project (skip this if you already have a project set up with React and Tailwind).

We'll be using _Vite_ as our bundler and dev server for this post.

```bash
npm create vite@latest embla-carousel-react-tailwind -- --template react-ts
```

Follow [Install Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)

Install the _Embla Carousel_ component for React.

## Install the embla-carousel-react package

Install the embla carousel component for react:

```bash
npm i embla-carousel-react
```

## Basic Carousel component

Let's start with the minimal version of the Carousel component:

_Carousel.tsx_:

```tsx
import { PropsWithChildren } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'

type CarouselProps = PropsWithChildren & EmblaOptionsType

const Carousel = ({ children, ...options }: CarouselProps) => {
  const [emblaRef] = useEmblaCarousel(options)

  return (
    // viewport
    <div className="overflow-hidden" ref={emblaRef}>
      {/* container */}
      <div className="flex">{children}</div>
    </div>
  )
}

export default Carousel
```

## Use the Carousel component

Modify _App.tsx_ to use the Carousel component and see it in action:

```tsx
import Carousel from './Carousel'

const slides = [
  { title: 'Slide1', color: 'bg-gray-500' },
  { title: 'Slide2', color: 'bg-red-500' },
  { title: 'Slide3', color: 'bg-blue-500' },
]

function App() {
  return (
    <div className="py-10">
      <main>
        <div className="sm:px-6 lg:px-8">
          <Carousel>
            {slides.map((s) => (
              <div key={s.title} className="relative min-w-0 flex-[0_0_100%] pl-4">
                <div className={`w-100 h-32 ${s.color}`}>{s.title}</div>
              </div>
            ))}
          </Carousel>
        </div>
      </main>
    </div>
  )
}

export default App
```

At this point, you can slide left and right to switch between the slides. You can replace the inner div with an _img_ tag to show images.

## Advanced component

Users expect indicators for each slide, including an active indicator for the current slide and a means to navigate between slides. Let's enhance _Carousel.tsx_ to implement indicators and navigation in a more advanced version:

```tsx
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel-react'

function clsx(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

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
        !active ? 'opacity-50' : '',
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
```

## Recap

As we've seen, styling a carousel using Tailwind is quite straightforward. Managing the carousel state becomes simple with the combination of Embla's capabilities and React hooks.
