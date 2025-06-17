<template>
  <div class="space-y-8 max-w-2xl mx-auto p-4">

    <!-- Header -->
    <section class="text-center">
      <LightbulbIcon class="mx-auto h-16 w-16 text-green-600 mb-4" />
      <h1 class="text-3xl font-bold text-gray-800">Personalized Sustainability Tips</h1>
      <p class="text-gray-600 mt-2">
        Tell us about your current eco-habits, and we'll provide tailored advice to help you live more sustainably.
      </p>
    </section>

    <!-- Card / Form -->
    <div class="border rounded-lg shadow p-6">
      <label for="habits" class="block font-medium text-gray-700 mb-2">Describe Your Habits</label>
      <textarea
        id="habits"
        v-model="habits"
        rows="5"
        class="w-full border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="e.g. I recycle paper and plastic, take public transport three times per week…"
      />

      <p v-if="tooShort" class="text-red-500 text-sm mt-1">
        Please enter at least 10 characters.
      </p>

      <button
        :disabled="isLoading || tooShort"
        @click="getTips"
        class="mt-4 w-full inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        <template v-if="isLoading">
          <Loader2Icon class="h-5 w-5 animate-spin mr-2" /> Generating…
        </template>
        <template v-else>
          <SparklesIcon class="h-5 w-5 mr-2" /> Get My Tips
        </template>
      </button>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="flex items-start space-x-2 bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <AlertTriangleIcon class="h-5 w-5 text-red-500 flex-shrink-0" />
      <div>
        <h3 class="font-medium text-red-800">Error</h3>
        <p class="text-red-700">{{ error }}</p>
      </div>
    </div>

    <!-- Tips Card -->
    <div v-if="tips.length" class="border rounded-lg shadow p-6 bg-green-50">
      <div class="flex items-center space-x-2 mb-4">
        <SparklesIcon class="h-6 w-6 text-green-600" />
        <h2 class="text-2xl font-semibold text-green-800">Your Personalized Tips</h2>
      </div>
      <div class="space-y-3 text-gray-700">
        <p v-for="(line, i) in tips" :key="i">{{ line }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

// lucide-icons (install via `npm install lucide-vue-next`)
import { Lightbulb, Loader2, Sparkles, AlertTriangle } from 'lucide-vue-next'

const LightbulbIcon    = Lightbulb
const Loader2Icon      = Loader2
const SparklesIcon     = Sparkles
const AlertTriangleIcon = AlertTriangle

// State
const habits   = ref('')
const tips     = ref([])
const error    = ref(null)
const isLoading= ref(false)

// Simple validation: min 10 chars
const tooShort = computed(() => habits.value.trim().length < 10)

// Fetch tips from your Express endpoint
async function getTips() {
  if (tooShort.value) return
  isLoading.value = true
  error.value     = null
  tips.value      = []

  try {
    const res = await axios.post('/api/tips', { habits: habits.value })
    // Split on newlines to match the React example’s map over lines
    tips.value = res.data.tips.split('\n').filter(l => l.trim())
  } catch (e) {
    console.error(e)
    error.value = e.response?.data?.error || 'Failed to generate tips. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Feel free to tweak these a bit if needed */
</style>
