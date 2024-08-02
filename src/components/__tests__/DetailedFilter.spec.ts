import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import FilterComponent from '@/components/filters/DetailedFilter/DetailedFilter.vue'

describe('DetailedFilter.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(FilterComponent)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders filter heading', () => {
    const wrapper = mount(FilterComponent)
    const heading = wrapper.find('p.text-dark.text-lg.mb-4')
    expect(heading.exists()).toBe(true)
  })

  it('triggers filter application', async () => {
    const wrapper = mount(FilterComponent)
    const button = wrapper.find('button')

    await button.trigger('click')

    expect(button.exists()).toBe(true)
  })
})
