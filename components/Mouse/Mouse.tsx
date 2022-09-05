import React, { Ref, useMemo, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { BufferGeometry, Material, Mesh } from 'three'
import * as THREE from 'three'
import { fragmentShader } from './glsl/fragment-shader'

export const Mouse = (props: any) => {
  const { hovered, depth } = props
  const { viewport } = useThree()

  const ref = useRef() as
    | Ref<Mesh<BufferGeometry, Material | Material[]>>
    | undefined

  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2.3
    const y = (mouse.y * viewport.height) / 2.3
    // @ts-ignore
    ref.current.position.set(x, y, 1)
    // setRadius(
    //   0.1 / Math.sqrt((y * y + x * x) / 5) > 0.2 // take distance from mouse to (0, 0) point and invert it
    //     ? 0.5
    //     : 0.0,
    // )
  })

  const data = useMemo(
    () => ({
      uniforms: {
        uniformColor: { value: new THREE.Color(1, 1, 0) },
      },
      fragmentShader,
      vertexShader: undefined,
    }),
    [],
  )

  return (
    <mesh ref={ref}>
      <circleBufferGeometry args={[hovered ? depth / 2 + 0.5 : 0, 50]} />
      <shaderMaterial side={THREE.DoubleSide} {...data} transparent />
    </mesh>
  )
}
