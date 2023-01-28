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
      <div
        style={{
          background: '#1a1a1a',
          position: 'fixed',
          zIndex: 1000,
          top: 54,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          style={{
            background: '#00e0c4',
            color: '#303030',
            cursor: 'pointer',
            outline: 'none',
            border: 'none',
            width: 200,
            height: 48,
            fontSize: 15,
            padding: 6,
          }}
          onClick={() => setIsDebugging(!isDebugging)}
        >
          <span
            style={{
              fontWeight: 600,
            }}
          >
            {isDebugging ? 'Normal' : 'Debug'}
          </span>{' '}
          mode
        </button>
      </div>
      <div
        style={{
          textAlign: 'center',
          position: 'fixed',
          zIndex: 1000,
          bottom: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <a
          style={{
            textAlign: 'center',
            background: '#10101000',
            color: '#00e0c4',
            cursor: 'pointer',
            height: 40,
            fontSize: 32,
            padding: 4,
          }}
          href="https://github.com/nguyend-nam/r3f-image-gallery"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#00e0c4"
              d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
            />
          </svg>
        </a>
      </div>
      <Canvas
        camera={{
          fov: fov,
          near: near,
          far: far,
          position: [0, 0, zPosition],
        }}
        style={{
          height: '100vh',
          backgroundColor: isDebugging ? '#fff' : '#0e1019',
        }}
      >
        <Component {...pageProps} isDebugging={isDebugging} />
      </Canvas>
    </StrictMode>
  )
}

export default MyApp
