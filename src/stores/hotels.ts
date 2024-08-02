import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { getTotalNights } from '@/utils'

import { useFilterStore } from '@/stores/filters'

import type { Filter } from '@/types/Filters.types'
import type { Hotel } from '@/types/Hotels.types'
import type { Location } from '@/types/Location.types'

import AvailableHotels from '@/statics/mock/available_hotels.json'

export const useHotelsStore = defineStore('hotels', () => {
  const hotels = ref<Hotel[]>(AvailableHotels as Hotel[])

  const filters = useFilterStore()

  const getFilteredHotels = computed(() => {
    const filter = filters.filters as Filter
    const hasFilter = (Object.keys(filter) as (keyof Filter)[]).some(
      (key) => filter[key] !== undefined && filter[key] !== null && filter[key] !== ''
    )

    if (!hasFilter) {
      return hotels.value
    }

    return hotels.value
      .map((hotel) => {
        const formattedHotel = { ...hotel }
        const nights = getTotalNights(filter.date?.start ?? '', filter.date?.end ?? '')
        formattedHotel.price = hotel.price * (filter.numberGuests ?? 1) * nights
        formattedHotel.nights = nights
        return formattedHotel
      })
      .filter((hotel) => {
        if (filter.name && !hotel.name.toLowerCase().includes(filter.name.toLowerCase())) {
          return false
        }

        if (filter.category && filter.category.slug !== hotel.category?.slug) {
          return false
        }

        if (filter.location && filter.location.city !== hotel.location.city) {
          return false
        }

        if (filter.price && filter.price.min !== undefined && filter.price.max !== undefined) {
          if (hotel.price < filter.price.min || hotel.price > filter.price.max) {
            return false
          }
        }

        if (filter.numberBedrooms && filter.numberBedrooms !== hotel.bedrooms) {
          return false
        }

        if (filter.numberGuests !== undefined && filter.numberGuests > (hotel?.guests || 1)) {
          return false
        }

        return true
      })
  })

  const getHotelsCount = computed(() => {
    return getFilteredHotels.value.length
  })

  const getAvailableLocations = computed(() => {
    if (!hotels.value) return []

    const filteredHotels = hotels.value.filter(
      (hotel) =>
        filters.filters.category?.slug === hotel.category?.slug || !filters.filters.category
    )
    return [...new Set(filteredHotels.map((hotel) => hotel.location))] as Location[]
  })

  const getAvailablePrices = computed(() => {
    const filterStore = useFilterStore()

    const filter = filterStore.filters
    const guests = filter.numberGuests ?? 1

    const startDate = new Date(filter.date?.start ?? '')
    const endDate = new Date(filter.date?.end ?? '')

    if (!startDate || !endDate) {
      return { min: 0, max: 0 }
    }

    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime())
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))

    const prices = getFilteredHotels.value.map((hotel) => hotel.price * guests * nights)

    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  })

  return { hotels, getHotelsCount, getAvailableLocations, getAvailablePrices, getFilteredHotels }
})
