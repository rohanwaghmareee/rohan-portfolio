import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ---------------------------------------------------------------------------
// Vite config for the immersive portfolio.
// - plugin-react enables the JSX fast-refresh pipeline.
// - host:true lets you preview the site from other devices on your LAN
//   (useful when testing the WebGL experience on a phone).
// ---------------------------------------------------------------------------
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: false,
  },
  build: {
    sourcemap: false,
    // Split heavy vendors into cacheable chunks so the main bundle stays lean
    // and three.js/drei/gsap can be cached independently across deploys.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          drei: ['@react-three/drei'],
          r3f: ['@react-three/fiber'],
          gsap: ['gsap'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
