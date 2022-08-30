import React, { Ref, useMemo, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { BufferGeometry, Material, Mesh } from 'three'
import * as THREE from 'three'
import { fragmentShader } from './glsl/fragment-shader'

const Dodecahedron = (props: any) => {
  const { hovered } = props
  const { viewport } = useThree()
  const [radius, setRadius] = useState(0.0)

  const ref = useRef() as
    | Ref<Mesh<BufferGeometry, Material | Material[]>>
    | undefined

  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2
    // @ts-ignore
    ref.current.position.set(x, y, 0.5)
    setRadius(
      0.1 / Math.sqrt((y * y + x * x) / 5) > 0.2 // take distance from mouse to (0, 0) point and invert it
        ? 0.5
        : 0.0,
    )
  })

  const data = useMemo(
    () => ({
      uniforms: {
        uniformColor: { value: new THREE.Color(0.973, 0.784, 0.812) },
      },
      fragmentShader,
      vertexShader: undefined,
    }),
    [],
  )

  return (
    <mesh ref={ref}>
      <circleBufferGeometry args={[hovered ? radius : 0.0, 50]} />
      <shaderMaterial side={THREE.DoubleSide} {...data} />
    </mesh>
  )
}

export default Dodecahedron
