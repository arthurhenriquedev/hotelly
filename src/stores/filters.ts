import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Filter } from '@/types/Filter'

export const useFilterStore = defineStore('filterStore', () => {
  const filters = ref<Filter>({
    name: undefined,
    price: undefined,
    numberGuests: 1,
    numberBedrooms: undefined,
    category: undefined,
    location: undefined,
    date: undefined
  })

  function setFilters(newFilters: Filter) {
    filters.value = { ...filters.value, ...newFilters }
  }

  function setFilter(key: keyof Filter, value: any) {
    if (value === undefined || value === null) {
      const updatedFilters = { ...filters.value }
      delete updatedFilters[key]
      filters.value = updatedFilters as Filter
    } else {
      filters.value = {
        ...filters.value,
        [key]: value
      }
    }
  }

  function resetFilters() {
    filters.value = {
      name: undefined,
      price: undefined,
      numberGuests: 1,
      numberBedrooms: undefined,
      category: undefined,
      location: undefined,
      date: undefined
    }
  }

  return { filters, setFilters, setFilter, resetFilters }
})
