import { useFrame } from '@react-three/fiber'
import { Ref, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { BufferGeometry, Material, Mesh } from 'three'
import { fragmentShader } from './glsl/fragment-shader'
import { vertexShader } from './glsl/vertex-shader'
import { scaleFromPixelSize } from '../../utils'

interface Props {
  img: THREE.Texture
  onMouseMove: any
  colNumber: number
  imgRatio: number
  position: any
}

export const ImageCard = (props: Props) => {
  const { img, onMouseMove, imgRatio, colNumber, ...o } = props

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
          args={[
            scaleFromPixelSize(window.innerWidth / (colNumber + 1)), // colNumber + 1 represent vertical space interleaving columns
            scaleFromPixelSize(window.innerWidth / (colNumber + 1)) / imgRatio,
            10,
            10,
          ]}
        />
        <shaderMaterial
          {...data}
          side={THREE.DoubleSide}
          shadowSide={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}
