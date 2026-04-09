import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, AdaptiveDpr } from '@react-three/drei'
import FabricShape from '../components/FabricShape'
import CartButton from '../components/CartButton'

export default function Product({ product, navigate }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [activeTab, setActiveTab] = useState('details')

  if (!product) {
    navigate('shop')
    return null
  }

  const tabs = ['details', 'sizing', 'care']

  const tabContent = {
    details: [
      { label: 'Material', value: product.material },
      { label: 'Origin',   value: product.origin   },
      { label: 'Category', value: product.category },
    ],
    sizing: [
      { label: 'Fit',      value: 'Oversized'           },
      { label: 'Model',    value: '6\'1" wearing size M' },
      { label: 'Length',   value: 'Below hip'            },
    ],
    care: [
      { label: 'Wash',    value: 'Cold hand wash only' },
      { label: 'Dry',     value: 'Lay flat to dry'     },
      { label: 'Iron',    value: 'Low heat, reverse'   },
    ],
  }

  return (
    <main className="min-h-screen bg-void">
      <div className="lg:flex lg:min-h-screen">

        {/* ── LEFT: Sticky 3D viewer ──────────────────────────────────── */}
        <aside
          className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen relative overflow-hidden"
          style={{ background: '#111111' }}
        >
          {/* 3D Canvas */}
          <div className="absolute inset-0">
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 5], fov: 42 }}
              gl={{ antialias: true, alpha: false }}
              style={{ background: '#111111' }}
            >
              <AdaptiveDpr pixelated />
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 5, 3]}   intensity={1.4} />
              <directionalLight position={[-2, -2, -2]} intensity={0.2} color="#E5E5E5" />
              <Suspense fallback={null}>
                <Environment preset="studio" />
                <FabricShape />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.6}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Product name overlay */}
          <div className="absolute bottom-8 left-8 right-8 pointer-events-none z-10">
            <p className="text-mist text-[10px] tracking-[0.2em] uppercase font-body mb-1">
              {product.category}
            </p>
            <h2 className="font-display text-chalk text-4xl leading-tight">
              {product.name}
            </h2>
          </div>

          {/* Drag hint badge */}
          <div
            className="absolute top-20 right-5 z-10 text-[9px] tracking-[0.15em] uppercase font-body flex items-center gap-2"
            style={{
              color:                '#666',
              background:           'rgba(15,15,15,0.55)',
              backdropFilter:       'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding:              '5px 9px',
              border:               '0.5px solid rgba(255,255,255,0.07)',
            }}
          >
            <span
              className="inline-block border rounded-full"
              style={{ width: 10, height: 10, borderColor: '#666' }}
            />
            Drag to rotate
          </div>
        </aside>

        {/* ── RIGHT: Scrollable product details ──────────────────────── */}
        <section className="lg:w-1/2 px-8 lg:px-16 pt-24 lg:pt-28 pb-24 flex flex-col gap-10">

          {/* Back link */}
          <motion.button
            onClick={() => navigate('shop')}
            className="self-start text-mist text-xs tracking-[0.15em] uppercase font-body flex items-center gap-2 hover:text-chalk transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ← Collection
          </motion.button>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-chalk" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
              {product.price}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-silver font-body text-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {product.description}
          </motion.p>

          {/* Divider */}
          <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

          {/* Size selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-mist text-[10px] tracking-[0.2em] uppercase font-body">
                Select Size
              </p>
              <button className="text-mist text-[10px] tracking-[0.1em] uppercase font-body hover:text-chalk transition-colors">
                Size Guide
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className="w-12 h-12 font-body text-xs tracking-widest uppercase transition-all duration-300"
                  style={{
                    border:     selectedSize === size
                                  ? '1px solid #FFFFFF'
                                  : '1px solid rgba(255,255,255,0.15)',
                    color:      selectedSize === size ? '#0F0F0F' : '#A0A0A0',
                    background: selectedSize === size ? '#FFFFFF' : 'transparent',
                    transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>

            {!selectedSize && (
              <p className="mt-2 text-mist text-[10px] font-body">Please select a size</p>
            )}
          </motion.div>

          {/* Add to Cart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <CartButton price={product.price} />
          </motion.div>

          {/* Tabs: Details / Sizing / Care */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Tab bar */}
            <div
              className="flex gap-0 border-b mb-6"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="pb-3 mr-8 text-[10px] tracking-[0.2em] uppercase font-body transition-colors duration-300 relative"
                  style={{ color: activeTab === tab ? '#FFFFFF' : '#A0A0A0' }}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-px bg-chalk"
                      layoutId="tabUnderline"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {tabContent[activeTab].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between py-3 border-b font-body text-xs"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <span className="text-mist tracking-[0.1em] uppercase">{label}</span>
                  <span className="text-silver">{value}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Shipping note */}
          <motion.p
            className="text-mist text-[11px] font-body leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Complimentary shipping on all UK orders. Returns accepted within 14 days
            in original condition with tags attached.
          </motion.p>
        </section>
      </div>
    </main>
  )
}
