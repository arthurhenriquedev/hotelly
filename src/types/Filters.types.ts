import type { Category } from './Categories.types'
import type { Location } from './Location.types'

interface PriceArray {
  min?: number
  max?: number
}

interface Filter {
  name?: string
  price?: PriceArray
  numberGuests?: number
  numberBedrooms?: number
  category?: Category
  location?: Location
  sortBy?: string
  date?: {
    start?: string
    end?: string
  }
}

export type { Filter }
