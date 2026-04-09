import { useState, useEffect, useRef } from 'react'

export default function useScrollHide(threshold = 10) {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 80) {
        setVisible(true)
        lastY.current = y
        return
      }
      if (Math.abs(y - lastY.current) < threshold) return
      setVisible(y < lastY.current) // reveal on scroll up
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return visible
}
