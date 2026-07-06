<script setup>
import { ref } from 'vue'
import { useProfileStore } from '../stores/profileStore'
import { storeToRefs } from 'pinia'
import SearchHistory from './SearchHistory.vue'

const username = ref('')

const profileStore = useProfileStore()
const { isLoading, error, searchHistory } = storeToRefs(profileStore)

function handleSubmit() {
  error.value = ''

  if (!username.value.trim()) {
    error.value = 'You must enter a username'
    return
  }

  if (username.value.trim().length < 3) {
    error.value = 'Username must be at least three (3) characters long'
    return
  }

  profileStore.fetchProfileData(username.value)
}
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit" id="github-form" class="search-form">
      <div class="input-group">
        <label for="username" class="form-label">GitHub username</label>
        <input
          type="text"
          autocomplete="username"
          id="username"
          v-model="username"
          required
          placeholder="e.g. octocat"
          :class="{ invalid: error }"
          :disabled="isLoading"
          class="form-input"
        />
        <span class="form-error" v-if="error" aria-live="polite" role="alert">
          <span class="error-icon" aria-hidden="true">⚠️</span> {{ error }}
        </span>
      </div>

      <button class="btn-submit" type="submit" :disabled="isLoading">
        <span v-if="isLoading" class="spinner"></span>
        <span aria-hidden="true"> 🔍 </span>
        {{ isLoading ? 'Searching...' : 'Search' }}
      </button>
    </form>

    <SearchHistory v-if="searchHistory.length"></SearchHistory>
  </div>
</template>
