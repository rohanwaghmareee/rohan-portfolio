import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '../../store/scrollStore'

// ---------------------------------------------------------------------------
// Glowing "data constellation" — a sphere of connection lines + nodes with
// additive blending around the whole scene. Reads as a live data network.
// Geometry is built once in useMemo and auto-disposed on unmount.
//
// Tune COUNT (density) and MAX_EDGE (how far nodes connect).
// ---------------------------------------------------------------------------

const COUNT = 200
const MAX_EDGE = 3.4

export default function Network() {
  const group = useRef()
  const linesRef = useRef()

  const { points, edges } = useMemo(() => {
    const pts = []
    for (let i = 0; i < COUNT; i++) {
      const r = 4 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pts.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.7,
          r * Math.sin(phi) * Math.sin(theta) - 1,
        ),
      )
    }

    const edgesArr = []
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        if (pts[i].distanceToSquared(pts[j]) < MAX_EDGE * MAX_EDGE) {
          edgesArr.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        }
      }
    }

    return {
      points: new THREE.BufferAttribute(new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z])), 3),
      edges: new THREE.BufferAttribute(new Float32Array(edgesArr), 3),
    }
  }, [])

  const lineGeo = useMemo(() => new THREE.BufferGeometry().setAttribute('position', edges), [edges])
  const pointGeo = useMemo(() => new THREE.BufferGeometry().setAttribute('position', points), [points])

  useFrame((state, delta) => {
    const { mouse } = useScrollStore.getState()
    const t = state.clock.elapsedTime
    const g = group.current
    g.rotation.y += delta * 0.02
    g.rotation.x = mouse.y * -0.08 + Math.sin(t * 0.2) * 0.02
    if (linesRef.current) {
      linesRef.current.material.opacity = 0.26 + Math.sin(t * 0.6) * 0.06
    }
  })

  return (
    <group ref={group}>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial
          color="#C8FF3D"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      <points geometry={pointGeo}>
        <pointsMaterial
          size={0.05}
          color="#F4F2EC"
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}