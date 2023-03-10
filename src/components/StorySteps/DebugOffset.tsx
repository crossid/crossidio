import React from 'react'
import { isOffsetInPixels } from './utils'

const markerStyles = {
  position: 'fixed' as 'fixed',
  left: 0,
  width: '100%',
  height: 0,
  borderTop: '2px dashed black',
  zIndex: 9999,
}

const offsetTextStyles = {
  fontSize: '12px',
  fontFamily: 'monospace',
  margin: 0,
  padding: 6,
}

const calcTop = (offset: number | string) => {
  const offsetInPixels = isOffsetInPixels(offset)
  if (offsetInPixels) {
    return offset
  } else {
    return `${(offset as number) * 100}%`
  }
}

// DebugOffset draws a marker that takes into consideration the root element's offset
// this is useful for debugging when intersection starts and when it ends.
const DebugOffset = ({ offset }: { offset: number | string }) => {
  const top = calcTop(offset)
  return (
    <div style={{ ...markerStyles, top }}>
      <p style={offsetTextStyles}>trigger: {offset}</p>
    </div>
  )
}

export default DebugOffset
