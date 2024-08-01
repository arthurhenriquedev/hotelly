import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import Categories from '@/statics/mock/categories.json'

import type { Category } from '@/types/Categories.types'

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  categories.value = Categories

  const getAll = computed(() => {
    return categories?.value || []
  })

  const fetchSuggested = computed(() => {
    return categories?.value?.splice(0, 5) || []
  })

  return { getAll, fetchSuggested }
})
