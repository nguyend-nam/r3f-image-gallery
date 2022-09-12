import { Scroll, ScrollControls } from '@react-three/drei'
import { RootState, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { galleryArbitraryGridPosition } from '../../constants'
import { scaleFromPixelSize } from '../../utils'
import { ImageCard } from '../ImageCard'

export const ImageList = (props: any) => {
  const { setHovered, setMouseDepth } = props
  const { viewport } = useThree<RootState>()

  const numberOfPages =
    viewport.width > 18
      ? (3 * ((scaleFromPixelSize(window.innerWidth / 4) + 1) / 1.5)) /
          viewport.height +
        1
      : (11 * ((scaleFromPixelSize(window.innerWidth / 1.5) + 1) / 1.5)) /
          viewport.height +
        1

  return (
    <ScrollControls pages={numberOfPages}>
      <Scroll>
        {new Array(12).fill(1).map((_, index) => (
          <ImageCard
            position={
              viewport.width > 18
                ? [
                    index % 3 === 1
                      ? 0
                      : ((index % 3) - 1) *
                        (scaleFromPixelSize(window.innerWidth / 4) + 1),
                    -Math.floor(index / 3) *
                      ((scaleFromPixelSize(window.innerWidth / 4) + 1) / 1.5),
                    galleryArbitraryGridPosition[index],
                  ]
                : [
                    0,
                    -index *
                      ((scaleFromPixelSize(window.innerWidth / 1.5) + 1) / 1.5),
                    galleryArbitraryGridPosition[index],
                  ]
            }
            img={
              useLoader(THREE.TextureLoader, [
                `/img/gallery/${index + 1}.jpg`,
              ])[0]
            }
            key={index}
            onMouseMove={(hovered: boolean) => {
              setHovered(hovered)
              setMouseDepth(galleryArbitraryGridPosition[index])
            }}
          />
        ))}
      </Scroll>
    </ScrollControls>
  )
}
