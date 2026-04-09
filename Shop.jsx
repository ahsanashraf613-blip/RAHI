import { motion } from 'framer-motion'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Shop({ navigate }) {
  return (
    <main className="min-h-screen pt-28 pb-24 bg-void">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

        {/* Page header */}
        <header
          className="mb-20 grid lg:grid-cols-2 gap-8 items-end border-b pb-12"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div>
            <motion.p
              className="text-mist text-xs tracking-[0.25em] uppercase mb-4 font-body"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Autumn / Winter 2025
            </motion.p>
            <div className="overflow-hidden">
              <motion.h1
                className="font-display text-chalk leading-none"
                style={{ fontSize: 'clamp(3.5rem,8vw,7rem)' }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                Collection
              </motion.h1>
            </div>
          </div>

          <motion.div
            className="lg:text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-mist text-sm font-body leading-relaxed max-w-xs lg:ml-auto">
              {products.length} pieces. Each one a study in restraint.
            </p>
          </motion.div>
        </header>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onClick={(p) => navigate('product', p)}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          className="mt-24 pt-12 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-mist text-xs tracking-[0.15em] uppercase font-body">
            Complimentary UK shipping on all orders
          </p>
          <p className="text-mist text-xs tracking-[0.15em] uppercase font-body">
            Returns within 14 days
          </p>
        </motion.div>
      </div>
    </main>
  )
}
