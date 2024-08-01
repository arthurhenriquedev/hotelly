<template>
  <header class="header__main flex flex-row items-center justify-between px-8">
    <div class="flex flex-row items-center">
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

      <div class="search flex flex-row items-center">
        <form>
          <div class="relative flex items-center justify-center">
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
              class="block w-96 px-4 py-3 ps-10 text-sm text-gray-900 outline-none border rounded-lg bg-light"
              :placeholder="$t('search.placeholder', { count: hotelCount })"
              required
            />
          </div>
        </form>
      </div>
    </div>

    <div class="flex flex-row">
      <div class="mr-10 flex flex-row items-center divide-x divide-gray-200">
        <nav class="flex flex-row gap-8 pr-6 text-sm">
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

        <div class="monetary-unit pl-6 flex flex-row items-center">
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

      <div class="user flex flex-row">
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
import { ref } from 'vue'
import { useHotelsStore } from '@/stores/hotels'
import { useMonetaryUnitStore } from '@/stores/monetary'

const hotels = useHotelsStore()
const monetaryStore = useMonetaryUnitStore()

const searchQuery = ref('')
const monetaryUnit = ref(monetaryStore.currentUnit)
const hotelCount = hotels.getHotelsCount
</script>
