const max = 0.4
const min = -0.4
const getArbitraryValRange = () => Math.random() * (max - min) + min

export const galleryArbitraryGridPosition: number[] = []

new Array(12).fill(1).map(() => {
  galleryArbitraryGridPosition.push(getArbitraryValRange())
})
