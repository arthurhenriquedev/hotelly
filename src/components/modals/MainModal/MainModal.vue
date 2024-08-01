<template>
  <div
    v-if="showModal"
    class="modal__main fixed inset-0 flex justify-center items-start"
    :class="{ 'modal-active': showModal }"
  >
    <div class="bg-black bg-opacity-50 absolute inset-0" @click="closeModal"></div>
    <div class="fixed inset-0 flex justify-center items-start p-4 overflow-y-auto">
      <div class="bg-white max-lg:w-full p-8 rounded-lg z-10">
        <div class="w-full flex justify-end">
          <button @click="closeModal">
            <font-awesome-icon icon="fa-solid fa-times" class="text-dark" />
          </button>
        </div>
        <div class="mb-4">
          <slot name="title"></slot>
        </div>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const showModal = ref(false)

const props = defineProps({
  show: Boolean
})

const emits = defineEmits(['close'])

onMounted(() => {
  showModal.value = props.show
})

watch(
  () => props.show,
  (value) => {
    showModal.value = value
  }
)

const closeModal = () => {
  emits('close')
}
</script>
