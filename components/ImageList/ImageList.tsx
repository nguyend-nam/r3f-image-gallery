import { Scroll, ScrollControls } from '@react-three/drei'
import { RootState, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { galleryArbitraryGridPosition, placesName } from '../../constants'
import { scaleFromPixelSize } from '../../utils'
import { ImageCard } from '../ImageCard'

interface Props {
  setHovered: any
  setHoveredId: React.Dispatch<React.SetStateAction<number>>
  setMouseDepth: any
  mousePosition: number[]
  columns: number
  gridGap: number
  hovered: boolean[]
  setNumberOfPages: React.Dispatch<React.SetStateAction<number>>
}

export const ImageList = (props: Props) => {
  const {
    setHovered,
    setHoveredId,
    setMouseDepth,
    mousePosition,
    columns,
    gridGap,
    hovered,
    setNumberOfPages,
  } = props
  const { viewport } = useThree<RootState>()

  const numberOfImages = 12
  const imgRatio = 3 / 2

  /** x & y position of the cell that contains the each image */
  const gridCellWidth =
    scaleFromPixelSize(window.innerWidth / (columns + 1)) + gridGap
  const gridCellHeight = (gridCellWidth - gridGap) / imgRatio + gridGap

  /**
   * n rows of images rendered, first one is at y = 0,
   * so I multiply n by the grid cell height.
   */
  const numberOfPages =
    ((Math.ceil(numberOfImages / columns) - 1) * gridCellHeight) /
      viewport.height +
    1

  setNumberOfPages(numberOfPages)

  return (
    <ScrollControls pages={numberOfPages} damping={4}>
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
              ((index % columns) - (columns - 1) / 2) * gridCellWidth,

              /**
               * y position: if columns = 3, indexes 0, 1, 2 will be displayed in 1 line, the same for
               * 3, 4, 5 and so on.
               */
              -Math.floor(index / columns) * gridCellHeight,

              /** z position: random constants in specified range. */
              galleryArbitraryGridPosition[index],
            ]}
            img={
              useLoader(THREE.TextureLoader, [
                `/img/gallery/${index + 1}.jpg`,
              ])[0]
            }
            key={index}
            onMouseMove={(hovered: boolean) => {
              setHovered(index, hovered)
              setHoveredId(index)
              setMouseDepth(galleryArbitraryGridPosition[index])
            }}
            mousePosition={mousePosition}
            gridCellSize={[gridCellWidth, gridCellHeight]}
            colNumber={columns}
            imgRatio={imgRatio}
            hoveredList={hovered}
            hovered={hovered[index]}
            name={placesName[index]}
          />
        ))}
      </Scroll>
    </ScrollControls>
  )
}
