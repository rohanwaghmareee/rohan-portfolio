import { Grid } from '@react-three/drei'

// ---------------------------------------------------------------------------
// Techy sci-fi floor grid. Sits below the whole flight path so there's always
// an "environment" under the camera across every panel. `infiniteGrid` fades
// to the fog colour near the horizon.
// ---------------------------------------------------------------------------

export default function TechGrid() {
  return (
    <Grid
      position={[0, -3, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      args={[24, 24]}
      cellSize={0.6}
      cellThickness={0.6}
      cellColor="#1f1f26"
      sectionSize={3}
      sectionThickness={1.1}
      sectionColor="#3a3a46"
      fadeDistance={30}
      fadeStrength={1.6}
      infiniteGrid
      followCamera={false}
    />
  )
}