import { useState, useCallback } from 'react'

/**
 * Returns { style, onMouseMove, onMouseLeave }
 * Attach to a card container. strength controls tilt intensity.
 */
export default function useParallax(strength = 12) {
  const [transform, setTransform] = useState('')

  const onMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      setTransform(
        `perspective(800px) rotateY(${dx * strength * 0.4}deg) rotateX(${-dy * strength * 0.4}deg)`
      )
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => {
    setTransform('perspective(800px) rotateY(0deg) rotateX(0deg)')
  }, [])

  return {
    style: {
      transform,
      transition: 'transform 0.15s ease-out',
      transformStyle: 'preserve-3d',
    },
    onMouseMove,
    onMouseLeave,
  }
}
