<script setup>
import GithubProfileCard from './components/GithubProfileCard.vue'
import GithubSearchForm from './components/GithubSearchForm.vue'
import { storeToRefs } from 'pinia'
import { useProfileStore } from './stores/profileStore.js'

const profileStore = useProfileStore()
const { currentProfile } = storeToRefs(profileStore)
</script>

<template>
  <nav class="bg-primary app-navigation">
    <a href="https://github.com/mateahoward" target="_blank"> Back to GitHub</a>
  </nav>

  <main class="app-container">
    <header class="app-header">
      <h1 class="app-title">GitHub Profile Checker</h1>
      <p class="app-subtitle">
        Please type a username you wish to check details for in the box below
      </p>
    </header>

    <section class="main-content">
      <GithubSearchForm @has-user-data="handleUserData"></GithubSearchForm>

      <Transition name="fade">
        <GithubProfileCard v-if="currentProfile" :user-data="currentProfile" />
      </Transition>
    </section>
  </main>
</template>

<style lang="scss">
.main-content {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  margin-top: 4rem;
}
@media (max-width: 800px) {
  .main-content {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
