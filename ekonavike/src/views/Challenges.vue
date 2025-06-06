<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold text-green-700 mb-6">Eco-Challenges</h2>

    
    <section class="mb-12">
      <h3 class="text-2xl font-semibold text-green-600 mb-4">Aktivni izazovi</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="c in allChallenges"
          :key="c.id"
          class="border rounded-lg shadow-sm overflow-hidden bg-white dark:bg-green-800"
        >
          <img
            :src="c.imageUrl || placeholder"
            alt="Challenge Image"
            class="w-full h-36 object-cover"
          />
          <div class="p-4">
            <h4 class="text-xl font-bold text-green-700 dark:text-green-100 mb-1">{{ c.title }}</h4>
            <p class="text-green-600 dark:text-green-300 mb-3">{{ c.description }}</p>
            <p class="text-sm text-gray-500 mb-2">
              Trajanje: {{ c.durationDays }} dana
              ({{ formatDate(c.startDate) }} – {{ formatDate(c.endDate) }})
            </p>
            <button
              :disabled="isJoined(c.id)"
              @click="joinChallenge(c.id)"
              class="px-4 py-2 rounded text-white font-semibold"
              :class="isJoined(c.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'"
            >
              {{ isJoined(c.id) ? 'Pridruženo' : 'Pridruži se' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    
    <section>
      <h3 class="text-2xl font-semibold text-green-600 mb-4">Moji izazovi</h3>
      <div v-if="userChallenges.length === 0" class="text-green-600">
        Još nisi pridružen nijednom izazovu.
      </div>
      <div v-else class="space-y-6">
        <div
          v-for="uc in userChallenges"
          :key="uc.id"
          class="border rounded-lg shadow-sm bg-white dark:bg-green-800 p-4"
        >
          <h4 class="text-xl font-bold text-green-700 dark:text-green-100 mb-1">
            {{ getChallengeTitle(uc.challengeId) }}
          </h4>
          <p class="text-green-600 dark:text-green-300 mb-2">
            Počinje: {{ formatDate(getChallenge(uc.challengeId)?.startDate) }}
            • Završava: {{ formatDate(getChallenge(uc.challengeId)?.endDate) }}
          </p>
          
          <div class="mb-2">
            <span class="font-semibold text-green-800 dark:text-green-200">
              Napredak:
            </span>
            {{ uc.daysCompleted.length }} / {{ getChallenge(uc.challengeId)?.durationDays }} dana
          </div>
          
          <button
            :disabled="isTodayCompleted(uc.daysCompleted)"
            @click="markToday(uc.id)"
            class="px-3 py-1 rounded text-white font-semibold"
            :class="isTodayCompleted(uc.daysCompleted) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'"
          >
            {{ isTodayCompleted(uc.daysCompleted) ? 'Danas označeno' : 'Označi današnji dan' }}
          </button>
          
          <div v-if="uc.isFinished" class="mt-2 text-green-700 dark:text-green-200">
            🎉 Završili ste ovaj izazov {{ formatDate(uc.finishedAt) }}! 🎉
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useChallengesStore } from '../stores/challenges'
import { useUserStore } from '../stores/user'
import { format } from 'date-fns'  

const challengesStore = useChallengesStore()
const userStore       = useUserStore()


const placeholder = 'https://via.placeholder.com/600x400'


onMounted(async () => {
  await challengesStore.fetchAllChallenges()
  await challengesStore.fetchUserChallenges()
})


const todayString = ref(new Date().toISOString().slice(0, 10))


function formatDate(ts) {
  if (!ts) return '-'
  
  const dateObj = ts.toDate ? ts.toDate() : ts instanceof Date ? ts : new Date(ts)
  return format(dateObj, 'dd.MM.yyyy')
}


function getChallenge(id) {
  return challengesStore.allChallenges.find(c => c.id === id)
}


function getChallengeTitle(id) {
  const c = getChallenge(id)
  return c ? c.title : 'Nepoznati izazov'
}


function isJoined(challengeId) {
  return challengesStore.userChallenges.some(uc => uc.challengeId === challengeId)
}


async function joinChallenge(challengeId) {
  await challengesStore.joinChallenge(challengeId)
}


function isTodayCompleted(daysCompleted) {
  return daysCompleted.includes(todayString.value)
}


async function markToday(userChallengeId) {
  await challengesStore.completeDay(userChallengeId, todayString.value)
  await challengesStore.checkFinish(userChallengeId)
}
</script>

<style scoped>


</style>
