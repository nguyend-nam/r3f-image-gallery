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
      ? // 4 rows of images rendered, first one is at y = 0,
        // so I multiply 3 by the height I specify for each images as below.
        (3 * ((scaleFromPixelSize(window.innerWidth / 4) + 1) / 1.5)) /
          viewport.height +
        1
      : // same as above, but with 1 image each row.
        (11 * ((scaleFromPixelSize(window.innerWidth / 1.5) + 1) / 1.5)) /
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
                    // x position: since the layout has 3 columns, so I map the index [0, 1, 2,...]
                    // to get the array [-n, 0, n, -n, 0, n,...] to separate 3 columns.
                    index % 3 === 1
                      ? 0
                      : ((index % 3) - 1) *
                        (scaleFromPixelSize(window.innerWidth / 4) + 1),

                    // y position: indexes 0, 1, 2 will be displayed in 1 line, and the same for
                    // 3, 4, 5 and so on.
                    -Math.floor(index / 3) *
                      ((scaleFromPixelSize(window.innerWidth / 4) + 1) / 1.5),

                    // z position: random constants in specified range.
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
