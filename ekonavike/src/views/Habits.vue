<template>
  <div class="p-6 space-y-8">

    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">My Eco Habits</h1>
      <button
        @click="openForm()"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        + New Habit
      </button>
    </div>

    <form
      v-if="showForm"
      @submit.prevent="submitForm"
      class="bg-white shadow p-6 rounded space-y-4"
    >
      <div>
        <label class="block font-medium">Name <span class="text-red-500">*</span></label>
        <input
          v-model="form.name"
          type="text"
          class="w-full border rounded px-3 py-2"
        />
        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      </div>

      <div>
        <label class="block font-medium">Type</label>
        <select v-model="form.type" class="w-full border rounded px-3 py-2">
          <option value="recycling">Recycling</option>
          <option value="transport">Eco Transport</option>
          <option value="energy">Energy Saving</option>
          <option value="waste_reduction">Waste Reduction</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label class="block font-medium">Date</label>
        <input
          v-model="form.date"
          type="date"
          class="w-full border rounded px-3 py-2"
        />
        <p v-if="errors.date" class="text-red-500 text-sm">{{ errors.date }}</p>
      </div>

      <div>
        <label class="block font-medium">Notes (optional)</label>
        <textarea
          v-model="form.notes"
          rows="3"
          class="w-full border rounded px-3 py-2"
        ></textarea>
      </div>

      <div class="flex space-x-2">
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex-1"
        >
          {{ isEditing ? 'Save Changes' : 'Add Habit' }}
        </button>
        <button
          type="button"
          @click="closeForm()"
          class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>

    <div v-if="habits.length === 0" class="text-center py-24">
      <p class="text-gray-500">You have no habits yet. Add one above!</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="h in habits"
        :key="h.id"
        class="bg-white shadow rounded p-4 flex flex-col"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold">{{ h.name }}</span>
          <span class="text-xs text-gray-500">{{ formatDate(h.date) }}</span>
        </div>
        <div class="text-sm mb-2 text-gray-600">{{ typeLabels[h.type] }}</div>
        <div class="flex-grow text-gray-700" v-if="h.notes">{{ h.notes }}</div>
        <div class="mt-4 flex justify-end space-x-2">
          <button
            @click="openForm(h)"
            class="text-blue-600 hover:underline text-sm"
          >
            Edit
          </button>
          <button
            @click="deleteHabit(h.id)"
            class="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'

const typeLabels = {
  recycling: 'Recycling',
  transport: 'Eco Transport',
  energy: 'Energy Saving',
  waste_reduction: 'Waste Reduction',
  other: 'Other'
}

const habits = ref([])

const showForm = ref(false)
const isEditing = ref(false)

const form = reactive({
  id: '',
  name: '',
  type: 'other',
  date: new Date().toISOString().split('T')[0],
  notes: ''
})
const errors = reactive({ name: '', date: '' })

onMounted(() => {
  const s = localStorage.getItem('ekoNavikeHabits')
  if (s) habits.value = JSON.parse(s)
})

watch(habits, v => {
  localStorage.setItem('ekoNavikeHabits', JSON.stringify(v))
})

// open for new or editing
function openForm(habit) {
  if (habit) {
    form.id = habit.id
    form.name = habit.name
    form.type = habit.type
    form.date = habit.date
    form.notes = habit.notes
    isEditing.value = true
  } else {
    resetForm()
    isEditing.value = false
  }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  resetForm()
}

function resetForm() {
  form.id = ''
  form.name = ''
  form.type = 'other'
  form.date = new Date().toISOString().split('T')[0]
  form.notes = ''
  errors.name = ''
  errors.date = ''
}

function submitForm() {
  errors.name = form.name.trim() ? '' : 'Name is required'
  errors.date = isNaN(Date.parse(form.date)) ? 'Invalid date' : ''
  if (errors.name || errors.date) return

  if (isEditing.value) {
    const idx = habits.value.findIndex(h => h.id === form.id)
    if (idx > -1) habits.value.splice(idx, 1, { ...form })
  } else {
    habits.value.unshift({ ...form, id: crypto.randomUUID() })
  }
  closeForm()
}

function deleteHabit(id) {
  habits.value = habits.value.filter(h => h.id !== id)
}

function formatDate(d) {
  return new Date(d).toLocaleDateString()
}
</script>

<style scoped>
</style>
