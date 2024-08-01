import type { Location } from './Location.types'
import type { Category } from './Categories.types'

interface Hotel {
  id: string
  name: string
  description: string
  price: number
  image: string
  score: number
  location: Location
  category: Category
  bedrooms: number
  guests: number
}

export type { Hotel }
