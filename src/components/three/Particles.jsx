import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Ambient dust field across the whole experience.
// Points drift slowly via group rotation — cheaper than animating each point.
// The position array is memoized once (never rebuilt per frame) and the
// BufferAttribute is disposed automatically by react-three-fiber on unmount.
// ---------------------------------------------------------------------------

export default function Particles({ count = 900 }) {
  const points = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = -4 + Math.random() * 14
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.015
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#8b8b93"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
