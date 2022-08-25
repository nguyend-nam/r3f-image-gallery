import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { fragmentShader } from './glsl/fragment-shader'
import { vertexShader } from './glsl/vertex-shader'
import { gsap } from 'gsap'
import { Mesh } from 'three'

export default function Figure(props: any) {
  const ref = useRef<Mesh>()
  const tex = useLoader(THREE.TextureLoader, '/img/dunes.jpg')
  const img = useLoader(THREE.ImageLoader, '/img/dunes.jpg')
  const raycaster = new THREE.Raycaster()

  const PLANE_SIZE = 4.0
  const speed = {
    value: 0.006,
  }
  const tilt = {
    x: 0,
    y: 0,
  }
  const mouse = useRef(new THREE.Vector2())

  useEffect(() => {
    const update = (e: MouseEvent) => {
      mouse.current = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      )
    }
    window.addEventListener('pointermove', update)
    return () => {
      window.removeEventListener('pointermove', update)
    }
  }, [])

  useFrame(({ camera }) => {
    if (ref.current) {
      // @ts-ignore
      //   ref.current.material.uniforms.uTime.value += speed.value
      //   gsap.to(ref.current.rotation, {
      //     x: tilt.y,
      //     y: tilt.x,
      //     duration: 0.4,
      //   })

      // get mouse pos
      if (mouse.current !== null) {
        raycaster.setFromCamera(mouse.current, camera)
        const intersects = raycaster.intersectObjects([ref.current])
        if (intersects.length) {
          const point = new THREE.Vector2(
            intersects[0].uv!.x,
            intersects[0].uv!.y,
          )
          // @ts-ignore
          ref.current.material.uniforms.uMousePos.value = point
          // @ts-ignore
          gsap.to(ref.current.material.uniforms.uMouseRadius, {
            value: 0.1,
            duration: 0.4,
            overwrite: true,
          })
        }
      }
    }
  })

  const handlePointerEnter = () => {
    // @ts-ignore
    gsap.to(ref.current.material.uniforms.uRadius, {
      value: 1.5,
      duration: 1.8,
      overwrite: true,
    })
    gsap.to(speed, {
      value: 0.02,
      duration: 0.5,
      overwrite: true,
    })
    // @ts-ignore
    gsap.to(ref.current.material.uniforms.uSpikes, {
      value: 2.5,
      duration: 0.8,
      overwrite: true,
    })
  }

  const handlePointerLeave = () => {
    // @ts-ignore
    gsap.to(ref.current.material.uniforms.uRadius, {
      value: 0.5,
      duration: 0.6,
      overwrite: true,
    })
    gsap.to(speed, {
      value: 0.006,
      duration: 1.8,
      overwrite: true,
    })
    // @ts-ignore
    gsap.to(ref.current.material.uniforms.uSpikes, {
      value: 1.5,
      duration: 2,
      overwrite: true,
    })
    gsap.to(tilt, {
      x: 0,
      y: 0,
      duration: 0.4,
      overwrite: true,
    })
    // @ts-ignore
    gsap.to(ref.current.material.uniforms.uMouseRadius, {
      value: 0.0,
      duration: 0.2,
      overwrite: true,
    })
  }

  const handlePointerMove = (e: MouseEvent) => {
    tilt.x = -1.0 * (((e.clientX / window.innerWidth) * 2 - 1) * 0.5)
    tilt.y = -1.0 * (((e.clientY / window.innerHeight) * 2 - 1) * 0.5)
  }

  return (
    <mesh
      ref={ref}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <planeBufferGeometry args={[PLANE_SIZE, PLANE_SIZE, 1, 1]} />
      <shaderMaterial
        uniforms={{
          uColor: { value: new THREE.Color('lightskyblue') },
          uPlaneSize: { value: new THREE.Vector2(PLANE_SIZE, PLANE_SIZE) },
          uImageSize: { value: new THREE.Vector2(img.width, img.height) },
          uMousePos: { value: new THREE.Vector2(0.0, 0.0) },
          uMouseRadius: { value: 0.0 },
          uTime: { value: 0.0 },
          uRadius: { value: 0.5 },
          uTexture: { value: tex },
          uSpikes: { value: 1.5 }, // adjust the waviness
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        // wireframe={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
