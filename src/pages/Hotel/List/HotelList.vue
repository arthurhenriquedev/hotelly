<template>
  <div class="flex flex-col">
    <div class="flex flex-row w-full items-center justify-between mb-8">
      <div class="flex flex-col">
        <p class="text-2xl text-dark font-semibold">{{ $t('list.relevant_experiences') }}</p>
        <p class="text-lg text-gray-400 font-normal">
          {{ $t('list.experiences_count', { count: hotelsCount }) }}
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useHotelsStore } from '@/stores/hotels'
import { useMonetaryUnitStore } from '@/stores/monetary'

import type { Hotel } from '@/types/Hotels.types'

const hotelStore = useHotelsStore()
const monetaryStore = useMonetaryUnitStore()

const hotels = ref<Hotel[]>([])
const hotelsCount = ref<number>(0)
const monetaryUnit = ref(monetaryStore.currentUnit)

watch(
  () => monetaryStore.currentUnit,
  (newValue, oldValue) => {
    monetaryUnit.value = newValue
    getHotel()
  }
)

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
})
</script>
