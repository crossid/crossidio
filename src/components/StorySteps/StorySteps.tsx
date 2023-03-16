// This is a fork of https://github.com/jsonkao/react-scrollama with some tweaks and support for TS.
//
import React, { ReactNode, useMemo, useState } from 'react'
import DebugOffset from './DebugOffset'
import { IDirection, IOnStepEnterOrExit, IOnStepProress } from './types'
import { isBrowser, isOffsetInPixels } from './utils'

const createThreshold = (theta: number, height: number) => {
  const count = Math.ceil(height / theta)
  const t = []
  const ratio = 1 / count
  for (let i = 0; i <= count; i += 1) {
    t.push(i * ratio)
  }
  return t
}

const StorySteps = ({
  debug,
  offset = 0.3,
  threshold = 4,
  children,
  onStepEnter = () => {},
  onStepExit = () => {},
  onStepProgress = null,
}: {
  // true renders a debugging marker
  debug?: boolean
  // How far from the top of the viewport to trigger a step (as a proportion of view height)
  // this is in pixels or percent of root margin, see: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
  // number (from 0 to 1) or pixel value (e.g. "300px")
  offset: number | string
  // Granularity of the progress interval in pixels, smaller means more granular.
  // must be a number > 1
  threshold?: number
  // a callback invoked when the top or bottom edge of a step enters the offset threshold
  onStepEnter?: (resp: IOnStepEnterOrExit) => void
  // a callback invoked when the top or bottom edge of a step exits the offset threshold.
  onStepExit?: (resp: IOnStepEnterOrExit) => void
  // a callback invoked when the progress a step has made through the threshold.
  onStepProgress?: ((resp: IOnStepProress) => void) | null
  // an array of <Step> components
  children: ReactNode
}) => {
  const isOffsetDefinedInPixels = isOffsetInPixels(offset)
  const [lastScrollTop, setLastScrollTop] = useState<number>(0)
  const [windowInnerHeight, setWindowInnerHeight] = useState<number | null>(null)

  const handleSetLastScrollTop = (scrollTop: number) => {
    setLastScrollTop(scrollTop)
  }

  const handleWindowResize = (e: Event) => {
    setWindowInnerHeight(window.innerHeight)
  }

  React.useEffect(() => {
    if (isOffsetDefinedInPixels) {
      window.addEventListener('resize', handleWindowResize)
      return () => {
        window.removeEventListener('resize', handleWindowResize)
      }
    }
  }, [isOffsetDefinedInPixels])

  const innerHeight = isBrowser() ? windowInnerHeight || window.innerHeight : 0

  const offsetValue =
    isOffsetDefinedInPixels && typeof offset === 'string'
      ? +offset.replace('px', '') / innerHeight
      : offset

  const progressThreshold = useMemo(
    () => createThreshold(threshold, innerHeight),
    [innerHeight, threshold]
  )

  return (
    <React.Fragment>
      {debug && <DebugOffset offset={offset} />}
      {React.Children.map(children, (child, i) => {
        if (!child) return
        return React.cloneElement(child as React.ReactElement<any>, {
          storyStepsId: `react-storysteps-${i}`,
          offset: offsetValue,
          onStepEnter,
          onStepExit,
          onStepProgress,
          lastScrollTop,
          handleSetLastScrollTop,
          progressThreshold,
          innerHeight,
        })
      })}
    </React.Fragment>
  )
}

export default StorySteps
