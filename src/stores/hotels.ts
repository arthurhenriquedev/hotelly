import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Filter } from '@/types/Filters.types'
import type { Hotel } from '@/types/Hotels.types'

import AvailableHotels from '@/statics/mock/available_hotels.json'

export const useHotelsStore = defineStore('hotels', () => {
  const hotels = ref<Hotel[]>([])
  const filters = ref<Filter | null>(null)
  hotels.value = AvailableHotels

  const getHotelsCount = computed(() => {
    return hotels.value?.length || 0
  })

  const getActualFilters = computed(() => {
    return filters.value
  })

  const fetchFilteredHotels = (filter?: Filter) => {
    if (filter) {
      filters.value = filter
    }

    if (!filters.value) {
      return hotels.value
    }

    return hotels.value.filter((hotel) => {
      if (!filter) return true

      if (filter.category && filter.category !== hotel.category) {
        return false
      }

      if (filter.location && filter.location.city !== hotel.location.city) {
        return false
      }

      return true
    })
  }

  return { hotels, getHotelsCount, getActualFilters, fetchFilteredHotels }
})
