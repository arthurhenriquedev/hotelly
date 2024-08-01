import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

interface MonetaryUnit {
  unit: string
  label?: string
  symbol?: string
  country?: string
}

export const useMonetaryUnitStore = defineStore('monetary-unit', () => {
  const availableUnits = [
    { unit: 'BRL', label: 'Real', symbol: 'R$', country: 'br' },
    { unit: 'USD', label: 'Dollar', symbol: '$', country: 'us' },
    { unit: 'EUR', label: 'Euro', symbol: '€', country: 'eu' }
  ]
  const currentUnit = ref<MonetaryUnit>(availableUnits[0])

  const setCurrentUnit = (monetary: MonetaryUnit) => {
    const unitExists = availableUnits.find((u) => u.unit === monetary.unit)

    if (unitExists) {
      currentUnit.value = unitExists
    } else {
      throw new Error('Invalid unit')
    }
  }

  return { currentUnit, availableUnits, setCurrentUnit }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMonetaryUnitStore, import.meta.hot))
}
