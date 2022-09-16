import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StrictMode } from 'react'
import { Canvas } from '@react-three/fiber'
import { perspectiveCameraAttr } from '../constants'

function MyApp({ Component, pageProps }: AppProps) {
  const { fov, near, far, zPosition } = perspectiveCameraAttr

  return (
    <StrictMode>
      <Canvas
        camera={{
          fov: fov,
          near: near,
          far: far,
          position: [0, 0, zPosition],
        }}
        style={{ height: '100vh', backgroundColor: '#000' }}
      >
        <Component {...pageProps} />
      </Canvas>
    </StrictMode>
  )
}

export default MyApp
