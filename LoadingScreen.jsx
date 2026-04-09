import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#0F0F0F' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
    >
      {/* Brand name masked reveal */}
      <div className="overflow-hidden mb-8">
        <motion.h1
          className="font-display text-chalk tracking-[0.35em] text-xl uppercase"
          initial={{ y: '110%' }}
          animate={{
            y: 0,
            transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
          }}
        >
          Maison Noir
        </motion.h1>
      </div>

      {/* Thin progress bar */}
      <div className="w-32 h-px overflow-hidden" style={{ background: '#1A1A1A' }}>
        <motion.div
          className="h-full"
          style={{ background: '#E5E5E5' }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{
            scaleX: 1,
            transition: { duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
          }}
        />
      </div>

      <motion.p
        className="mt-5 text-mist text-[10px] tracking-[0.25em] uppercase font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.6 } }}
      >
        Collection 2025
      </motion.p>
    </motion.div>
  )
}
