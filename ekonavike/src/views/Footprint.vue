<template>
  <div class="p-6 max-w-md mx-auto space-y-6">
    <h1 class="text-3xl font-bold text-green-700">Kalkulator ekološkog otiska</h1>

    <div class="space-y-4">
      <div>
        <label class="block mb-1">Kilometri vožnje autom tjedno</label>
        <input type="number" v-model.number="kmDriven" class="w-full p-2 border rounded" />
      </div>

      <div>
        <label class="block mb-1">Obroci mesa tjedno</label>
        <input type="number" v-model.number="meatMealsPerWeek" class="w-full p-2 border rounded" />
      </div>

      <div>
        <label class="block mb-1">Kilogrami plastike tjedno</label>
        <input type="number" v-model.number="plasticKgPerWeek" class="w-full p-2 border rounded" />
      </div>
    </div>

    <div class="bg-green-50 p-4 rounded space-y-2">
      <p><strong>Tjedno:</strong> {{ weeklyCO2.toFixed(1) }} kg CO₂</p>
      <p><strong>Mjesečno:</strong> {{ monthlyCO2.toFixed(1) }} kg CO₂</p>
      <p><strong>Godišnje:</strong> {{ yearlyCO2.toFixed(1) }} kg CO₂</p>
    </div>

    <div class="flex space-x-2">
      <button @click="reset" class="flex-1 bg-gray-200 p-2 rounded hover:bg-gray-300">Resetiraj</button>
      <router-link to="/habits" class="flex-1 bg-green-500 text-white p-2 rounded text-center hover:bg-green-600">
        Idi na Navike
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useFootprintStore } from '../stores/footprint'

const fp = useFootprintStore()


const { kmDriven, meatMealsPerWeek, plasticKgPerWeek, weeklyCO2, monthlyCO2, yearlyCO2, reset } = fp
</script>
