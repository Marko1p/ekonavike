<template>
  <section class="py-12 bg-green-50 min-h-screen">
    <div class="max-w-xl mx-auto p-6 space-y-6">
      <Lightbulb class="mx-auto w-12 h-12 text-green-700"/>

      <h1 class="text-2xl font-bold text-center text-green-800">
        Personalized Sustainability Tips
      </h1>

      <textarea
        v-model="habitsInput"
        rows="4"
        placeholder="I recycle weekly, etc…"
        class="w-full p-3 border rounded focus:ring-2 focus:ring-green-300"
      />

      <button
        @click="generateTips"
        :disabled="!habitsInput.trim() || loading"
        class="w-full bg-green-700 text-white p-3 rounded hover:bg-green-800 disabled:opacity-50 flex items-center justify-center"
      >
        <Sparkles class="w-5 h-5 mr-2"/>
        <span>{{ loading ? 'Generating…' : 'Get My Tips' }}</span>
      </button>

      <ul v-if="tips.length" class="mt-6 space-y-4">
        <li
          v-for="(tip, i) in tips"
          :key="i"
          class="p-4 bg-white rounded-lg border border-green-100"
        >
          {{ tip }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Lightbulb, Sparkles } from 'lucide-vue-next'
import OpenAI from 'openai'


const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

const habitsInput = ref('')
const tips        = ref([])
const loading     = ref(false)

async function generateTips() {
  if (!habitsInput.value.trim()) return
  loading.value = true
  tips.value     = []

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful eco-assistant.' },
        { role: 'user',   content: `My habits: ${habitsInput.value}. Give me 5 tips.` }
      ],
      temperature: 0.7
    })

    const text = response.choices[0].message.content
    tips.value = text
      .split(/\r?\n/)
      .map(l => l.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter(Boolean)

  } catch (err) {
    console.error(err)
    tips.value = ['Greška pri generiranju savjeta.']
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

</style>
