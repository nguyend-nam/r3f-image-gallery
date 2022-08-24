import type { NextPage } from 'next'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import Figure from '../components/Figure/Figure'

const Home: NextPage = () => {
  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 6] }}
      style={{ height: '100vh' }}
    >
      <Figure position={[3, 0, 0]} />
      <Figure position={[-3, 0, 0]} />
    </Canvas>
  )
}

export default Home
