import { ref } from 'vue'
import { useMonetaryUnitStore } from '@/stores/monetary'

const getFormattedPrice = (price: number) => {
  const monetaryStore = useMonetaryUnitStore()
  const monetaryUnit = ref(monetaryStore.currentUnit)

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: monetaryUnit.value.unit
  }).format(price)
}

const getTotalNights = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return 1

  const start = new Date(startDate)
  const end = new Date(endDate)
  const timeDiff = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

export { getFormattedPrice, getTotalNights }
