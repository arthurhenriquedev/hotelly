<template>
  <div class="flex flex-col">
    <detailed-filter class="mb-8" />

    <template v-if="hotelsCount === 0">
      <div class="flex flex-col items-center justify-center w-full h-96">
        <p class="text-2xl text-dark font-semibold">{{ $t('list.no_experiences') }}</p>
        <p class="text-lg text-gray-400 font-normal">{{ $t('list.no_experiences_description') }}</p>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-row w-full items-center justify-between mb-8">
        <div class="flex flex-col">
          <p class="text-2xl text-dark font-semibold">{{ $t('list.relevant_experiences') }}</p>
          <p class="text-lg text-gray-400 font-normal">
            {{
              $t('list.experiences_count', {
                count: hotelsCount,
                location: filterStore.filters.location
                  ? `${filterStore.filters.location.city} • ${filterStore.filters.location.country}`
                  : 'todo o mundo'
              })
            }}
          </p>
        </div>
        <div class="flex flex-row">
          <button class="px-6 py-3 text-dark border border-gray-200 bg-white rounded-md">
            <font-awesome-icon icon="fa-solid fa-filter" class="mr-2" />
            Filtrar
          </button>
        </div>
      </div>
      <div
        class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
      >
        <experience-card v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" />
      </div>
      <div v-if="hotelsCount > 0" class="flex flex-row justify-center items-center mt-8 w-full">
        <p class="text-md text-gray-400">
          {{ $t('list.list_final') }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useHotelsStore } from '@/stores/hotels'
import { useMonetaryUnitStore } from '@/stores/monetary'
import { useFilterStore } from '@/stores/filters'
import { useCategoryStore } from '@/stores/categories'

import type { Hotel } from '@/types/Hotels.types'
import type { Filter } from '@/types/Filters.types'

import ExperienceCard from '@/components/cards/ExperienceCard/ExperienceCard.vue'
import DetailedFilter from '@/components/filters/DetailedFilter/DetailedFilter.vue'

const route = useRoute()
const router = useRouter()

const hotelStore = useHotelsStore()
const monetaryStore = useMonetaryUnitStore()
const filterStore = useFilterStore()
const categoryStore = useCategoryStore()

const monetaryUnit = ref(monetaryStore.currentUnit)

const hotels = computed(() => hotelStore.getFilteredHotels)
const hotelsCount = computed(() => hotelStore.getHotelsCount)

const parseQueryParams = () => {
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

    filters.date = {
      start: isStartDateValid ? startDate.toISOString().split('T')[0] : undefined,
      end: isEndDateValid ? endDate.toISOString().split('T')[0] : undefined
    }

    if (!isStartDateValid || !isEndDateValid) {
      filters.date = undefined
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

  router.push({ query })
}

onMounted(() => {
  parseQueryParams()
})

watch(
  () => monetaryStore.currentUnit,
  (newValue) => {
    monetaryUnit.value = newValue
  }
)

watch(
  () => filterStore.filters,
  (newFilters) => {
    console.log('newFilters', newFilters)
    updateQueryString(newFilters)
  },
  { deep: true }
)
</script>
