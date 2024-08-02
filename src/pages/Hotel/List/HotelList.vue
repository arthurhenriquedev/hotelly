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
          <div class="flex flex-col">
            <label for="location" class="text-sm text-gray-500 mb-1">{{
              $t('filters.sortBy')
            }}</label>
            <select
              id="location"
              v-model="sortBy"
              class="block px-4 py-3 text-sm text-gray-900 outline-none border rounded-lg bg-light"
              @change="() => filterStore.setFilter('sortBy', sortBy)"
            >
              <option v-for="(sortOption, i) in sortOptions" :key="i" :value="sortOption.value">
                {{ sortOption.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div
        class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
      >
        <experience-card
          v-for="hotel in hotels"
          :key="hotel.id"
          :hotel="hotel"
          :compareHotels="compareHotels"
          @openModal="openModal"
          @addHotelToCompare="addHotelToCompare"
        />
      </div>
      <div v-if="hotelsCount > 0" class="flex flex-row justify-center items-center mt-8 w-full">
        <p class="text-md text-gray-400">
          {{ $t('list.list_final') }}
        </p>
      </div>
    </template>

    <main-modal :show="modal.opened" @close="closeModal">
      <template #title v-if="modal.title">
        <div v-html="modal.title"></div>
      </template>
      <template #content>
        <component :is="modal.content" :data="modal.data"></component>
      </template>
    </main-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import type { Hotel } from '@/types/Hotels.types'

import { useHotelsStore } from '@/stores/hotels'
import { useMonetaryUnitStore } from '@/stores/monetary'
import { useFilterStore } from '@/stores/filters'
import { parseQueryParams, updateQueryString } from '@/utils/filters'

import ExperienceCard from '@/components/cards/ExperienceCard/ExperienceCard.vue'
import DetailedFilter from '@/components/filters/DetailedFilter/DetailedFilter.vue'
import MainModal from '@/components/modals/MainModal/MainModal.vue'
import BookingModalContent from '@/components/_content/modals/BookingModalContent.vue'
import CompareModalContent from '@/components/_content/modals/CompareModalContent.vue'

const router = useRouter()

const hotelStore = useHotelsStore()
const monetaryStore = useMonetaryUnitStore()
const filterStore = useFilterStore()

const monetaryUnit = ref(monetaryStore.currentUnit)

const hotels = computed(() => hotelStore.getFilteredHotels)
const hotelsCount = computed(() => hotelStore.getHotelsCount)

const compareHotels = ref<Hotel[]>([])

const { t } = useI18n()

const sortBy = ref<string | undefined>(undefined)
const sortOptions = computed(() => [
  { label: t('filters.relevant'), value: undefined },
  { label: t('filters.price.sort_max'), value: 'price_max' },
  { label: t('filters.price.sort_min'), value: 'price_min' },
  { label: t('filters.score.sort_max'), value: 'score_max' },
  { label: t('filters.score.sort_min'), value: 'score_min' }
])

const modal = ref({
  opened: false,
  title: '',
  content: null as any,
  data: {}
})

onMounted(() => {
  router.push({ query: parseQueryParams() })
  sortBy.value =
    sortOptions.value.find((option) => option.value === filterStore.filters.sortBy)?.value ||
    undefined

  watch(
    () => filterStore.filters,
    (newFilters) => {
      router.push({ query: updateQueryString(newFilters) })
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

const openModal = (hotel: Hotel[] | Hotel, type: string) => {
  modal.value.opened = true

  if (type === 'compare') {
    modal.value.title = ``
    modal.value.content = markRaw(CompareModalContent)
    modal.value.data = { hotels: hotel as Hotel[] }
  } else {
    const hotelObj = hotel as Hotel
    modal.value.title = hotelObj.name
    modal.value.content = markRaw(BookingModalContent)
    modal.value.data = { hotel: hotelObj }
  }
}

const closeModal = () => {
  modal.value.opened = false
  compareHotels.value = []
}

const addHotelToCompare = (hotel: Hotel) => {
  if (compareHotels.value.includes(hotel)) {
    compareHotels.value.splice(compareHotels.value.indexOf(hotel), 1)
    return
  }

  compareHotels.value.push(hotel)

  if (compareHotels.value.length === 2) {
    openModal(compareHotels.value, 'compare')
  }
}
</script>
