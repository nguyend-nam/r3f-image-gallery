import * as THREE from 'three'
import { perspectiveCameraAttr } from '../constants'

const { fov, zPosition } = perspectiveCameraAttr

export const scaleFromPixelSize = (sizeInPx: number) => {
  const viewHeight = window.screen.availHeight

  const radFov = THREE.MathUtils.degToRad(fov)
  const r3fHeight = 2 * Math.tan(radFov / 2) * zPosition

  return (r3fHeight * sizeInPx) / viewHeight
}

const max = 0.45
const min = -0.45
export const getArbitraryValRange = () => Math.random() * (max - min) + min
