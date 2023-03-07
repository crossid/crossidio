export function scroll(
  container: HTMLElement,
  elm: HTMLElement,
  duration: number,
  leewayOffset: number
) {
  var pos = getRelativePos(elm)
  scrollTo(container, pos.top, duration, leewayOffset) // duration in seconds
}

interface IPos {
  top: number
  right: number
  bottom: number
  left: number
}

function getRelativePos(elm: HTMLElement): IPos {
  const pnel = elm.parentNode as HTMLElement
  var pPos = pnel.getBoundingClientRect(), // parent pos
    cPos = elm.getBoundingClientRect() // target pos

  return {
    top: cPos.top - pPos.top + pnel.scrollTop,
    right: cPos.right - pPos.right,
    bottom: cPos.bottom - pPos.bottom,
    left: cPos.left - pPos.left,
  }
}

function scrollTo(
  element: HTMLElement,
  to: number,
  duration: number,
  leewayOffset: number,
  onDone?: Function
) {
  var start = element.scrollTop,
    change = to - start,
    startTime = performance.now(),
    val,
    now,
    elapsed,
    t

  function animateScroll() {
    now = performance.now()
    elapsed = (now - startTime) / 1000
    t = elapsed / duration
    element.scrollTop = start - leewayOffset + change * easeInOutQuad(t)

    if (t < 1) window.requestAnimationFrame(animateScroll)
    else onDone && onDone()
  }

  animateScroll()
}

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}
