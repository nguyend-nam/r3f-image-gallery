import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { ImageList } from '../components/ImageList'
import { Mouse } from '../components/Mouse'
import { Html, useCursor } from '@react-three/drei'
import { PerspectiveCamera } from 'three'
import { perspectiveCameraAttr } from '../constants'

extend({ Canvas })

const Loader = () => (
  <Html center style={{ fontSize: 18 }}>
    <div>Loading</div>
  </Html>
)

const CameraHelper = () => {
  const camera = new PerspectiveCamera(100, 16.1 / 8.34, 1, 15.5)
  return (
    <group position={[0, 1, 2]}>
      <cameraHelper args={[camera]} />
    </group>
  )
}

const Home = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true)
  const [hovered, setHovered] = useState<boolean>(false)
  useCursor(hovered, 'none', 'default')
  const [mouseDepth, setMouseDepth] = useState<number>(0.5)
  useEffect(() => {
    setIsSSR(false)
  }, [])
  const { fov, near, far, zPosition } = perspectiveCameraAttr

  return (
    !isSSR && (
      <Canvas
        camera={{
          fov: fov,
          near: near,
          far: far,
          position: [0, 0, zPosition],
        }}
        style={{ height: '100vh', backgroundColor: '#000' }}
      >
        <Suspense fallback={<Loader />}>
          <ImageList setHovered={setHovered} setMouseDepth={setMouseDepth} />
          <Mouse hovered={hovered} depth={mouseDepth} />
          <CameraHelper />
        </Suspense>
      </Canvas>
    )
  )
}

export default Home
