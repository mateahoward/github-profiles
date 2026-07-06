<script setup>
import GithubProfileCard from './components/GithubProfileCard.vue'
import GithubSearchForm from './components/GithubSearchForm.vue'
import { storeToRefs } from 'pinia'
import { useProfileStore } from './stores/profileStore.js'

const profileStore = useProfileStore()
const { currentProfile } = storeToRefs(profileStore)
</script>

<template>
  <a href="#main" class="skip-to-main"> Skip to main content</a>
  <nav class="bg-primary app-navigation">
    <a href="https://github.com/mateahoward" target="_blank"> Back to GitHub</a>
  </nav>

  <main class="app-container">
    <section class="app-header">
      <h1 class="app-title">GitHub Profile Checker</h1>
      <p class="app-subtitle">
        Please type a username you wish to check details for in the box below
      </p>
    </section>

    <section class="main-content">
      <GithubSearchForm></GithubSearchForm>

      <Transition name="fade">
        <GithubProfileCard v-if="currentProfile" :user-data="currentProfile" />
      </Transition>
    </section>
  </main>
</template>
