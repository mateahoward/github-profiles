<script setup>
import { useProfileStore } from '../stores/profileStore'
import { storeToRefs } from 'pinia'

const profileStore = useProfileStore()
const { searchHistory } = storeToRefs(profileStore)
</script>

<template>
  <details open>
    <summary>Search history</summary>
    <hr />
    <div v-for="item in searchHistory" :key="item.id" class="profile-card--small">
      <div>
        <section class="header">
          <img :src="item.avatar_url" alt="" class="avatar avatar-small" />

          <h2>
            {{ item.name || item.login }}
          </h2>
        </section>
        <small>
          {{ item.company }} <span aria-hidden="true" v-if="item.company">|</span>
          {{ item.location }}
        </small>
      </div>

      <a :href="item.html_url" target="_blank" rel="noopener" class="profile-handle">
        View on GitHub
      </a>
    </div>
  </details>
</template>

<style lang="scss" scoped>
h3 {
  margin-bottom: 0;
}
.profile-card--small {
  padding: 1rem;
  background: #ffffff;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
  a {
    text-align: right;
    display: inline-flex;
    margin: 10px 0;
    font-size: 0.8rem;
  }
}

.header {
  display: flex;
  align-items: self-end;
  margin-bottom: 0.5rem;

  h2 {
    margin-bottom: 0.3rem;
    margin-left: 0.5rem;
    font-size: 1.2rem;
  }
}

.avatar-small {
  width: 30px;
  height: 30px;
}

summary {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
  color: var(--text-dark);
}
</style>
