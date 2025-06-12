<template>
  <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col">
    <h3 class="text-xl font-semibold text-green-700 mb-2">{{ title }}</h3>
    <p class="text-gray-600 flex-1">{{ desc }}</p>
    <router-link :to="to" class="mt-4 text-green-600 hover:underline font-medium">
      Go to {{ title }} →
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  desc:  { type: String, required: true },
  to:    { type: String, required: true },
})
</script>
