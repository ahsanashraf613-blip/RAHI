import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroCanvas from '../components/HeroCanvas'

gsap.registerPlugin(ScrollTrigger)

function SplitReveal({ text, className = '', delay = 0 }) {
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.08,
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Home({ navigate }) {
  const marqueeRef = useRef(null)

  useEffect(() => {
    const el = marqueeRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -50,
        ease: 'none',
        duration: 22,
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <main className="relative bg-void">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col justify-end pb-16 px-6 lg:px-16 overflow-hidden">
        <HeroCanvas />

        {/* Bottom gradient so text reads */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(15,15,15,0.92) 0%, rgba(15,15,15,0.2) 45%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-screen-xl mx-auto w-full">
          <motion.p
            className="text-mist text-xs tracking-[0.25em] uppercase mb-4 font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.8 } }}
          >
            Collection 2025
          </motion.p>

          <h1 className="font-display text-chalk leading-none mb-8 text-[clamp(3.5rem,9vw,9rem)]">
            <SplitReveal text="The Art" delay={0.1} />
            <br />
            <SplitReveal text="of Silence" delay={0.3} />
          </h1>

          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.7 } }}
          >
            <button
              onClick={() => navigate('shop')}
              className="group flex items-center gap-3 text-chalk text-xs tracking-[0.2em] uppercase font-body"
            >
              <span
                className="h-px bg-chalk transition-all duration-500"
                style={{ width: '2.5rem', transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                onMouseEnter={(e) => (e.currentTarget.style.width = '4rem')}
                onMouseLeave={(e) => (e.currentTarget.style.width = '2.5rem')}
              />
              Explore Collection
            </button>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.8, duration: 0.8 } }}
        >
          <motion.div
            className="w-px h-10"
            style={{ background: '#A0A0A0' }}
            animate={{ scaleY: [1, 0.25, 1], originY: 0 }}
            transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
          />
          <span
            className="text-mist text-[9px] tracking-[0.2em] uppercase font-body"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ── Marquee ────────────────────────────────────────────────────── */}
      <div
        className="overflow-hidden border-t border-b py-4"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div
          ref={marqueeRef}
          className="flex gap-16 whitespace-nowrap"
          style={{ width: '200%' }}
        >
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="text-mist text-xs tracking-[0.3em] uppercase font-body flex-shrink-0"
            >
              Maison Noir &nbsp;·&nbsp; Autumn Winter 2025 &nbsp;·&nbsp; Paris
            </span>
          ))}
        </div>
      </div>

      {/* ── Editorial section ──────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-16 py-32 grid lg:grid-cols-2 gap-16 items-end">
        <div>
          <motion.p
            className="text-mist text-xs tracking-[0.2em] uppercase mb-6 font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Philosophy
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-chalk leading-none"
              style={{ fontSize: 'clamp(3rem,7vw,5.5rem)' }}
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              Fabric<br /><em>as Form</em>
            </motion.h2>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-silver text-sm font-body leading-relaxed max-w-sm mb-8">
            Every garment begins in silence — a single thread pulled across a darkened room.
            Our process is one of reduction: removing everything that does not serve the body,
            until only the essential remains.
          </p>
          <button
            onClick={() => navigate('shop')}
            className="border px-8 py-3 text-xs tracking-[0.2em] uppercase font-body text-silver hover:bg-white hover:text-void transition-all duration-500"
            style={{
              borderColor: 'rgba(255,255,255,0.2)',
              transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            View Collection
          </button>
        </motion.div>
      </section>

      {/* ── Full-bleed image strip ─────────────────────────────────────── */}
      <section
        className="mx-6 lg:mx-16 mb-32 overflow-hidden relative"
        style={{ height: '60vh' }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
            alt="Fashion editorial"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'rgba(15,15,15,0.35)' }}
        >
          <motion.p
            className="font-display text-chalk text-center italic"
            style={{ fontSize: 'clamp(2rem,5vw,4rem)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            "Silence is the ultimate luxury."
          </motion.p>
        </div>
      </section>
    </main>
  )
}
