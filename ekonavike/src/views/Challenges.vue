<template>
  

  <section class="p-6 max-w-4xl mx-auto space-y-6">
    <h1 class="text-3xl font-bold text-center">Eco-Izazovi</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="c in challengesStore.allChallenges"
        :key="c.id"
        class="border rounded-lg p-4 flex flex-col"
      >
        <!-- Naslov + bedž -->
        <h2 class="text-xl font-semibold mb-2">
          {{ c.title }}
          <span
            v-if="isFinished(c.id)"
            class="ml-2 inline-block bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded"
          >
            Bedž: {{ c.badge || 'Završeno' }}
          </span>
        </h2>

        <!-- Opis -->
        <p class="flex-grow mb-4">{{ c.description }}</p>

        <!-- Gumbi -->
        <div class="mt-auto space-x-2">
          <!-- Ako još nisi ušao u izazov -->
          <button
            v-if="!isJoined(c.id)"
            @click="challengesStore.joinChallenge(c.id)"
            class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Pridruži se
          </button>

          <!-- Ako jesi, prikaži toggle -->
          <button
            v-else
            @click="challengesStore.toggleFinishChallenge(c.id)"
            :class="isFinished(c.id)
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-green-500 hover:bg-green-600'"
            class="text-white px-3 py-1 rounded"
          >
            {{ isFinished(c.id) ? 'Poništi dovršeno' : 'Označi dovršeno' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useChallengesStore } from '@/stores/challenges'
import Navbar from '@/components/Navbar.vue'

const challengesStore = useChallengesStore()

// pri mountu podesi onSnapshot slušalice
onMounted(() => {
  challengesStore.fetchAllChallenges()
  challengesStore.fetchUserChallenges()
})

// pomoćne funkcije za template
const isJoined = id =>
  challengesStore.userChallenges.some(uc => uc.challengeId === id)

const isFinished = id =>
  challengesStore.userChallenges.some(uc => uc.challengeId === id && uc.isFinished)
</script>
