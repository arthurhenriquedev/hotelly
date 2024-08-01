<template>
  <div class="flex flex-col items-center justify-center">
    <div class="bg-white rounded-lg w-full">
      <h1 class="text-2xl font-bold mb-4">Reserve um Quarto</h1>
      <form @submit.prevent="submitForm" class="space-y-4 flex flex-col">
        <div>
          <label class="block text-sm font-medium text-gray-700" for="name">Nome</label>
          <input
            v-model="form.name"
            class="block px-4 py-3 text-sm text-gray-900 outline-none border rounded-tl-lg rounded-bl-lg bg-light w-full"
            type="text"
            id="name"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700" for="contact">Contato</label>
          <input
            v-model="form.contact"
            class="block px-4 py-3 text-sm text-gray-900 outline-none border rounded-tl-lg rounded-bl-lg bg-light w-full"
            type="text"
            id="contact"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700" for="cardNumber"
            >Número do Cartão</label
          >
          <input
            v-model="form.cardNumber"
            class="block px-4 py-3 text-sm text-gray-900 outline-none border rounded-tl-lg rounded-bl-lg bg-light w-full"
            type="text"
            id="cardNumber"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700" for="cardName"
            >Nome no Cartão</label
          >
          <input
            v-model="form.cardName"
            class="block px-4 py-3 text-sm text-gray-900 outline-none border rounded-tl-lg rounded-bl-lg bg-light w-full"
            type="text"
            id="cardName"
            required
          />
        </div>

        <div class="flex space-x-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700" for="expiryDate"
              >Data de Expiração</label
            >
            <input
              v-model="form.expiryDate"
              class="block px-4 py-3 text-sm text-gray-900 outline-none border rounded-tl-lg rounded-bl-lg bg-light w-full"
              type="text"
              id="expiryDate"
              placeholder="MM/AA"
              required
            />
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700" for="cvv">CVV</label>
            <input
              v-model="form.cvv"
              class="block px-4 py-3 text-sm text-gray-900 outline-none border rounded-tl-lg rounded-bl-lg bg-light w-full"
              type="text"
              id="cvv"
              required
            />
          </div>
        </div>

        <div>
          <button
            class="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition"
            type="submit"
          >
            Reservar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  contact: '',
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: ''
})

const submitForm = () => {
  console.log('Formulário enviado', form.value)
}
</script>
