import { ref } from 'vue'
import { useMonetaryUnitStore } from '@/stores/monetary'
import { useFilterStore } from '@/stores/filters'

const getFormattedPrice = (price: number) => {
  const monetaryStore = useMonetaryUnitStore()
  const filterStore = useFilterStore()
  const monetaryUnit = ref(monetaryStore.currentUnit)
  const filter = filterStore.filters
  const guests = filter.numberGuests

  const startDate = new Date(filter.date?.start)
  const endDate = new Date(filter.date?.end)
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime())
  const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: monetaryUnit.value.unit
  }).format(price * guests * nights)
}

export { getFormattedPrice }
