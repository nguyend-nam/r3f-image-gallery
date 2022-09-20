import React, { Ref, useMemo, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { BufferGeometry, Material, Mesh } from 'three'
import * as THREE from 'three'
import { fragmentShader } from './glsl/fragment-shader'

interface Props {
  hovered: boolean
  depth: number
  setMousePosition: React.Dispatch<React.SetStateAction<number[]>>
}

export const Mouse = (props: Props) => {
  const { hovered, depth, setMousePosition } = props
  const { viewport } = useThree()
  // const [radius, setRadius] = useState<number>()

  const ref = useRef() as
    | Ref<Mesh<BufferGeometry, Material | Material[]>>
    | undefined

  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2.3
    const y = (mouse.y * viewport.height) / 2.3
    setMousePosition([x, y])
    // console.log(x, y)
    // @ts-ignore
    ref.current.position.set(x, y, 1)
    // if (!hovered) {
    //   clock.start()
    //   setRadius(0.0)
    // }
    // if (clock.getElapsedTime() <= (depth / 2 + 0.5) / 5) {
    //   setRadius(clock.getElapsedTime() * 5)
    // }
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
