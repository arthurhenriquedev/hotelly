<template>
  <div class="flex flex-col items-center justify-center">
    <div class="bg-white rounded-lg w-full">
      <div class="flex flex-col">
        <div class="flex flex-col mb-4">
          <p class="text-lg text-dark font-semibold">{{ $t('compare.heading') }}</p>
          <p class="text-sm text-gray-400 font-normal">
            {{ $t('compare.description') }}
          </p>
        </div>
        <div class="grid max-md:grid-cols-1 md:grid-cols-2 justify-between items-start gap-4">
          <div
            class="flex flex-col border rounded-lg p-4"
            v-for="hotel in compareData"
            :key="hotel.name"
          >
            <div
              v-if="bestOption && bestOption.id === hotel.id"
              class="bg-green-100 mb-4 rounded-lg py-2 px-4"
            >
              <p class="text-sm text-green-500 font-regular">{{ $t('compare.best_option') }}</p>
            </div>

            <div class="mb-4">
              <p class="text-lg text-dark font-semibold">{{ hotel.name }}</p>
              <p class="text-sm text-gray-400 font-normal">{{ hotel.description }}</p>
            </div>

            <p class="text-sm mb-1" :class="getClassForField(hotel, 'guests', true)">
              {{ $t('hotel_card.guests_quantity') }}: {{ hotel.guests }}
            </p>

            <p class="text-sm mb-1" :class="getClassForField(hotel, 'bedrooms', true)">
              {{ $t('hotel_card.bedrooms_quantity') }}: {{ hotel.bedrooms }}
            </p>

            <p class="text-sm mb-2" :class="getClassForField(hotel, 'price', false)">
              {{ $t('hotel_card.price_per_night') }}: {{ getFormattedPrice(hotel.price) }}
            </p>

            <vue3-star-ratings v-model="hotel.score" disableClick starSize="16" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import { getFormattedPrice } from '@/utils'
import type { Hotel } from '@/types/Hotels.types'

interface DataProps {
  hotels: Hotel[]
}

const props = defineProps<{
  data: DataProps
}>()

const compareData = ref(props.data?.hotels || [])

const getClassForField = (hotel: any, field: string, higherIsBetter: boolean) => {
  const fieldValues = compareData.value.map((hotel: { [x: string]: any }) => hotel[field])
  const minValue = Math.min(...fieldValues)
  const maxValue = Math.max(...fieldValues)
  const value = hotel[field]

  if (higherIsBetter) {
    if (value === maxValue) {
      return 'text-green-500 font-bold'
    } else if (value === minValue) {
      return 'text-red-500 font-bold'
    } else {
      return 'text-gray-500 font-normal'
    }
  } else {
    if (value === minValue) {
      return 'text-green-500 font-bold'
    } else if (value === maxValue) {
      return 'text-red-500 font-bold'
    } else {
      return 'text-gray-500 font-normal'
    }
  }
}

const bestOption = computed(() => {
  if (!compareData.value.length) return null
  const fieldValues = compareData.value.map((hotel: { price: number }) => hotel.price)
  const minValue = Math.min(...fieldValues)
  return compareData.value.find((hotel: { price: number }) => hotel.price === minValue) || null
})
</script>
