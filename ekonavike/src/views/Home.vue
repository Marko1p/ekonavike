<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-4">EkoNavike</h1>

    <div v-if="!user">
      <input
        v-model="email"
        placeholder="Email"
        class="block w-full mb-2 p-2 border rounded"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Lozinka"
        class="block w-full mb-2 p-2 border rounded"
      />
      <button
        @click="register"
        class="bg-green-500 text-white px-4 py-2 rounded mr-2"
      >
        Registriraj se
      </button>
      <button
        @click="login"
        class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Prijava
      </button>
      <button
        @click="googleLogin"
        class="bg-red-500 text-white px-4 py-2 rounded"
      >
        Google
      </button>
    </div>

    <div v-else>
      <p class="mb-4">Dobrodošao, <strong>{{ user.email }}</strong></p>

      <!-- NAVIGACIJA -->
      <nav class="mb-6 flex space-x-4">
        <router-link
          to="/habits"
          class="text-green-600 hover:underline"
        >Navike</router-link>
        <router-link
          to="/challenges"
          class="text-green-600 hover:underline"
        >Izazovi</router-link>
        <router-link
          to="/tips"
          class="text-green-600 hover:underline"
        >Savjeti</router-link>
        <router-link
          to="/social"
          class="text-green-600 hover:underline"
        >Social</router-link>
        <router-link
          to="/profile"
          class="text-green-600 hover:underline"
        >Profil</router-link>
      </nav>

      <button
        @click="logout"
        class="bg-gray-700 text-white px-3 py-1 rounded"
      >
        Odjava
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const userStore   = useUserStore()
userStore.init()

const email       = ref('')
const password    = ref('')
const user        = userStore.user

const register    = () => userStore.register(email.value, password.value)
const login       = () => userStore.login(email.value, password.value)
const googleLogin = () => userStore.googleLogin()
const logout      = () => userStore.logout()
</script>

<style scoped>

</style>
