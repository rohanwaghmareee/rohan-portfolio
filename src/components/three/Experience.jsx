import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import CameraRig from './CameraRig'
import KineticSculpture from './KineticSculpture'
import ProjectStage from './ProjectStage'
import CapabilityStage from './CapabilityStage'
import MetricStage from './MetricStage'
import JourneyStage from './JourneyStage'
import ContactStage from './ContactStage'
import Particles from './Particles'
import TechGrid from './TechGrid'
import Network from './Network'
import Shards from './Shards'
import ForceField from './ForceField'

// ---------------------------------------------------------------------------
// The fixed, full-viewport WebGL stage (z-0, behind the DOM overlay).
//
// AMBIENT / TECH LAYER (always on, cheap, big mood boost):
//   TechGrid    → sci-fi floor grid under the whole flight path
//   Network     → additive data constellation of lines + nodes
//   Shards      → tumbling tetrahedron debris field
//   ForceField  → two counter-rotating wireframe energy shells
//   Sparkles    → shimmering particle clouds around key objects
//   Particles   → ambient dust drifting through the scene
//   Bloom       → post-processing glow (bright emissives bleed light)
//   Vignette    → subtle cinematic corner darkening
//
// PERFORMANCE / MEMORY NOTES
// --------------------------
//  * dpr={[1, 2]} caps the device-pixel-ratio at 2, halving fill-rate on
//    high-density phones while staying crisp on desktop.
//  * Geometries/materials created declaratively are cached by React and
//    auto-disposed by react-three-fiber on unmount. Imperatively built
//    buffers (see Network.jsx) are passed via props so R3F also disposes them.
//  * Suspense + <Preload all /> keeps async assets (GLBs, textures) warm so
//    the scroll never hitches on a mid-scroll fetch.
//  * EffectComposer renders at half resolution (buffers={{ type: 'HalfFloat' }})
//    for a solid bloom look without the full GPU cost.
//
// TO ADD YOUR OWN MODEL
//   Replace <KineticSculpture /> below with <CustomModel /> (see ModelLoader.jsx).
// ---------------------------------------------------------------------------

export default function Experience() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        camera={{ fov: 42, near: 0.1, far: 120, position: [0, 0.9, 8] }}
      >
        {/* Depth haze so geometry dissolves into the charcoal background */}
        <fog attach="fog" args={['#0a0a0b', 14, 34]} />

        {/* Lighting: key + rim + accent pumps */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 4]} intensity={2.2} />
        <pointLight position={[-6, -2, 2]} intensity={45} color="#C8FF3D" />
        <pointLight position={[4, -3, -4]} intensity={18} color="#FF5C35" />

        {/* ---- ambient tech layer ----------------------------------------- */}
        <TechGrid />
        <ForceField />
        <Network />
        <Shards />
        <Sparkles count={70} scale={[7, 5, 7]} position={[0, 0.6, 0]} size={2.5} speed={0.35} color="#C8FF3D" />

        <Suspense fallback={null}>
          <KineticSculpture />  {/* hero centrepiece */}
          <ProjectStage />      {/* floating "project cards" — panel 2 */}
          <CapabilityStage />   {/* frontend/backend towers — panel 3 */}
          <MetricStage />       {/* rings / orbs — panel 4 */}
          <JourneyStage />      {/* milestone stack — panel 5 */}
          <ContactStage />      {/* pulsing ring — panel 6 */}
          <Sparkles count={35} scale={[3, 3, 3]} position={[0, 0.5, 0]} size={3} speed={0.4} color="#F4F2EC" />
          <Preload all />
        </Suspense>

        <Particles />
        <CameraRig />

        {/* Post-processing: bloom + vignette */}
        <EffectComposer multisampling={0} bufferType="HalfFloat">
          <Bloom intensity={0.55} luminanceThreshold={0.9} luminanceSmoothing={0.6} mipmapBlur />
          <Vignette eskil={false} offset={0.22} darkness={0.72} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}