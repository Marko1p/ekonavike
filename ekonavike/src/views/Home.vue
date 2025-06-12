<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-4">EkoNavike</h1>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <input
        v-model="email"
        type="email"
        autocomplete="username"
        placeholder="Email"
        class="block w-full p-2 border rounded"
        required
      />
      <input
        v-model="password"
        type="password"
        autocomplete="current-password"
        placeholder="Lozinka"
        class="block w-full p-2 border rounded"
        required
      />
      <div class="flex space-x-2">
        <button
          type="button"
          @click="handleRegister"
          class="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Registriraj se
        </button>
        <button
          type="submit"
          class="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Prijava
        </button>
      </div>
    </form>

    <button
      @click="handleGoogle"
      class="w-full mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
    >
      Google prijava
    </button>
  </div>
</template>

<script setup>
import { ref }         from 'vue'
import { useRouter }   from 'vue-router'
import { useUserStore } from '../stores/user'

const email     = ref('')
const password  = ref('')
const userStore = useUserStore()
const router    = useRouter()


userStore.init()

async function handleRegister() {
  try {
    await userStore.register(email.value, password.value)
    router.push({ name: 'Dashboard' })
  } catch (e) {
    alert(e.message)
  }
}

async function handleLogin() {
  try {
    await userStore.login(email.value, password.value)
    router.push({ name: 'Dashboard' })
  } catch (e) {
    alert(e.message)
  }
}

async function handleGoogle() {
  try {
    await userStore.googleLogin()
    router.push({ name: 'Dashboard' })
  } catch (e) {
    alert(e.message)
  }
}
</script>

<style scoped>


</style>
