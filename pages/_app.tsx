import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StrictMode, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { perspectiveCameraAttr } from '../constants'

function MyApp({ Component, pageProps }: AppProps) {
  const { fov, near, far, zPosition } = perspectiveCameraAttr
  const [isDebugging, setIsDebugging] = useState<boolean>(false)

  return (
    <StrictMode>
      <button
        style={{
          backgroundColor: '#fff',
          position: 'fixed',
          zIndex: 1000,
          top: 75,
          left: 25,
          cursor: 'pointer',
          outline: 'none',
          border: 'none',
          padding: 10,
        }}
        onClick={() => setIsDebugging(!isDebugging)}
      >
        {isDebugging ? 'Debug mode' : 'Normal mode'}
      </button>
      <Canvas
        camera={{
          fov: fov,
          near: near,
          far: far,
          position: [0, 0, zPosition],
        }}
        style={{ height: '100vh', backgroundColor: '#000' }}
      >
        <Component {...pageProps} isDebugging={isDebugging} />
      </Canvas>
    </StrictMode>
  )
}

export default MyApp
