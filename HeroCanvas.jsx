import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FabricShape from './FabricShape'

gsap.registerPlugin(ScrollTrigger)

export default function HeroCanvas() {
  const containerRef = useRef(null)
  const groupRef = useRef(null)

  useEffect(() => {
    // Wait a tick for the ref to populate
    const raf = requestAnimationFrame(() => {
      if (!groupRef.current || !containerRef.current) return

      const proxy = { rotate: 0, scale: 1 }

      const ctx = gsap.context(() => {
        gsap.to(proxy, {
          rotate: Math.PI * 1.5,
          scale: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.4,
            onUpdate: () => {
              if (!groupRef.current) return
              groupRef.current.rotation.x = proxy.rotate * 0.4
              groupRef.current.rotation.y = proxy.rotate
              groupRef.current.scale.setScalar(proxy.scale)
            },
          },
        })
      })

      return () => ctx.revert()
    })

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor onDecline={() => {}}>
          <AdaptiveDpr pixelated />
        </PerformanceMonitor>

        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 3]}   intensity={1.2} color="#ffffff" />
        <directionalLight position={[-3, -2, -3]} intensity={0.3} color="#E5E5E5" />

        <Suspense fallback={null}>
          <Environment preset="studio" />
          <group ref={groupRef}>
            <FabricShape />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}
