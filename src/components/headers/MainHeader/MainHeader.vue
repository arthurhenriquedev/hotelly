<template>
  <header class="header__main fixed w-screen flex flex-row items-center justify-between px-8">
    <div class="flex flex-row items-center flex-grow pr-10">
      <div class="flex flex-row items-center mr-6">
        <div class="logo">
          <p class="text-2xl mr-2 font-semibold">hotelly</p>
        </div>
        <div class="locale-changer">
          <select
            v-model="$i18n.locale"
            class="p-2 text-gray-500 uppercase font-semibold text-sm outline-none"
          >
            <option
              v-for="locale in $i18n.availableLocales"
              :key="`locale-${locale}`"
              :value="locale"
            >
              {{ locale }}
            </option>
          </select>
        </div>
      </div>

      <div class="search max-lg:hidden max-w-96 flex-grow max-xl:flex flex-row items-center">
        <div class="relative flex items-center justify-center gap-2">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="search"
            id="default-search"
            class="block w-full px-4 py-3 ps-10 text-sm text-gray-900 outline-none border rounded-lg bg-light"
            :placeholder="$t('search.placeholder', { count: hotelCount })"
            required
          />
          <button
            class="flex items-center justify-center px-4 py-4 h-full rounded-lg bg-primary border text-light text-sm"
            @click="handleSearch"
          >
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-row">
      <div class="max-md:mr-4 md:mr-10 flex flex-row items-center md:divide-x divide-gray-200">
        <nav class="max-md:hidden flex flex-row gap-8 pr-6 text-sm">
          <router-link to="/" class="text-dark">
            {{ $t('home') }}
          </router-link>
          <router-link to="/" class="text-dark">
            {{ $t('about') }}
          </router-link>
          <router-link to="/" class="text-dark">
            {{ $t('experiences') }}
          </router-link>
        </nav>

        <div class="monetary-unit md:pl-6 flex flex-row items-center">
          <CircleFlags :country="monetaryUnit.country" class="unit-flag" />
          <select
            v-model="monetaryUnit"
            class="p-2 text-gray-500 uppercase font-semibold text-sm outline-none"
            @change="monetaryStore.setCurrentUnit(monetaryUnit)"
          >
            <option
              v-for="monetaryUnit in monetaryStore.availableUnits"
              :key="`unit-${monetaryUnit.unit}`"
              :value="monetaryUnit"
            >
              {{ monetaryUnit.unit }}
            </option>
          </select>
        </div>
      </div>

      <div class="user max-md:hidden flex flex-row">
        <button
          class="flex items-center justify-center px-4 py-3 w-40 rounded-lg bg-dark text-light text-sm"
        >
          {{ $t('user.login') }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { markRaw, onMounted, ref, watch } from 'vue'

import { useHotelsStore } from '@/stores/hotels'
import { useMonetaryUnitStore } from '@/stores/monetary'
import { useFilterStore } from '@/stores/filters'

const hotels = useHotelsStore()
const monetaryStore = useMonetaryUnitStore()
const filterStore = useFilterStore()

const searchQuery = ref('')
const monetaryUnit = ref(monetaryStore.currentUnit)
const hotelCount = hotels.getHotelsCount

const handleSearch = () => {
  filterStore.setFilter('name', searchQuery.value)
}

onMounted(() => {
  if (filterStore.filters.name) {
    searchQuery.value = filterStore.filters.name
  }
})

watch(
  () => filterStore.filters,
  () => {
    searchQuery.value = filterStore.filters.name ?? ''
  }
)
</script>
