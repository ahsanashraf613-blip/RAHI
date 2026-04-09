import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useScrollHide from '../hooks/useScrollHide'

export default function Navigation({ navigate, currentRoute }) {
  const visible = useScrollHide()

  const links = [
    { label: 'Home',       page: 'home' },
    { label: 'Collection', page: 'shop' },
  ]

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          key="nav"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0,   opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          exit={{   y: -80,  opacity: 0, transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] } }}
          className="fixed top-0 left-0 right-0 z-50"
          style={{
            background:           'rgba(15, 15, 15, 0.55)',
            backdropFilter:       'blur(18px) saturate(160%)',
            WebkitBackdropFilter: 'blur(18px) saturate(160%)',
            borderBottom:         '0.5px solid rgba(255,255,255,0.07)',
          }}
        >
          <nav className="max-w-screen-xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => navigate('home')}
              className="font-display text-chalk tracking-[0.3em] text-sm uppercase hover:text-silver transition-colors duration-300"
            >
              Maison Noir
            </button>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-10">
              {links.map(({ label, page }) => (
                <li key={label}>
                  <button
                    onClick={() => navigate(page)}
                    className={`text-xs tracking-[0.15em] uppercase font-body transition-colors duration-300 ${
                      currentRoute === page
                        ? 'text-chalk'
                        : 'text-mist hover:text-silver'
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Cart pill */}
            <button className="text-xs tracking-[0.15em] uppercase font-body text-mist hover:text-chalk transition-colors duration-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-silver inline-block" />
              Cart (0)
            </button>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
