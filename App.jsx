import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import LoadingScreen from './components/LoadingScreen'

const pageVariants = {
  initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: 'blur(4px)',
    transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] },
  },
}

export default function App() {
  const [route, setRoute] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(t)
  }, [])

  const navigate = (page, product = null) => {
    setSelectedProduct(product)
    setRoute(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-void min-h-screen font-body">
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navigation navigate={navigate} currentRoute={route} />
          <AnimatePresence mode="wait">
            <motion.div
              key={route}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {route === 'home'    && <Home    navigate={navigate} />}
              {route === 'shop'    && <Shop    navigate={navigate} />}
              {route === 'product' && <Product product={selectedProduct} navigate={navigate} />}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
