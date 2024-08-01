import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import Categories from '@/statics/mock/categories.json'

import type { Category } from '@/types/Categories.types'

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([{ id: 1, slug: 'loading' }])
  categories.value = Categories

  const fetchAll = computed(() => {
    return categories.value?.splice(0, 10) || []
  })

  const fetchSuggested = computed(() => {
    return categories?.value?.splice(0, 5) || []
  })

  return { fetchAll, fetchSuggested }
})
