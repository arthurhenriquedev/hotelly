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

  const applyFilters = (hotel: Hotel, filter: Filter) => {
    if (filter.name && !hotel.name.toLowerCase().includes(filter.name.toLowerCase())) return false
    if (filter.category && filter.category.slug !== hotel.category?.slug) return false
    if (filter.location && filter.location.city !== hotel.location.city) return false
    if (
      filter.price &&
      ((filter.price.min !== undefined && hotel.price < filter.price.min) ||
        (filter.price.max !== undefined && hotel.price > filter.price.max))
    ) {
      return false
    }
    if (filter.numberBedrooms && filter.numberBedrooms !== hotel.bedrooms) return false
    if (filter.numberGuests !== undefined && filter.numberGuests > (hotel?.guests || 1))
      return false
    return true
  }

  const sortHotels = (hotels: Hotel[], sortBy: string) => {
    switch (sortBy) {
      case 'price_max':
        return hotels.sort((a, b) => b.price - a.price)
      case 'price_min':
        return hotels.sort((a, b) => a.price - b.price)
      case 'score_max':
        return hotels.sort((a, b) => b.score - a.score)
      case 'score_min':
        return hotels.sort((a, b) => a.score - b.score)
      default:
        return hotels
    }
  }

  const getFilteredHotels = computed(() => {
    const filter = filters.filters as Filter
    const hasFilter = (Object.keys(filter) as (keyof Filter)[]).some(
      (key) => filter[key] !== undefined && filter[key] !== null && filter[key] !== ''
    )

    if (!hasFilter) return hotels.value

    const filteredHotels = hotels.value
      .map((hotel) => {
        const formattedHotel = { ...hotel }
        const nights = getTotalNights(filter.date?.start ?? '', filter.date?.end ?? '')
        formattedHotel.price = hotel.price * (filter.numberGuests ?? 1) * nights
        formattedHotel.nights = nights
        return formattedHotel
      })
      .filter((hotel) => applyFilters(hotel, filter))

    return filter.sortBy ? sortHotels(filteredHotels, filter.sortBy) : filteredHotels
  })

  const getHotelsCount = computed(() => getFilteredHotels.value.length)

  const getAvailableLocations = computed(() => {
    const { category } = filters.filters
    const filteredHotels = hotels.value.filter(
      (hotel) => category?.slug === hotel.category?.slug || !category
    )
    return [...new Set(filteredHotels.map((hotel) => hotel.location))] as Location[]
  })

  const getAvailablePrices = computed(() => {
    const { filters: filter } = useFilterStore()
    const guests = filter.numberGuests ?? 1
    const startDate = new Date(filter.date?.start ?? '')
    const endDate = new Date(filter.date?.end ?? '')

    if (!startDate || !endDate) return { min: 0, max: 0 }

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
