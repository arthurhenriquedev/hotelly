import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Filter } from '@/types/Filter'

export const useFilterStore = defineStore('filterStore', () => {
  // Initial state
  const filters = ref<Filter>({
    name: undefined,
    price: undefined,
    numberGuests: undefined,
    numberBedrooms: undefined,
    category: undefined,
    location: undefined
  })

  // Action to set filters
  function setFilters(newFilters: Filter) {
    filters.value = { ...filters.value, ...newFilters }
  }

  function setFilter(key: keyof Filter, value: any) {
    filters.value = {
      ...filters.value,
      [key]: value
    }
  }

  // Action to reset filters
  function resetFilters() {
    filters.value = {
      name: undefined,
      price: undefined,
      numberGuests: undefined,
      numberBedrooms: undefined,
      category: undefined,
      location: undefined
    }
  }

  return { filters, setFilters, setFilter, resetFilters }
})
