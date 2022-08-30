import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import Wave from '../components/Wave/Wave'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const CameraController = () => {
  const { camera, gl } = useThree()
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement)

    controls.minDistance = 6
    controls.maxDistance = 8
    return () => {
      controls.dispose()
    }
  }, [camera, gl])
  return null
}

const Home: NextPage = () => {
  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 7] }}
      style={{ height: '100vh', backgroundColor: '#f8c8cf' }}
    >
      <CameraController />
      {/* <Figure position={[3, 0, 0]} /> */}
      {/* <Figure position={[0, 0, 0]} /> */}
      {/* <mesh receiveShadow>
        <planeBufferGeometry attach="geometry" args={[2, 2.5]} />
        <meshPhongMaterial attach="material" color="red" />
      </mesh> */}
      <pointLight position={[10, 10, 10]} />
      <Wave />
    </Canvas>
  )
}

export default Home
