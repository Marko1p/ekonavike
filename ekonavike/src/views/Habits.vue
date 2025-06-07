<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h2 class="text-3xl font-bold text-green-700 mb-4">Habit Tracker</h2>

    
    <div v-if="!user">
      <p class="text-red-600 mb-4">Morate se prijaviti da vidite svoje navike.</p>
      <router-link to="/" class="text-green-500 hover:underline">Povratak na prijavu</router-link>
    </div>

    
    <div v-else>
      
      <section class="mb-6">
        <label class="block text-green-800 font-medium mb-2" for="new-habit">Dodaj novu naviku:</label>
        <div class="flex gap-2">
          <input
            id="new-habit"
            v-model="newHabit"
            type="text"
            placeholder="Naziv navike"
            class="flex-1 border border-gray-300 rounded p-2"
          />
          <button
            @click="addHabit"
            class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Spremi
          </button>
        </div>
      </section>

      
      <section>
        <h3 class="text-2xl font-semibold text-green-700 mb-2">Tvoje navike</h3>
        <ul class="space-y-2">
          <li
            v-for="h in habits"
            :key="h.id"
            class="flex items-center justify-between bg-white dark:bg-green-800 border border-gray-200 dark:border-green-700 rounded p-3"
          >
            <span class="text-green-800 dark:text-green-200">{{ h.name }}</span>
            <button
              @click="deleteHabit(h.id)"
              class="text-red-500 hover:text-red-700"
            >
              Obriši
            </button>
          </li>
        </ul>
        <p v-if="habits.length === 0" class="text-green-600 mt-4">Još nemaš spremljenih navika.</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useHabitsStore } from '../stores/habits'


const userStore = useUserStore()
const habitsStore = useHabitsStore()

userStore.init()
habitsStore.init()

const newHabit = ref('')
const user = userStore.user
const habits = habitsStore.list


const addHabit = () => {
  if (!newHabit.value.trim()) return
  habitsStore.add(newHabit.value.trim())
  newHabit.value = ''
}
const deleteHabit = id => {
  habitsStore.remove(id)
}
</script>

<style scoped>

</style>
