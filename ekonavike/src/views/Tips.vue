<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h2 class="text-3xl font-bold text-green-700 mb-6">Sustainability Tips</h2>

    
    <div class="mb-6">
      <label for="category" class="font-medium text-green-800">Filtriraj po kategoriji:</label>
      <select
        v-model="selectedCategory"
        id="category"
        class="ml-2 border border-gray-300 rounded p-1"
      >
        <option value="">Svi</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ capitalize(cat) }}
        </option>
      </select>
    </div>

    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="tip in filteredTips"
        :key="tip.id"
        class="border rounded-lg shadow-sm overflow-hidden bg-white dark:bg-green-800"
      >
        <img
          v-if="tip.imageUrl"
          :src="tip.imageUrl"
          alt="Tip Image"
          class="w-full h-36 object-cover"
        />
        <div class="p-4">
          <h3 class="text-xl font-bold text-green-700 dark:text-green-100 mb-1">{{ tip.title }}</h3>
          <p class="text-green-600 dark:text-green-300 mb-2">{{ tip.description }}</p>
          <p class="text-sm text-gray-500">Kategorija: {{ capitalize(tip.category) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTipsStore } from '../stores/tips'


const tipsStore = useTipsStore()
onMounted(() => {
  if (typeof tipsStore.init === 'function') tipsStore.init()
})

const selectedCategory = ref('')


const categories = computed(() => {
  const all = tipsStore.tips.map(t => t.category)
  return Array.from(new Set(all))
})


const filteredTips = computed(() => {
  if (!selectedCategory.value) return tipsStore.tips
  return tipsStore.tips.filter(t => t.category === selectedCategory.value)
})

function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<style scoped>

</style>
