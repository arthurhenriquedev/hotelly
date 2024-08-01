<template>
  <main-header />
  <main-filter />
  <div class="p-8 page-container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainHeader from '@/components/headers/MainHeader/MainHeader.vue'
import MainFilter from '@/components/filters/MainFilter/MainFilter.vue'
</script>
