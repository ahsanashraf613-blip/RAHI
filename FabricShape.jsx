import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * An organic fabric-like mesh.
 * A subdivided plane distorted with layered sine waves each frame —
 * cheap CPU writes, rich organic motion.
 */
export default function FabricShape() {
  const mesh = useRef()
  const geometryRef = useRef()

  const { geometry, originalPositions } = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(3.5, 3.5, 80, 80)
    const pos = geometry.attributes.position
    const originalPositions = new Float32Array(pos.array.length)
    originalPositions.set(pos.array)
    geometryRef.current = geometry
    return { geometry, originalPositions }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pos = geometry.attributes.position

    for (let i = 0; i < pos.count; i++) {
      const x = originalPositions[i * 3]
      const y = originalPositions[i * 3 + 1]

      const z =
        Math.sin(x * 1.2 + t * 0.6) * 0.22 +
        Math.sin(y * 1.5 + t * 0.4) * 0.18 +
        Math.sin((x + y) * 0.8 + t * 0.3) * 0.14

      pos.setZ(i, z)
    }

    pos.needsUpdate = true
    geometry.computeVertexNormals()

    if (mesh.current) {
      mesh.current.rotation.z = t * 0.05
    }
  })

  return (
    <mesh ref={mesh} geometry={geometry} castShadow>
      <meshStandardMaterial
        color="#E5E5E5"
        roughness={0.85}
        metalness={0.08}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
