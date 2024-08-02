import { useRoute } from 'vue-router'

import { useCategoryStore } from '@/stores/categories'
import { useFilterStore } from '@/stores/filters'

import type { Filter } from '@/types/Filters.types'

const parseQueryParams = () => {
  const route = useRoute()

  const categoryStore = useCategoryStore()
  const filterStore = useFilterStore()

  const query = route.query

  const filters: Filter = {
    name: query.name ? (query.name as string) : undefined,
    price: query.price ? JSON.parse(query.price as string) : undefined,
    numberGuests: query.numberGuests ? Number(query.numberGuests) : 1,
    numberBedrooms: query.numberBedrooms ? Number(query.numberBedrooms) : undefined
  }

  if (query.category) {
    filters.category = categoryStore.fetchSuggested?.find(
      (category) => category.slug === query.category
    )

    if (!filters.category) {
      filters.category = undefined
    }
  }

  if (query.location) {
    filters.location = {
      city: query.location.city as string,
      country: query.location.country as string
    }

    if (!filters.location.city || !filters.location.country) {
      filters.location = undefined
    }
  }

  if (query.date) {
    const formattedDate = JSON.parse(query.date as string)
    const startDate = new Date(formattedDate.start)
    const endDate = new Date(formattedDate.end)
    const isStartDateValid = !isNaN(Date.parse(formattedDate.start as string))
    const isEndDateValid = !isNaN(Date.parse(formattedDate.end as string))
    let tomorrowStartDate = new Date(formattedDate.start)
    tomorrowStartDate.setDate(tomorrowStartDate.getDate() + 1)

    filters.date = {
      start: isStartDateValid ? startDate.toISOString().split('T')[0] : undefined,
      end: isEndDateValid ? endDate.toISOString().split('T')[0] : undefined
    }

    if (!isStartDateValid || !isEndDateValid) {
      filters.date = undefined
    }

    if (new Date(filters?.date?.start ?? '') >= new Date(filters?.date?.end ?? '')) {
      filters.date = {
        start: filters.date?.start,
        end: tomorrowStartDate.toISOString().split('T')[0]
      }
    }
  } else {
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 1)
    filters.date = {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0]
    }
  }

  filterStore.setFilters(filters)
  return updateQueryString(filters)
}

const updateQueryString = (filters: Filter) => {
  const query: Record<string, any> = {}

  if (filters.name) query.name = filters.name
  if (filters.price) query.price = JSON.stringify(filters.price)
  if (filters.numberGuests) query.numberGuests = filters.numberGuests || 1
  if (filters.numberBedrooms) query.numberBedrooms = filters.numberBedrooms
  if (filters.category) query.category = filters.category?.slug
  if (filters.location) query.location = JSON.stringify(filters.location)
  if (filters.date) query.date = JSON.stringify(filters.date)

  return query
}

export { parseQueryParams, updateQueryString }
