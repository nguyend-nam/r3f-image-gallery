// export const galleryGridPosition = [
//   [-8.5, 0, 0.3],
//   [0, 0, 0],
//   [8.5, 0, -0.3],
//   [-8.5, -6, 0.3],
//   [0, -6, 0],
//   [8.5, -6, -0.3],
//   [-8.5, -12, 0.3],
//   [0, -12, 0],
//   [8.5, -12, -0.3],
//   [-8.5, -18, 0.3],
//   [0, -18, 0],
//   [8.5, -18, -0.3],
// ]

const max = 0.45
const min = -0.45
const getArbitraryValRange = () => Math.random() * (max - min) + min

export const galleryArbitraryGridPosition = [
  getArbitraryValRange(),
  getArbitraryValRange(),
  getArbitraryValRange(),
  getArbitraryValRange(),
  getArbitraryValRange(),
  getArbitraryValRange(),
  getArbitraryValRange(),
  getArbitraryValRange(),
  getArbitraryValRange(),
  getArbitraryValRange(),
  getArbitraryValRange(),
  getArbitraryValRange(),
]
