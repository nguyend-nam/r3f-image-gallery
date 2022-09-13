import { useFrame } from '@react-three/fiber'
import { Ref, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { BufferGeometry, Material, Mesh } from 'three'
import { fragmentShader } from './glsl/fragment-shader'
import { vertexShader } from './glsl/vertex-shader'
import { scaleFromPixelSize } from '../../utils'

export const ImageCard = (props: any) => {
  const { img, onMouseMove, colNumber, ...o } = props

  const ref = useRef() as
    | Ref<Mesh<BufferGeometry, Material | Material[]>>
    | undefined

  const data = useMemo(
    () => ({
      uniforms: {
        uniformColor: { value: new THREE.Color(0.882, 0.247, 0.369) },
        uniformTime: { value: 0.0 },
        uniformTexture: { value: img },
      },
      fragmentShader,
      vertexShader,
    }),
    [img],
  )

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    // @ts-ignore
    ref.current.material.uniforms.uniformTime.value = a
  })

  return (
    <group>
      <mesh
        ref={ref}
        onPointerEnter={() => onMouseMove(true)}
        onPointerOut={() => onMouseMove(false)}
        {...o}
      >
        <planeBufferGeometry
          args={
            colNumber >= 2
              ? [
                  scaleFromPixelSize(window.innerWidth / (colNumber + 1)),
                  scaleFromPixelSize(window.innerWidth / (colNumber + 1)) / 1.5,
                  10,
                  10,
                ]
              : [
                  scaleFromPixelSize(window.innerWidth / 1.5),
                  scaleFromPixelSize(window.innerWidth / 1.5) / 1.5,
                  10,
                  10,
                ]
          }
        />
        <shaderMaterial
          {...data}
          side={THREE.DoubleSide}
          shadowSide={THREE.BackSide}
          // wireframe
        />
      </mesh>
    </group>
  )
}
