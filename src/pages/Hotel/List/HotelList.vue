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
            {{ $t('filters.filter') }}
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
import { useRouter } from 'vue-router'

import { useHotelsStore } from '@/stores/hotels'
import { useMonetaryUnitStore } from '@/stores/monetary'
import { useFilterStore } from '@/stores/filters'
import { parseQueryParams, updateQueryString } from '@/services/filters'

import ExperienceCard from '@/components/cards/ExperienceCard/ExperienceCard.vue'
import DetailedFilter from '@/components/filters/DetailedFilter/DetailedFilter.vue'

const router = useRouter()

const hotelStore = useHotelsStore()
const monetaryStore = useMonetaryUnitStore()
const filterStore = useFilterStore()

const monetaryUnit = ref(monetaryStore.currentUnit)

const hotels = computed(() => hotelStore.getFilteredHotels)
const hotelsCount = computed(() => hotelStore.getHotelsCount)

onMounted(() => {
  router.push({ query: parseQueryParams() })

  watch(
    () => filterStore.filters,
    (newFilters) => {
      router.push({ query: updateQueryString(newFilters) })
      console.log('update', updateQueryString(newFilters))
    },
    { deep: true }
  )
})

watch(
  () => monetaryStore.currentUnit,
  (newValue) => {
    monetaryUnit.value = newValue
  }
)
</script>
