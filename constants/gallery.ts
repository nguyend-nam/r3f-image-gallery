const max = 0.35
const min = -0.35
const getArbitraryValRange = () => Math.random() * (max - min) + min

export const galleryArbitraryGridPosition: number[] = []

new Array(12).fill(1).map(() => {
  galleryArbitraryGridPosition.push(getArbitraryValRange())
})

export const placesName = [
  'Quang Ninh',
  'Seebensee',
  'Paris',
  'Moscow',
  'London',
  'Caucasus',
  "Platja d'Alcúdia",
  'Luxor',
  'Crete',
  'San Francisco',
  'Napoli',
  'Wyoming',
]
