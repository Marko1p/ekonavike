<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-green-800 dark:text-green-200 mb-6">
      Local Eco Spots
    </h1>
    <p class="text-gray-700 dark:text-gray-300 mb-4">
      Evo nekih centara za recikliranje i ekološki prihvatljivih trgovina u vašoj blizini:
    </p>

    <ul class="space-y-4">
      <li
        v-for="spot in spots"
        :key="spot.id"
        class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
      >
        <h2 class="text-xl font-semibold text-green-700 dark:text-green-300">
          {{ spot.name }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400">{{ spot.address }}</p>
        <a
          :href="spot.mapUrl"
          target="_blank"
          class="mt-2 inline-block text-green-600 hover:underline"
        >
          Pogledaj na karti →
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'


const spots = ref([])

onMounted(() => {
  spots.value = [
    {
      id: 1,
      name: 'GreenCycle Recycling Center',
      address: 'Ulica recikliranja 12, Zagreb',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=GreenCycle+Recycling+Center+Zagreb'
    },
    {
      id: 2,
      name: 'EcoShop EcoMarket',
      address: 'Čista Priroda bb, Split',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=EcoShop+EcoMarket+Split'
    },
    {
      id: 3,
      name: 'ZeroWaste Store',
      address: 'Održivi trg 5, Rijeka',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=ZeroWaste+Store+Rijeka'
    }
  ]
})
</script>

<style scoped>

</style>
