import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import SearchHistory from '../components/SearchHistory.vue'
import { useProfileStore } from '../stores/profileStore'

describe('SearchHistory Component Validation', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(SearchHistory, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              profile: {
                searchHistory: [],
              },
            },
          }),
        ],
      },
    })
    store = useProfileStore()
  })

  it('renders zero small profile cards when the history data array is empty', async () => {
    expect(wrapper.findAll('.profile-card--small')).toHaveLength(0)
  })

  it('populates multiple small cards within the accordion layout structure', async () => {
    store.searchHistory = [
      {
        id: 1,
        login: 'test',
        name: null,
        avatar_url: 'https://githubusercontent.com',
        company: null,
        location: null,
        html_url: 'https://github.com',
      },
      {
        id: 51357920,
        login: 'mateahoward',
        name: 'Matea Howard',
        avatar_url: 'https://githubusercontent.com',
        company: 'EvaluAgent',
        location: 'United Kingdom',
        html_url: 'https://github.com',
      },
    ]

    await wrapper.vm.$nextTick()

    const smallCards = wrapper.findAll('.profile-card--small')
    expect(smallCards).toHaveLength(2)
  })

  it('binds the correct text values onto metadata fields and tags', async () => {
    store.searchHistory = [
      {
        id: 51357920,
        login: 'mateahoward',
        name: 'Matea Howard',
        avatar_url: 'https://githubusercontent.com',
        company: 'EvaluAgent',
        location: 'United Kingdom',
        html_url: 'https://github.com',
      },
    ]

    await wrapper.vm.$nextTick()

    const card = wrapper.find('.profile-card--small')
    expect(card.find('.avatar-small').attributes('src')).toBe(
      'https://githubusercontent.com'
    )
    expect(card.find('small').text()).toContain('EvaluAgent | United Kingdom')
    expect(card.find('.profile-handle').attributes('href')).toBe('https://github.com')
  })
})
