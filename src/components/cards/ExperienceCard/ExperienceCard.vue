<template>
  <div class="flex flex-col w-full h-80 bg-white border-gray-200 border rounded-3xl">
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
            / noite
          </p>
          <vue3-star-ratings v-model="hotel.score" starSize="16" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'

import type { Hotel } from '@/types/Hotels.types'

import { getFormattedPrice } from '@/utils'

defineProps({
  hotel: {
    type: Object as PropType<Hotel>,
    required: true
  }
})
</script>
