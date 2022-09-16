import * as THREE from 'three'
import { perspectiveCameraAttr } from '../constants'

const { fov, zPosition } = perspectiveCameraAttr

export const scaleFromPixelSize = (sizeInPx: number) => {
  const viewHeight = window.screen.availHeight // view height in pixels

  /*
    I took reference from here: https://stackoverflow.com/questions/15331358/three-js-get-object-size-with-respect-to-camera-and-object-position-on-screen.
    You can take a look at this image: https://i.stack.imgur.com/ic2rN.png.
    Firstly I get the fov in radian, and then devide it by 2, since the fov cover 2 sides of the Oz axis,
    use tangent with z position (distance from the eye to the plane) to get the height of the plane on the positive side,
    finally multiply by 2 to full height.
   */
  const radFov = THREE.MathUtils.degToRad(fov)
  const r3fHeight = 2 * Math.tan(radFov / 2) * zPosition

  return (r3fHeight * sizeInPx) / viewHeight
}
