import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import GithubSearchForm from '../components/GithubSearchForm.vue'
import { useProfileStore } from '../stores/profileStore'

describe('GithubSearchForm Component Verification', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(GithubSearchForm, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              profile: {
                isLoading: false,
                error: null,
              },
            },
          }),
        ],
      },
    })
    store = useProfileStore()
  })

  it('updates the username data state when a user types into the input field', async () => {
    const input = wrapper.find('#username')

    await input.setValue('mateahoward')

    expect(wrapper.vm.username).toBe('mateahoward')
  })

  it('displays a local validation error when trying to submit an empty username', async () => {
    const form = wrapper.find('form')

    await form.trigger('submit.prevent')

    const errorSpan = wrapper.find('.form-error')
    expect(errorSpan.exists()).toBe(true)
    expect(errorSpan.text()).toContain('You must enter a username')
  })

  it('displays a local validation error when username is shorter than three characters', async () => {
    const input = wrapper.find('#username')
    const form = wrapper.find('form')

    await input.setValue('ma')
    await form.trigger('submit.prevent')

    const errorSpan = wrapper.find('.form-error')
    expect(errorSpan.exists()).toBe(true)
    expect(errorSpan.text()).toContain(
      'Username must be at least three (3) characters long'
    )
  })

  it('calls the global Pinia fetch action when form passes validation', async () => {
    const input = wrapper.find('#username')
    const form = wrapper.find('form')

    vi.spyOn(store, 'fetchProfileData').mockImplementation(async () => {})

    await input.setValue('mateahoward')
    await form.trigger('submit.prevent')

    expect(store.fetchProfileData).toHaveBeenCalledTimes(1)
    expect(store.fetchProfileData).toHaveBeenCalledWith('mateahoward')
  })

  it('displays the API error layout when the global store returns an error state', async () => {
    store.error = 'GitHub user not found.'

    await wrapper.vm.$nextTick()

    const errorSpan = wrapper.find('.form-error')
    expect(errorSpan.exists()).toBe(true)
    expect(errorSpan.text()).toContain('GitHub user not found.')
    expect(wrapper.find('#username').classes()).toContain('invalid')
  })

  it('disables the input field and changes button text when API call is loading', async () => {
    store.isLoading = true

    await wrapper.vm.$nextTick()

    const input = wrapper.find('#username')
    const button = wrapper.find('.btn-submit')

    expect(input.attributes('disabled')).toBeDefined()
    expect(button.text()).toContain('Searching...')
    expect(wrapper.find('.spinner').exists()).toBe(true)
  })
})
