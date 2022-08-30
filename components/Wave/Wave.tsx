import { useFrame, useLoader } from '@react-three/fiber'
import { Ref, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { BufferGeometry, Material, Mesh } from 'three'
import { fragmentShader } from './glsl/fragment-shader'
import { vertexShader } from './glsl/vertex-shader'
import Dodecahedron from '../Mouse/Mouse'

const Wave = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useCursor } = require('@react-three/drei/web/useCursor')
  const [hovered, set] = useState<boolean>()
  //   const [uTime, setUTime] = useState<number>()
  useCursor(hovered!, 'auto')
  const ref = useRef() as
    | Ref<Mesh<BufferGeometry, Material | Material[]>>
    | undefined

  const [image] = useLoader(THREE.TextureLoader, ['/img/dwarvesf_logo.png'])
  // const [image2] = useLoader(THREE.TextureLoader, ['/img/threejs_logo.jpg'])

  const data = useMemo(
    () => ({
      uniforms: {
        uniformColor: { value: new THREE.Color(0.882, 0.247, 0.369) },
        uniformTime: { value: 0.0 },
        uniformTexture: { value: image },
      },
      fragmentShader,
      vertexShader,
    }),
    [],
  )

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    // @ts-ignore
    ref.current.material.uniforms.uniformTime.value = a
    // setUTime(a)
  })
  return (
    <group>
      <mesh
        ref={ref}
        onPointerEnter={() => set(true)}
        onPointerOut={() => set(false)}
        //   rotation={[0, uTime * 2.5, 0]}
        {...props}
      >
        <planeBufferGeometry args={[4.5, 5, 106, 106]} />
        <shaderMaterial
          {...data}
          side={THREE.DoubleSide}
          shadowSide={THREE.BackSide}
        />
      </mesh>
      <Dodecahedron hovered={hovered} />
    </group>
  )
}

export default Wave
