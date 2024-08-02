import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import FilterComponent from './DetailedFilter.vue'
import i18n from '@/plugins/i18n'
import { useHotelsStore } from '@/stores/hotels'
import { useFilterStore } from '@/stores/filters'

vi.mock('@/stores/hotels')
vi.mock('@/stores/filters')

describe('DetailedFilter.vue', () => {
  beforeEach(() => {
    const hotelStoreMock = {
      getFilteredHotels: vi.fn(),
      getAvailableLocations: vi.fn().mockReturnValue([{ city: 'City1', country: 'Country1' }]),
      getAvailablePrices: vi.fn().mockReturnValue({ min: 0, max: 1000 })
    }

    const filterStoreMock = {
      filters: {
        location: undefined,
        date: {
          start: undefined,
          end: undefined
        },
        numberGuests: 1
      },
      setFilters: vi.fn()
    }

    useHotelsStore.mockReturnValue(hotelStoreMock)
    useFilterStore.mockReturnValue(filterStoreMock)
  })

  it('renders correctly', () => {
    const wrapper = mount(FilterComponent)

    expect(wrapper.find('p.text-dark.text-lg.mb-4').text()).toBe(
      i18n.global.t('detailed_filter_heading')
    )
  })

  it('applies filters correctly', async () => {
    const wrapper = mount(FilterComponent)

    wrapper.vm.formFilters.location = { city: 'City', country: 'Country' }
    wrapper.vm.formFilters.date = { start: '2022-01-01', end: '2022-01-02' }
    wrapper.vm.formFilters.numberGuests = 2

    await wrapper.find('button').trigger('click')

    const filterStore = useFilterStore()
    expect(filterStore.setFilters).toHaveBeenCalledWith({
      location: { city: 'City', country: 'Country' },
      date: { start: '2022-01-01', end: '2022-01-02' },
      numberGuests: 2
    })
  })
})
