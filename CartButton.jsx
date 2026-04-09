import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartButton({ price }) {
  const [state, setState] = useState('idle') // 'idle' | 'adding' | 'done'

  const handleClick = () => {
    if (state !== 'idle') return
    setState('adding')
    setTimeout(() => setState('done'),  900)
    setTimeout(() => setState('idle'), 2900)
  }

  const labels = {
    idle:   `Add to Cart — ${price}`,
    adding: 'Adding…',
    done:   'Added to Cart ✓',
  }

  return (
    <button
      onClick={handleClick}
      disabled={state === 'adding'}
      className="relative w-full overflow-hidden h-12 font-body text-xs tracking-[0.2em] uppercase"
      style={{
        background: state === 'done' ? '#1A1A1A' : '#FFFFFF',
        color:      state === 'done' ? '#E5E5E5' : '#0F0F0F',
        border:     state === 'done' ? '1px solid rgba(255,255,255,0.15)' : 'none',
        transition: 'background 0.4s ease, color 0.4s ease, border 0.4s ease',
        cursor:     state === 'adding' ? 'wait' : 'pointer',
      }}
    >
      {/* Sweep fill on "adding" */}
      {state === 'adding' && (
        <motion.div
          className="absolute inset-0 origin-left"
          style={{ background: 'rgba(229,229,229,0.2)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          className="relative z-10 inline-block"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          exit={{   y: -10, opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
        >
          {labels[state]}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
