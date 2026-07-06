<script setup>
import { computed } from 'vue'

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})

const formattedDate = computed(() => {
  if (!props.userData?.created_at) return ''
  const date = new Date(props.userData.created_at)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
})
</script>

<template>
  <div v-if="userData" class="profile-card">
    <section class="profile-header">
      <div class="avatar-container">
        <img :src="userData.avatar_url" alt="" class="avatar" />
      </div>
      <h2 class="profile-name">{{ userData.name || userData.login }}</h2>
      <a :href="userData.html_url" target="_blank" rel="noopener" class="profile-handle">
        View on GitHub
      </a>
    </section>

    <p v-if="userData.bio" class="profile-bio">
      {{ userData.bio }}
    </p>

    <div class="profile-meta">
      <div v-if="userData.location" class="meta-item">
        <span class="meta-icon" aria-hidden="true">📍</span>
        <div class="meta-text">
          <h3>Location</h3>
          <p>{{ userData.location }}</p>
        </div>
      </div>

      <div v-if="userData.company" class="meta-item">
        <span class="meta-icon" aria-hidden="true">🏢</span>
        <div class="meta-text">
          <h3>Organisation</h3>
          <p>{{ userData.company }}</p>
        </div>
      </div>

      <div class="meta-item full-width">
        <span class="meta-icon" aria-hidden="true">📅</span>
        <div class="meta-text">
          <h3>GitHub Member Since</h3>
          <p>{{ formattedDate }}</p>
        </div>
      </div>
    </div>

    <footer class="profile-stats">
      <div class="stat-box">
        <span class="stat-value">{{ userData.followers }}</span>
        <span class="stat-label">Followers</span>
      </div>
      <div class="stat-box">
        <span class="stat-value">{{ userData.following }}</span>
        <span class="stat-label">Following</span>
      </div>
      <div class="stat-box">
        <span class="stat-value">{{ userData.public_repos }}</span>
        <span class="stat-label">Public repos</span>
      </div>
    </footer>
  </div>
</template>
