import { useFrame } from '@react-three/fiber'
import { Ref, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { BufferGeometry, Material, Mesh } from 'three'
import { fragmentShader } from './glsl/fragment-shader'
import { vertexShader } from './glsl/vertex-shader'
import { scaleFromPixelSize } from '../../utils'
import { Html } from '@react-three/drei'

interface Props {
  img: THREE.Texture
  onMouseMove: any
  colNumber: number
  imgRatio: number
  position: any
  // mousePosition: number[]
  hovered: boolean
  name: string
}

export const ImageCard = (props: Props) => {
  const {
    img,
    onMouseMove,
    imgRatio,
    colNumber,
    position,
    // mousePosition,
    hovered,
    name,
    ...o
  } = props

  const ref = useRef() as
    | Ref<Mesh<BufferGeometry, Material | Material[]>>
    | undefined

  const data = useMemo(
    () => ({
      uniforms: {
        uniformColor: { value: new THREE.Color(0.882, 0.247, 0.369) },
        uniformTime: { value: 0.0 },
        uniformTexture: { value: img },
        // uniformTextureWidth: {
        //   value: scaleFromPixelSize(window.innerWidth / (colNumber + 1)),
        // },
        // uniformPosition: { value: new THREE.Vector2(position[0], position[1]) },
        // uniformMousePosition: {
        //   value: new THREE.Vector2(mousePosition[0], mousePosition[1]),
        // },
        uniformHover: { value: 0.0 },
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
    // @ts-ignore
    ref.current.material.uniforms.uniformHover.value = hovered ? 1.0 : 0.0
  })

  return (
    <group>
      <mesh
        ref={ref}
        onPointerEnter={() => onMouseMove(true)}
        onPointerOut={() => onMouseMove(false)}
        position={position}
        {...o}
      >
        <planeBufferGeometry
          args={[
            scaleFromPixelSize(
              window.innerWidth / (colNumber + 1),
            ) /** colNumber + 1 represent vertical space interleaving columns */,
            scaleFromPixelSize(window.innerWidth / (colNumber + 1)) / imgRatio,
            100,
            100,
          ]}
        />
        <shaderMaterial
          {...data}
          side={THREE.DoubleSide}
          shadowSide={THREE.BackSide}
        />
        <Html
          center
          style={{
            fontSize: 20,
            color: '#fff',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            height: 'max-content',
            width: 'max-content',
            transition: '0.2s',
            opacity: hovered ? 1 : 0,
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          <div>{name}</div>
        </Html>
      </mesh>
    </group>
  )
}
