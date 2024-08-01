<template>
  <div
    class="max-lg:hidden fixed w-screen filter__main flex flex-row items-center divide-x justify-between pr-8"
  >
    <div class="flex flex-row h-full">
      <button class="btn__gradient w-80 h-full px-8 text-white rounded-tr-3xl" id="all_categories">
        <font-awesome-icon icon="fa-solid fa-grip" class="mr-1" />
        {{ $t('all_categories') }}
        <font-awesome-icon icon="fa-solid fa-angle-down" class="ml-1" />
      </button>

      <div class="max-xl:hidden flex flex-row px-4" id="suggested_categories">
        <button
          class="btn__bordered h-full px-8 text-dark flex flex-row items-center justify-center"
          :class="{ selected: selectedCategory === category }"
          v-for="category in suggestedCategories"
          :key="category.id"
          @click="handleCategorySelect(category)"
        >
          <font-awesome-icon
            v-if="category.icon"
            :icon="`fa-solid fa-${category.icon}`"
            size="lg"
            class="mr-4"
          />
          <p class="text-sm">{{ $t(`categories.${category.slug}`) }}</p>
        </button>
      </div>
    </div>
    <div class="flex flex-row w-52 items-center pl-8 cursor-pointer">
      <img
        v-lazy="'@/assets/icons/map.png'"
        alt="map"
        class="w-10 h-10 rounded-full border border-gray-400 mr-4"
      />
      <div class="flex flex-col w-24 items-center overflow-hidden">
        <p class="text-sm text-dark font-semibold truncate w-full">
          {{ filters.filters?.location?.city || $t('location.all_locations') }}
        </p>
        <p v-if="filters.filters?.location?.country" class="text-sm text-dark truncate w-full">
          {{ filters.filters?.location?.country }}
        </p>
      </div>
      <font-awesome-icon icon="fa-solid fa-angle-down" class="ml-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { useCategoryStore } from '@/stores/categories'
import { useFilterStore } from '@/stores/filters'

import type { Category } from '@/types/Categories.types'

const filters = useFilterStore()
const categoryStore = useCategoryStore()

const suggestedCategories = ref<Category[]>([])
const selectedCategory = ref<Category | null>(null)

const handleCategorySelect = (category: Category) => {
  selectedCategory.value = category
  filters.setFilter('category', category)
}

onMounted(() => {
  suggestedCategories.value = categoryStore.fetchSuggested
  if (filters.filters.category) {
    selectedCategory.value = filters.filters.category
  }
})

watch(
  () => filters.filters,
  () => {
    if (filters.filters.category) {
      selectedCategory.value = filters.filters.category
    }
  }
)
</script>
