import { useRef } from 'react'
import { motion } from 'framer-motion'
import useParallax from '../hooks/useParallax'

export default function ProductCard({ product, onClick, index }) {
  const { style: tiltStyle, onMouseMove, onMouseLeave } = useParallax(8)
  const imgRef = useRef(null)

  const handleImgParallax = (e) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 10
    imgRef.current.style.transform = `scale(1.07) translate(${x}px, ${y}px)`
  }

  const handleImgReset = () => {
    if (imgRef.current)
      imgRef.current.style.transform = 'scale(1) translate(0,0)'
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.07,
      }}
      style={tiltStyle}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { onMouseLeave(); handleImgReset() }}
      className="group cursor-pointer"
      onClick={() => onClick(product)}
    >
      {/* Image */}
      <div
        className="overflow-hidden relative mb-4"
        style={{ aspectRatio: '3/4' }}
        onMouseMove={handleImgParallax}
      >
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
          }}
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to top, rgba(15,15,15,0.72) 0%, transparent 52%)',
          }}
        >
          <span className="text-chalk text-xs tracking-[0.2em] uppercase font-body">
            View Product →
          </span>
        </div>

        {/* Category badge */}
        <span
          className="absolute top-4 left-4 text-[10px] tracking-[0.18em] uppercase font-body px-2 py-1"
          style={{
            background:           'rgba(15,15,15,0.6)',
            backdropFilter:       'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color:                '#A0A0A0',
            border:               '0.5px solid rgba(255,255,255,0.1)',
          }}
        >
          {product.category}
        </span>
      </div>

      {/* Meta row */}
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-chalk font-display text-base mb-0.5">{product.name}</h3>
          <p className="text-mist text-xs font-body">{product.material}</p>
        </div>
        <span className="text-silver font-body text-sm">{product.price}</span>
      </div>
    </motion.article>
  )
}
