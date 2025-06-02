<template>
  <div>
    <h1>Profil</h1>
    <!-- Link nazad na početnu -->
    <router-link to="/">Početna</router-link>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Broj navika:</strong> {{ habits.length }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore }   from '../stores/user'
import { useHabitsStore } from '../stores/habits'

const userStore   = useUserStore()
const habitsStore = useHabitsStore()

// izracun korisnika i broj navika
const user   = computed(() => userStore.user)
const habits = computed(() => habitsStore.list)
</script>

<style scoped>

</style>
