import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, extend, RootState, useThree } from '@react-three/fiber'
import { ImageList } from '../components/ImageList'
import { Mouse } from '../components/Mouse'
import { Html, useCursor } from '@react-three/drei'
import { PerspectiveCamera } from 'three'
import { perspectiveCameraAttr, screenSize } from '../constants'
import { scaleFromPixelSize } from '../utils'

extend({ Canvas })

const Loader = () => (
  <Html center style={{ fontSize: 18, color: '#fff' }}>
    <div>Loading</div>
  </Html>
)

const CameraHelper = () => {
  const { fov, near, far } = perspectiveCameraAttr
  const { viewport } = useThree<RootState>()
  const camera = new PerspectiveCamera(
    fov,
    viewport.width / viewport.height,
    near,
    far,
  )
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

  const { viewport } = useThree<RootState>()

  // number of columns passed into ImageList component
  const [columns, setColumns] = useState<number>(3)

  useEffect(() => {
    setIsSSR(false)

    if (viewport.width <= scaleFromPixelSize(screenSize.sm)) setColumns(1)
    else if (viewport.width <= scaleFromPixelSize(screenSize.md)) setColumns(2)
    else setColumns(3)
  }, [viewport.width])

  return (
    !isSSR && (
      <Suspense fallback={<Loader />}>
        <ImageList
          setHovered={setHovered}
          setMouseDepth={setMouseDepth}
          columns={columns}
        />
        <Mouse hovered={hovered} depth={mouseDepth} />
        {/* <CameraHelper /> */}
      </Suspense>
    )
  )
}

export default Home
