<template>
  <div class="p-4 w-full min-h-40 border border-gray-200 rounded-xl bg-white">
    <p class="text-dark text-lg mb-4">
      {{ $t('detailed_filter_heading') }}
    </p>

    <div
      class="grid max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-center gap-2"
      id="filters"
    >
      <div class="flex flex-col">
        <label for="location" class="text-sm text-gray-500 mb-1">{{
          $t('filters.location')
        }}</label>
        <select
          id="location"
          v-model="formFilters.location"
          class="block px-4 py-3 text-sm text-gray-900 outline-none border rounded-lg bg-light"
        >
          <option :value="undefined">{{ $t('location.all_locations') }}</option>
          <option v-for="location in availableLocations" :key="location.city" :value="location">
            {{ location.city }}, {{ location.country }}
          </option>
        </select>
      </div>

      <div v-if="formFilters.date" class="flex flex-col">
        <label for="start-date" class="text-sm text-gray-500 mb-1">{{
          $t('filters.date.start')
        }}</label>
        <input
          type="date"
          id="start-date"
          v-model="formFilters.date.start"
          class="block px-4 py-3 text-sm text-gray-900 outline-none border rounded-tl-lg rounded-bl-lg bg-light"
        />
      </div>
      <div v-if="formFilters.date" class="flex flex-col">
        <label for="end-date" class="text-sm text-gray-500 mb-1">{{
          $t('filters.date.end')
        }}</label>
        <input
          type="date"
          id="end-date"
          v-model="formFilters.date.end"
          :min="tomorrowStartDate"
          class="block px-4 py-3 text-sm text-gray-900 outline-none border rounded-tr-lg rounded-br-lg bg-light"
        />
      </div>

      <div class="flex flex-col">
        <label for="number-guests" class="text-sm text-gray-500 mb-1">{{
          $t('filters.number_of_guests')
        }}</label>
        <input
          type="number"
          id="number-guests"
          v-model="formFilters.numberGuests"
          class="block px-4 py-3 text-sm text-gray-900 outline-none border rounded-lg bg-light"
          min="1"
        />
      </div>

      <!-- <div class="flex flex-col w-full">
        <label for="price-range" class="text-sm text-gray-500 mb-1">{{
          $t('filters.price.title')
        }}</label>
        <div class="px-2">
          <vue-slider
            v-model="priceRange"
            :min="prices[0]"
            :max="prices[1]"
            :interval="0.1"
            :lazy="true"
            class="mt-2"
          ></vue-slider>
          {{ priceRange }}
          {{ prices[0] }}
        </div>
        <div class="flex justify-between w-full text-sm text-dark">
          <span>{{ getFormattedPrice(prices[0]) }}</span>
          <span>{{ getFormattedPrice(prices[1]) }}</span>
        </div>
      </div> -->

      <div class="flex flex-col h-full justify-end">
        <button
          class="btn__gradient w-full h-12 outline-none border border-gray-300 text-white rounded-lg"
          @click="applyFilters"
        >
          {{ $t('filters.apply_filters') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { useHotelsStore } from '@/stores/hotels'
import { useFilterStore } from '@/stores/filters'

import type { Filter } from '@/types/Filters.types'
import type { Location } from '@/types/Location.types'

const hotelStore = useHotelsStore()
const filterStore = useFilterStore()

const formFilters = ref<Filter>({
  location: undefined,
  date: {
    start: undefined,
    end: undefined
  },
  numberGuests: 1
})

const priceRange = ref<[number, number]>([0, 1000])
const prices = ref<[number, number]>([0, 1000])
const availableLocations = ref<Location[]>([])

onMounted(() => {
  watch(
    () => hotelStore.getFilteredHotels,
    () => {
      setFilters(JSON.parse(JSON.stringify(filterStore.filters)))
      setLocations(hotelStore.getAvailableLocations)
      setPrices(hotelStore.getAvailablePrices)
    },
    { immediate: true }
  )

  // watch(
  //   () => priceRange.value,
  //   () => {
  //     formFilters.value.price = { min: priceRange.value[0], max: priceRange.value[1] }
  //   }
  // )

  setPrices(hotelStore.getAvailablePrices)

  if (!formFilters?.value?.date?.start || !formFilters?.value?.date?.end) {
    setDefaultDates()
  }
})

const tomorrowStartDate = computed(() => {
  let startDate = new Date(formFilters?.value?.date?.start ?? new Date())
  return new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().split('T')[0]
})

const setDefaultDates = () => {
  const startDate = new Date()
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 1)
  formFilters.value.date = {
    start: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0]
  }
}

const setFilters = (filters: Filter) => {
  if (!filters) return

  if (filters?.date?.start && filters?.date?.end) {
    formFilters.value.date = { ...filters.date }
  }

  if (filters.location) {
    formFilters.value.location = filters.location
  }

  if (filters.numberGuests) {
    formFilters.value.numberGuests = filters.numberGuests
  }

  // if (filters.price?.min && filters.price?.max) {
  //   if (filters.price.min >= prices.value[0]) {
  //     priceRange.value[0] = filters.price.min
  //   }

  //   if (filters.price.max <= prices.value[1]) {
  //     priceRange.value[1] = filters.price.max
  //   }
  // }
}

const setPrices = (newPrices: { min: number; max: number }) => {
  if (!newPrices?.min || !newPrices?.max) {
    prices.value = [0, 1000]
    priceRange.value = [0, 1000]
    return
  }

  const newPricesCopy = JSON.parse(JSON.stringify(newPrices))
  prices.value = [newPricesCopy.min, newPricesCopy.max]
  priceRange.value = [newPricesCopy.min, newPricesCopy.max]
}

const setLocations = (locations: Location[]) => {
  availableLocations.value = locations
}

const applyFilters = () => {
  if (
    new Date(formFilters?.value?.date?.start ?? '') > new Date(formFilters?.value?.date?.end ?? '')
  ) {
    formFilters.value.date = {
      ...formFilters.value.date,
      end: tomorrowStartDate.value
    }
  }

  filterStore.setFilters({ ...formFilters.value })
}
</script>
