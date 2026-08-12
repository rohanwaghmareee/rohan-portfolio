import { useGLTF } from '@react-three/drei'

// ---------------------------------------------------------------------------
// HOW TO HOOK UP YOUR OWN GLTF / GLB MODEL
// ---------------------------------------------------------------------------
// 1. Drop the file into `portfolio/public/models/` (e.g. `car.glb`).
// 2. In Experience.jsx replace <KineticSculpture /> with <CustomModel />.
// 3. If your model uses Draco-compressed geometry, download the decoder
//    files into `portfolio/public/draco/` and uncomment the `dracoPath`
//    option below.
//
// <Suspense> already wraps the scene in Experience.jsx, so react-three-fiber
// suspends until the model is fetched + decoded, and <Preload all /> warms
// the cache. Add a <useGLTF.preload> call at module scope (see below) so the
// loader starts during the preloader screen instead of after it.
//
// NOTE: geometry/material auto-dispose applies to useGLTF models too — drei
// registers them with the renderer's dispose cache. Nothing extra needed.
// ---------------------------------------------------------------------------

export default function CustomModel({ url = '/models/your-model.glb' }) {
  const { scene } = useGLTF(url /* , { dracoPath: '/draco/' } */)

  // `scene` is a THREE.Group. Tune transforms/material here if your exporter
  // didn't author them to your liking.
  return (
    <primitive
      object={scene}
      scale={1.5}
      position={[0, -1, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  )
}

// Warm the cache during the preloader so the scroll starts hitch-free.
useGLTF.preload('/models/your-model.glb')
