<template>
  <div class="flex flex-col w-full h-96 bg-white border-gray-200 border rounded-3xl">
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
            {{ $t('by') }}:
            <span class="ml-1 text-lg text-dark font-extrabold">{{
              getFormattedPrice(hotel.price)
            }}</span>
            / {{ hotel.nights && hotel.nights > 1 ? $t('total') : $t('hotel_card.night') }}
          </p>
          <vue3-star-ratings v-model="hotelScore" disableClick starSize="16" />
        </div>

        <div class="flex flex-row justify-between items-center gap-4">
          <button
            class="w-full border border-gray-300 px-4 py-3 rounded-lg transition"
            :class="{
              'bg-green-400 font-semibold text-white': isCompareSelected,
              'bg-light text-dark hover:bg-gray-200': !isCompareSelected
            }"
            @click="openModal('compare')"
          >
            {{ !isCompareSelected ? $t('compare.button') : $t('compare.selected') }}
          </button>
          <button
            class="w-full bg-primary text-white border border-gray-300 px-4 py-3 rounded-lg hover:bg-blue-700 transition"
            @click="openModal('booking')"
          >
            {{ $t('book') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { PropType } from 'vue'
import type { Hotel } from '@/types/Hotels.types'

import { getFormattedPrice } from '@/utils'

const emits = defineEmits(['openModal', 'addHotelToCompare'])

const props = defineProps({
  hotel: {
    type: Object as PropType<Hotel>,
    required: true
  },
  compareHotels: {
    type: Array as PropType<Hotel[]>,
    required: true
  }
})

const hotelScore = ref<number>(props.hotel.score)

const openModal = (type: string) => {
  if (type === 'compare') {
    emits('addHotelToCompare', props.hotel)
    return
  }

  emits('openModal', { hotel: props.hotel, type })
}

const isCompareSelected = computed(() => {
  return props.compareHotels.includes(props.hotel)
})
</script>
