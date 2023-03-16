import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains('dark')) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    })
    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  })

  return [theme]
}
