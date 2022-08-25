import { useFrame, useLoader } from '@react-three/fiber'
import { Ref, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { BufferGeometry, Material, Mesh } from 'three'
import { fragmentShader } from './glsl/fragment-shader'
import { vertexShader } from './glsl/vertex-shader'

const Wave = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useCursor } = require('@react-three/drei/web/useCursor')
  const [hovered, set] = useState<boolean>()
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
    // @ts-ignore
    // if (hovered) ref.current.material.uniforms.uniformTexture.value = image2
    // @ts-ignore
    // else ref.current.material.uniforms.uniformTexture.value = image
  })
  return (
    <mesh
      ref={ref}
      onPointerEnter={() => set(true)}
      onPointerOut={() => set(false)}
    >
      <planeBufferGeometry args={[4.5, 5, 16, 16]} />
      <shaderMaterial {...data} />
    </mesh>
  )
}

export default Wave
