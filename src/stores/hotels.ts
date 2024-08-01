import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useFilterStore } from '@/stores/filters'

import type { Filter } from '@/types/Filters.types'
import type { Hotel } from '@/types/Hotels.types'

import AvailableHotels from '@/statics/mock/available_hotels.json'

export const useHotelsStore = defineStore('hotels', () => {
  const hotels = ref<Hotel[]>([])

  const filters = useFilterStore()

  hotels.value = AvailableHotels

  const getHotelsCount = computed(() => {
    return fetchFilteredHotels()?.length || 0
  })

  const fetchFilteredHotels = () => {
    const filter = filters.filters
    const hasFilter = Object.keys(filter).some(
      (key) => filter[key] !== undefined && filter[key] !== null && filter[key] !== ''
    )

    if (!hasFilter) {
      return hotels.value
    }

    return hotels.value.filter((hotel) => {
      if (filter.name && !hotel.name.toLowerCase().includes(filter.name.toLowerCase())) {
        return false
      }

      if (filter.category && filter.category?.slug !== hotel.category?.slug) {
        return false
      }

      if (filter.location && filter.location.city !== hotel.location.city) {
        return false
      }

      if (filter.price && (hotel.price < filter.price.min || hotel.price > filter.price.max)) {
        return false
      }

      if (filter.numberBedrooms && filter.numberBedrooms !== hotel.bedrooms) {
        return false
      }

      if (filter.numberGuests && filter.numberGuests !== hotel.guests) {
        return false
      }

      return true
    })
  }

  return { hotels, getHotelsCount, fetchFilteredHotels }
})
