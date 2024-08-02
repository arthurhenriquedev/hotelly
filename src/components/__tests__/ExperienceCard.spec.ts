import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ExperienceCard from '@/components/cards/ExperienceCard/ExperienceCard.vue'
import type { Hotel } from '@/types/Hotels.types'

const hotel: Hotel = {
  id: 'ABC',
  name: 'Hotel Example',
  category: { id: 1, slug: 'hotel' },
  bedrooms: 2,
  guests: 4,
  location: { city: 'City', country: 'Country' },
  price: 100,
  nights: 1,
  score: 4.5,
  image: 'https://placehold.co/600x400'
}

const compareHotels: Hotel[] = [hotel, hotel]

describe('ExperienceCard.vue', () => {
  const wrapper = mount(ExperienceCard, {
    props: {
      hotel,
      compareHotels
    }
  })

  it('renders hotel details correctly', () => {
    expect(wrapper.find('p.text-md.text-dark.font-semibold').text()).toBe(hotel.name)
    expect(wrapper.find('p.text-sm.uppercase.text-gray-400.mb-2').text()).toBe('Hotel')
  })

  it('emits openModal with correct payload when booking button is clicked', async () => {
    await wrapper.find('button.bg-primary').trigger('click')

    expect(wrapper.emitted('openModal')).toHaveLength(1)
    expect(wrapper.emitted('openModal')?.[0]).toEqual([{ hotel, type: 'booking' }])
  })

  it('emits addHotelToCompare when compare button is clicked', async () => {
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('addHotelToCompare')).toHaveLength(1)
    expect(wrapper.emitted('addHotelToCompare')?.[0]).toEqual([hotel])
  })
})
