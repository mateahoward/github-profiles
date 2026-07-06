import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
  const currentProfile = ref(null)
  const searchHistory = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchProfileData(username) {
    const trimmedUsername = username.trim()
    if (!trimmedUsername) return

    isLoading.value = true
    error.value = null

    const targetUrl = `https://api.github.com/users/${trimmedUsername}`

    try {
      const response = await fetch(targetUrl)

      if (!response.ok) {
        if (response.status === 404) throw new Error('GitHub user not found.')
        throw new Error('Network error. Please try again later.')
      }

      const data = await response.json()

      currentProfile.value = data

      const alreadySaved = searchHistory.value.some((user) => user.login === data.login)
      if (!alreadySaved) {
        searchHistory.value.push(data)
      }
    } catch (err) {
      error.value = err.message
      currentProfile.value = null
    } finally {
      isLoading.value = false
    }
  }

  function clearProfile() {
    currentProfile.value = null
    error.value = null
  }

  function selectFromHistory(profile) {
    currentProfile.value = profile
    error.value = null
  }

  return {
    currentProfile,
    searchHistory,
    isLoading,
    error,
    fetchProfileData,
    clearProfile,
    selectFromHistory,
  }
})
