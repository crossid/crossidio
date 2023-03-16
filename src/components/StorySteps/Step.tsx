import React, { useState, useMemo, useCallback, useRef, ReactElement } from 'react'
import { useInView } from 'react-intersection-observer'
import { IOnStepEnterOrExit, IOnStepProress } from './types'
import { isBrowser } from './utils'

const calcRootMargin = (offset: number) => {
  return `-${offset * 100}% 0px -${100 - offset * 100}% 0px`
}

const calcProgressRootMargin = (
  direction: 'up' | 'down',
  offset: number,
  node: any,
  innerHeight: number
) => {
  if (!node.current) return '0px'
  const offsetHeight = node.current.offsetHeight / innerHeight
  if (direction === 'down')
    return `${(offsetHeight - offset) * 100}% 0px ${offset * 100 - 100}% 0px`
  return `-${offset * 100}% 0px ${offsetHeight * 100 - (100 - offset * 100)}% 0px`
}

const Step = ({
  data,
  storyStepsId,
  offset = 0,
  progressThreshold,
  innerHeight,
  lastScrollTop = 0,
  handleSetLastScrollTop = () => {},
  onStepEnter = () => {},
  onStepExit = () => {},
  onStepProgress,
  children,
}: {
  // attributes set by user
  //
  // arbitrary data, received in various callbacks
  data?: any
  // attributes set by wrapper
  //
  storyStepsId?: string
  offset?: number
  progressThreshold?: number
  innerHeight?: number
  lastScrollTop?: number
  handleSetLastScrollTop?: (scrollTop: number) => void
  onStepEnter?: (resp: IOnStepEnterOrExit) => void
  onStepExit?: (resp: IOnStepEnterOrExit) => void
  onStepProgress?: (resp: IOnStepProress) => void
  children: ReactElement
}) => {
  if (!storyStepsId) throw 'storyStepId is required, Step mus tbe wrapped by StorySteps'
  const ref = useRef<Element>()
  const scrollTop = isBrowser() ? document.documentElement.scrollTop : 0
  const direction = lastScrollTop < scrollTop ? 'down' : 'up'
  const [isIntersecting, setIsIntersecting] = useState(false)

  const rootMargin = calcRootMargin(offset)
  const { ref: inViewRef, entry } = useInView({
    rootMargin,
    threshold: 0,
  })

  const progressRootMargin = useMemo(
    () => calcProgressRootMargin(direction, offset, ref, innerHeight || 0),
    [direction, offset, ref, innerHeight]
  )

  const { ref: scrollProgressRef, entry: scrollProgressEntry } = useInView({
    rootMargin: progressRootMargin,
    threshold: progressThreshold,
  })

  // // `useCallback` so we don't recreate the function on each render
  const setRefs = useCallback(
    (node: Element) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node)
      scrollProgressRef(node)
    },
    [inViewRef, scrollProgressRef]
  )

  // track progress
  React.useEffect(() => {
    if (!scrollProgressEntry) return
    if (isIntersecting) {
      const { height, top } = scrollProgressEntry.target.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, (window.innerHeight * offset - top) / height))
      onStepProgress &&
        onStepProgress({
          progress,
          storyStepsId,
          data,
          element: scrollProgressEntry.target,
          entry: scrollProgressEntry,
          direction,
        })
    }
  }, [data, direction, isIntersecting, offset, onStepProgress, scrollProgressEntry, storyStepsId])

  // tracks enters and exits
  React.useEffect(() => {
    if (entry && !entry.isIntersecting && isIntersecting) {
      onStepExit({
        element: entry.target,
        storyStepsId,
        data,
        entry,
        direction,
      })
      setIsIntersecting(false)
      handleSetLastScrollTop(scrollTop)
    } else if (entry && entry.isIntersecting && !isIntersecting) {
      setIsIntersecting(true)
      onStepEnter({
        element: entry.target,
        storyStepsId,
        data,
        entry,
        direction,
      })
      handleSetLastScrollTop(scrollTop)
    }
  }, [
    data,
    direction,
    entry,
    handleSetLastScrollTop,
    isIntersecting,
    onStepEnter,
    onStepExit,
    scrollTop,
    storyStepsId,
  ])

  if (!children) return null

  return React.cloneElement(React.Children.only(children), {
    'data-react-storysteps-id': storyStepsId,
    ref: setRefs,
    entry,
  })
}

export default Step
