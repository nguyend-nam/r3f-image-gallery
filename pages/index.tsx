import React, { Suspense, useEffect, useState } from 'react'
import {
  Canvas,
  extend,
  RootState,
  useFrame,
  useThree,
} from '@react-three/fiber'
import { ImageList } from '../components/ImageList'
import { Mouse } from '../components/Mouse'
import { Html, useCursor } from '@react-three/drei'
import { PerspectiveCamera } from 'three'
import { perspectiveCameraAttr, screenSize } from '../constants'
import { scaleFromPixelSize } from '../utils'
import StatsImpl from 'stats.js'

extend({ Canvas })

const Loader = () => (
  <Html center style={{ fontSize: 18, color: '#fff' }}>
    <div>Loading</div>
  </Html>
)

// camera helper
export const CameraHelper = () => {
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

// stats.js
const Stats = () => {
  const [stats] = useState(() => new StatsImpl())

  useEffect(() => {
    stats.showPanel(0)
    document.body.appendChild(stats.dom)
    return () => {
      document.body.removeChild(stats.dom)
    }
  }, [stats])

  return useFrame((state) => {
    stats.begin()
    state.gl.render(state.scene, state.camera)
    stats.end()
  }, 1)
}

const Home = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true)
  const [hovered, setHovered] = useState<boolean[]>(new Array(12).fill(false))
  const [hoveredId, setHoveredId] = useState<number>(0)
  const [hoveredAny, setHoveredAny] = useState<boolean>(false)

  useEffect(() => {
    setHoveredAny(false)
    hovered.some((h) => {
      if (h) setHoveredAny(true)
    })
  }, [hovered])

  const setHoveredById = (id: number, val: boolean) => {
    const arr = new Array(12).fill(false)
    arr[id] = val
    setHovered(arr)
  }

  useCursor(hoveredAny, 'none', 'default')
  const [mouseDepth, setMouseDepth] = useState<number>(0.5)
  // const [mousePosition, setMousePosition] = useState<number[]>([])

  const { viewport } = useThree<RootState>()

  // number of columns passed into ImageList component
  const [columns, setColumns] = useState<number>(3)

  // grid gap of 35px for default
  const [gridGap, setGridGap] = useState<number>(35)

  // dat.gui
  let dat: any
  const renderGUI = async () => {
    dat = await import('dat.gui')
    const gui = new dat.GUI({ width: 200 })

    let debugColumn = {
      columns: columns,
      gridGap: gridGap,
    }

    if (viewport.width <= scaleFromPixelSize(screenSize.sm))
      debugColumn = { columns: 1, gridGap: 25 }
    else if (viewport.width <= scaleFromPixelSize(screenSize.lg))
      debugColumn = { columns: 2, gridGap: 30 }
    else debugColumn = { columns: 3, gridGap: 35 }

    gui
      .add(debugColumn, 'columns')
      .min(1)
      .max(12)
      .step(1)
      .onChange(() => {
        setColumns(debugColumn.columns)
      })

    gui
      .add(debugColumn, 'gridGap')
      .min(0)
      .max(50)
      .step(1)
      .onChange(() => {
        setGridGap(debugColumn.gridGap)
      })
  }

  useEffect(() => {
    setIsSSR(false)

    if (viewport.width <= scaleFromPixelSize(screenSize.sm)) {
      setColumns(1)
      setGridGap(25)
    } else if (viewport.width <= scaleFromPixelSize(screenSize.md)) {
      setColumns(2)
      setGridGap(30)
    } else {
      setColumns(3)
      setGridGap(35)
    }

    renderGUI()
  }, [viewport.width])

  return (
    !isSSR && (
      <>
        <Suspense fallback={<Loader />}>
          <ImageList
            setHovered={setHoveredById}
            setHoveredId={setHoveredId}
            setMouseDepth={setMouseDepth}
            // mousePosition={mousePosition}
            columns={columns}
            gridGap={scaleFromPixelSize(gridGap)}
            hovered={hovered}
          />
          <Mouse
            hovered={hovered[hoveredId]}
            depth={mouseDepth}
            // setMousePosition={setMousePosition}
          />
          {/* <CameraHelper /> */}
        </Suspense>
        <Stats />
      </>
    )
  )
}

export default Home
