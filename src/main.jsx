import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ---------------------------------------------------------------------------
// Entry point. The whole experience mounts here:
//   <App />           -> layout + overlay UI + 3D canvas orchestration
//   <Experience />    -> fixed, full-screen react-three-fiber canvas (z-0)
//   sticky <section>s -> stacked 100vh panels that drive the scroll timeline
// ---------------------------------------------------------------------------
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
