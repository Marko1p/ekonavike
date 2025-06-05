<template>
  <div>
    <h1>Profil</h1>
    <router-link to="/">Početna</router-link>
    <p>Email: {{ user.email }}</p>
    <p>Broj navika: {{ habits.length }}</p>

    <section>
      <h2>Bedževi</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div 
          v-for="b in earnedBadges" 
          :key="b.badgeId" 
          class="border p-2 rounded text-center"
        >
          <p class="font-bold">{{ getBadgeName(b.badgeId) }}</p>
          <p class="text-sm text-gray-500">
            {{ new Date(b.earnedAt.seconds * 1000).toLocaleDateString() }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore }   from '../stores/user'
import { useHabitsStore } from '../stores/habits'
import { useBadgesStore } from '../stores/badges'

const userStore   = useUserStore()
const habitsStore = useHabitsStore()
const badgesStore = useBadgesStore()


badgesStore.init()

const user   = computed(() => userStore.user)
const habits = computed(() => habitsStore.list)
const earnedBadges = computed(() => badgesStore.earned)

function getBadgeName(badgeId) {
  const badge = badgesStore.available.find(b => b.id === badgeId)
  return badge ? badge.name : badgeId
}
</script>
