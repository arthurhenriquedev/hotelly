import type { Category } from './Categories.types'
import type { Location } from './Location.types'

interface Filter {
  category?: Category
  location?: Location
}

export type { Filter }
