<template>
  <div class="space-y-8 p-6">
    <!-- Header -->
    <section class="text-center">
      <h1 class="text-3xl font-bold text-green-800 mb-2">Eco-Challenges</h1>
      <p class="text-gray-700">Take on challenges, earn badges, and make a difference!</p>
    </section>

    <!-- Progress Card -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-2">
        <div class="font-medium">Completed: {{ completedCount }} / {{ challenges.length }}</div>
        <div class="font-medium">Points: <span class="text-green-600">{{ totalPoints }}</span></div>
      </div>
      <div class="h-3 bg-gray-200 rounded overflow-hidden mb-4">
        <div
          class="h-full bg-green-500"
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>
      <div v-if="completedCount" class="mt-4">
        <h3 class="font-medium mb-2">Earned Badges:</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="c in challenges.filter(ch => completed.has(ch.id))"
            :key="c.id"
            class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
          >
            🏅 {{ c.badge }}
          </span>
        </div>
      </div>
    </div>

    <!-- Challenge Tiles -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="ch in challenges"
        :key="ch.id"
        class="bg-white rounded-lg shadow flex flex-col"
        :class="{ 'border-2 border-green-500': completed.has(ch.id) }"
      >
        <div class="relative">
          <img
            class="w-full h-48 object-cover rounded-t-lg"
            :src="ch.image.src"
            :alt="ch.image.alt"
          />
          <div
            v-if="completed.has(ch.id)"
            class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg"
          >
            <span class="text-white text-4xl">✔︎</span>
          </div>
        </div>
        <div class="p-4 flex-1 flex flex-col">
          <h2 class="text-xl font-semibold mb-2">{{ ch.title }}</h2>
          <p class="text-gray-600 mb-4 flex-1">{{ ch.description }}</p>
          <div class="text-sm text-gray-500 mb-4">
            Duration: {{ ch.duration }} • Points: {{ ch.points }}
          </div>
          <button
            class="mt-auto bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            @click="toggleComplete(ch.id)"
          >
            {{ completed.has(ch.id) ? '✔︎ Completed!' : '🎯 Mark as Complete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// your challenge data
const challenges = [
  {
    id: 'plastic-free-week',
    title: 'Plastic-Free Week',
    description:
      'Avoid single-use plastics for an entire week. Bring your own bags, bottles, and containers.',
    badge: 'Plastic Warrior',
    duration: '7 days',
    points: 100,
    image: { src: 'https://placehold.co/600x400', alt: 'No plastic' },
  },
  {
    id: 'bike-commuter',
    title: 'Bike Commuter',
    description:
      'Cycle or walk to work/school instead of driving for 5 days this month.',
    badge: 'Pedal Power',
    duration: '1 month',
    points: 150,
    image: { src: 'https://placehold.co/600x400', alt: 'Cycling' },
  },
  {
    id: 'water-saver',
    title: 'Water Saver Quest',
    description:
      'Reduce your daily water usage. Take shorter showers, fix leaks, and be mindful of water waste.',
    badge: 'Aqua Guardian',
    duration: '14 days',
    points: 75,
    image: { src: 'https://placehold.co/600x400', alt: 'Water drop' },
  },
]

// state for completed IDs
const completed = ref(new Set())

// load from localStorage on mount
onMounted(() => {
  const stored = localStorage.getItem('completedChallenges')
  if (stored) {
    JSON.parse(stored).forEach((id) => completed.value.add(id))
  }
})

// persist whenever `completed` changes
watch(
  completed,
  (newSet) => {
    localStorage.setItem(
      'completedChallenges',
      JSON.stringify(Array.from(newSet))
    )
  },
  { deep: true }
)

// toggle helper
function toggleComplete(id) {
  if (completed.value.has(id)) completed.value.delete(id)
  else completed.value.add(id)
}

// computed summaries
const completedCount = computed(() => completed.value.size)
const totalPoints = computed(() =>
  challenges
    .filter((c) => completed.value.has(c.id))
    .reduce((sum, c) => sum + c.points, 0)
)
const progressPercent = computed(() =>
  (completedCount.value / challenges.length) * 100
)
</script>

<style scoped>
/* no extra styles needed—everything is Tailwind */
</style>
