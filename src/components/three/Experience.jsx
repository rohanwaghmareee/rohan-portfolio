import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import CameraRig from './CameraRig'
import KineticSculpture from './KineticSculpture'
import ProjectStage from './ProjectStage'
import CapabilityStage from './CapabilityStage'
import MetricStage from './MetricStage'
import JourneyStage from './JourneyStage'
import ContactStage from './ContactStage'
import Particles from './Particles'

// ---------------------------------------------------------------------------
// The fixed, full-viewport WebGL stage (z-0, behind the DOM overlay).
//
// PERFORMANCE / MEMORY NOTES
// --------------------------
//  * dpr={[1, 2]} caps the device-pixel-ratio at 2, halving fill-rate on
//    high-density phones while staying crisp on desktop.
//  * Geometries/materials created declaratively (e.g. <icosahedronGeometry>)
//    are cached by React and auto-disposed by react-three-fiber when the
//    mesh unmounts — no manual cleanup needed. If you ever build objects in
//    useMemo/imperatively, mirror them with a dispose() effect, e.g.:
//
//      useEffect(() => () => {
//        geometry.dispose(); material.dispose()
//      }, [geometry, material])
//
//  * Suspense + <Preload all /> keeps async assets (GLBs, textures) warm so
//    the scroll never hitches on a mid-scroll fetch.
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

        {/* Lighting: key + rim + acid-lime accent */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 4]} intensity={2.2} />
        <pointLight position={[-6, -2, 2]} intensity={45} color="#C8FF3D" />
        <pointLight position={[4, -3, -4]} intensity={18} color="#FF5C35" />

        <Suspense fallback={null}>
          <KineticSculpture />  {/* hero centrepiece */}
          <ProjectStage />      {/* floating "project cards" — panel 2 */}
          <CapabilityStage />   {/* frontend/backend towers — panel 3 */}
          <MetricStage />       {/* rings / orbs — panel 4 */}
          <JourneyStage />      {/* milestone stack — panel 5 */}
          <ContactStage />      {/* pulsing ring — panel 6 */}
          <Preload all />
        </Suspense>

        <Particles />
        <CameraRig />
      </Canvas>
    </div>
  )
}
