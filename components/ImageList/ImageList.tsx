import { Scroll, ScrollControls } from '@react-three/drei'
import { RootState, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { galleryArbitraryGridPosition } from '../../constants'
import { scaleFromPixelSize } from '../../utils'
import { ImageCard } from '../ImageCard'

export const ImageList = (props: any) => {
  const { setHovered, setMouseDepth } = props
  const { viewport } = useThree<RootState>()

  let columns: number
  if (viewport.width <= 12) columns = 1
  else if (viewport.width <= 20) columns = 2
  else columns = 3

  /**
   * n rows of images rendered, first one is at y = 0,
   * so I multiply n by the y position I specify for each ImageCard as below.
   */
  const numberOfPages =
    ((Math.ceil(12 / columns) - 1) *
      ((scaleFromPixelSize(
        window.innerWidth / (columns + (columns === 1 ? 0.5 : 1)),
      ) +
        1) /
        1.5)) /
      viewport.height +
    1

  return (
    <ScrollControls pages={numberOfPages}>
      <Scroll>
        {new Array(12).fill(1).map((_, index) => (
          <ImageCard
            position={[
              /**
               * x position:
               * odd:
               *   columns = 3: [0, 1, 2] -> [-1, 0, 1]
               *   columns = 5: [0, 1, 2, 3, 4] -> [-2, -1, 0, 1, 2]
               * even:
               *   columns = 2: [0, 1] -> [-0.5, 0.5]
               *   columns = 4: [0, 1, 2, 3] -> [-1.5, -0.5, 0.5, 1.5]
               */
              ((index % columns) - (columns - 1) / 2) *
                (scaleFromPixelSize(window.innerWidth / (columns + 1)) + 1),

              /**
               * y position: if columns = 3, indexes 0, 1, 2 will be displayed in 1 line, the same for
               * 3, 4, 5 and so on.
               */
              -Math.floor(index / columns) *
                ((scaleFromPixelSize(
                  window.innerWidth / (columns + (columns < 2 ? 0.5 : 1)),
                ) +
                  1) /
                  1.5),

              // z position: random constants in specified range.
              galleryArbitraryGridPosition[index],
            ]}
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
            colNumber={columns}
          />
        ))}
      </Scroll>
    </ScrollControls>
  )
}
