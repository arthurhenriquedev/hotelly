<template>
  <div class="flex flex-col">
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
        <div
          v-for="hotel in hotels"
          :key="hotel.id"
          class="flex flex-col w-full h-80 bg-white border-gray-200 border rounded-3xl"
        >
          <img v-lazy="hotel.image" alt="hotel" class="w-full h-40 rounded-t-3xl object-cover" />
          <div class="p-4 h-full" id="hotel_info">
            <div class="h-full flex flex-col justify-between">
              <div class="flex flex-col">
                <p class="text-sm uppercase text-gray-400 mb-2">
                  {{ $t(`categories.${hotel.category.slug}`) }}
                </p>
                <p class="text-md text-dark font-semibold">{{ hotel.name }}</p>
                <p class="text-sm text-gray-400">
                  {{ $t('hotel_card.bedrooms', { count: hotel.bedrooms }) }} •
                  {{ $t('hotel_card.guests', { count: hotel.guests }) }}
                </p>
                <p class="text-sm text-gray-400">
                  • {{ hotel.location.city }}, {{ hotel.location.country }}
                </p>
              </div>

              <div class="flex flex-row items-center justify-between">
                <p class="text-sm text-gray-400">
                  por
                  <span class="ml-1 text-lg text-dark font-extrabold">{{
                    getFormattedPrice(hotel.price)
                  }}</span>
                </p>
                <vue3-star-ratings v-model="hotel.score" starSize="16" />
              </div>
            </div>
          </div>
        </div>
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
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useHotelsStore } from '@/stores/hotels'
import { useMonetaryUnitStore } from '@/stores/monetary'
import { useFilterStore } from '@/stores/filters'
import { useCategoryStore } from '@/stores/categories'

import type { Hotel } from '@/types/Hotels.types'
import type { Filter } from '@/types/Filters.types'

const route = useRoute()
const router = useRouter()

const hotelStore = useHotelsStore()
const monetaryStore = useMonetaryUnitStore()
const filterStore = useFilterStore()
const categoryStore = useCategoryStore()

const hotels = ref<Hotel[]>([])
const hotelsCount = ref<number>(0)
const monetaryUnit = ref(monetaryStore.currentUnit)

const parseQueryParams = () => {
  const query = route.query
  const filters: Filter = {
    name: query.name ? (query.name as string) : undefined,
    price: query.price ? JSON.parse(query.price as string) : undefined,
    numberGuests: query.numberGuests ? Number(query.numberGuests) : undefined,
    numberBedrooms: query.numberBedrooms ? Number(query.numberBedrooms) : undefined
  }

  if (query.category)
    filters.category = categoryStore.fetchSuggested?.find(
      (category) => category.slug === query.category
    )

  console.log(
    'initial',
    categoryStore.fetchSuggested?.find((category) => category.slug === query.category)
  )
  filterStore.setFilters(filters)
}

const getHotel = () => {
  hotels.value = hotelStore.fetchFilteredHotels()
  hotelsCount.value = hotelStore.getHotelsCount
}

const getFormattedPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: monetaryUnit.value.unit
  }).format(price)
}

onMounted(() => {
  getHotel()
  parseQueryParams()
})

watch(
  () => monetaryStore.currentUnit,
  (newValue, oldValue) => {
    monetaryUnit.value = newValue
    getHotel()
  }
)

watch(
  () => filterStore.filters,
  (newFilters) => {
    const query: Record<string, any> = {}

    if (newFilters.name) query.name = newFilters.name
    if (newFilters.price) query.price = JSON.stringify(newFilters.price)
    if (newFilters.numberGuests) query.numberGuests = newFilters.numberGuests
    if (newFilters.numberBedrooms) query.numberBedrooms = newFilters.numberBedrooms
    if (newFilters.category) query.category = newFilters.category?.slug
    if (newFilters.location) {
      query.location = {
        city: newFilters.location.city,
        country: newFilters.location.country
      }
    }

    router.push({ query })

    getHotel()
  },
  { deep: true }
)
</script>
