import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { ImageList } from '../components/ImageList'
import { Mouse } from '../components/Mouse'
import { Html } from '@react-three/drei'

extend({ Canvas })

const Loader = () => (
  <Html center style={{ fontSize: 18 }}>
    <div>Loading</div>
  </Html>
)

const Home = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true)
  const [hovered, setHovered] = useState<boolean>(false)
  const [mouseDepth, setMouseDepth] = useState<number>(0.5)
  useEffect(() => {
    setIsSSR(false)
  }, [])
  return (
    !isSSR && (
      <Canvas
        camera={{
          // zoom: 45,
          fov: 100,
          near: 0.1,
          far: 1000,
          position: [0, 0, 7],
        }}
        // orthographic
        style={{ height: '100vh', backgroundColor: '#fff' }}
      >
        <Suspense fallback={<Loader />}>
          <ImageList setHovered={setHovered} setMouseDepth={setMouseDepth} />
          <Mouse hovered={hovered} depth={mouseDepth} />
        </Suspense>
      </Canvas>
    )
  )
}

export default Home
