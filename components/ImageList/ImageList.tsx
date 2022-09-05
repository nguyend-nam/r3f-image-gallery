import { Scroll, ScrollControls } from '@react-three/drei'
import { RootState, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  galleryArbitraryGridPosition,
  galleryArbitraryGridPositionMobile,
} from '../../constants/gallery'
import { ImageCard } from '../ImageCard'

export const ImageList = (props: any) => {
  const { setHovered, setMouseDepth } = props
  const { viewport } = useThree<RootState>()
  return (
    <ScrollControls pages={viewport.width < 20 ? 4.7 : 2}>
      <Scroll>
        {new Array(12).fill(1).map((_, index) => (
          <ImageCard
            position={
              viewport.width < 20
                ? galleryArbitraryGridPositionMobile[index]
                : galleryArbitraryGridPosition[index]
            }
            img={
              useLoader(THREE.TextureLoader, [
                `/img/gallery/${index + 1}.jpg`,
              ])[0]
            }
            key={index}
            onMouseMove={(hovered: boolean) => {
              setHovered(hovered)
              setMouseDepth(
                viewport.width < 20
                  ? galleryArbitraryGridPositionMobile[index][2]
                  : galleryArbitraryGridPosition[index][2],
              )
            }}
          />
        ))}
      </Scroll>
    </ScrollControls>
  )
}
