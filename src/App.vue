<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import NotificationService from './services/NotificationService'

onMounted(() => {
  requestNotificationPermission()
})

const requestNotificationPermission = () => {
  NotificationService.requestPermission()
}
</script>

<style src="./css/app.scss" lang="scss"></style>
