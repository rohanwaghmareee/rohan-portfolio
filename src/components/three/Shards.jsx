import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '../../store/scrollStore'

// ---------------------------------------------------------------------------
// Field of tumbling tetrahedron "shards" scattered through the scene.
// Each shard drifts on its own tiny orbit and rotates on a random axis — a
// Deconstruction-style debris field that reacts to the cursor.
// ---------------------------------------------------------------------------

const SHARDS = 46

export default function Shards() {
  const group = useRef()
  const items = useRef([])

  const data = useMemo(
    () =>
      Array.from({ length: SHARDS }).map((_, i) => {
        const radius = 3 + Math.random() * 6.5
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        return {
          base: new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi) * 0.6,
            radius * Math.sin(phi) * Math.sin(theta) - 1,
          ),
          spin: 0.6 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
          scale: 0.07 + Math.random() * 0.11,
          color: i % 3 === 0 ? '#C8FF3D' : i % 3 === 1 ? '#F4F2EC' : '#4D9DE0',
        }
      }),
    [],
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const { mouse } = useScrollStore.getState()

    const g = group.current
    g.rotation.y = mouse.x * 0.12 + t * 0.02

    data.forEach((d, i) => {
      const m = items.current[i]
      if (!m) return
      m.rotation.x += delta * d.spin
      m.rotation.y += delta * d.spin * 0.7
      m.position.x = d.base.x + Math.sin(t * d.spin + d.phase) * 0.25
      m.position.y = d.base.y + Math.cos(t * d.spin * 0.8 + d.phase) * 0.25
    })
  })

  return (
    <group ref={group}>
      {data.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => (items.current[i] = el)}
          position={d.base}
          scale={d.scale}
        >
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={d.color}
            emissive={d.color}
            emissiveIntensity={0.7}
            transparent
            opacity={0.75}
            flatShading
          />
        </mesh>
      ))}
    </group>
  )
}