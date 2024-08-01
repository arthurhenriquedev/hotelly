<template>
  <div>
    <h1>Hotel List</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const hotel = ref(null)

const getHotel = () => {
  console.log('getHotel')
}

onMounted(() => {
  getHotel()
})
</script>

<style></style>
