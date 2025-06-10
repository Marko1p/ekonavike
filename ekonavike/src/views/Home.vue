<template>
  
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-4">EkoNavike</h1>

    <div v-if="!user">
      <input v-model="email"    placeholder="Email"    class="block w-full mb-2 p-2 border rounded" />
      <input v-model="password" type="password" placeholder="Lozinka" class="block w-full mb-2 p-2 border rounded" />

      <div class="flex space-x-2 mb-4">
        <button @click="register"    class="flex-1 bg-green-500 text-white px-4 py-2 rounded">Registriraj se</button>
        <button @click="login"       class="flex-1 bg-blue-500  text-white px-4 py-2 rounded">Prijava</button>
      </div>
      <button @click="googleLogin" class="w-full bg-red-500 text-white px-4 py-2 rounded">Google prijava</button>
    </div>

    <div v-else>
      <p class="mb-4">Dobrodošao, <strong>{{ user.email }}</strong></p>
      
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter }  from 'vue-router'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
userStore.init()

const user     = userStore.user
const email    = ref('')
const password = ref('')
const router   = useRouter()

const register    = async () => { await userStore.register(email.value, password.value) }
const login       = async () => { await userStore.login(email.value, password.value) }
const googleLogin = async () => { await userStore.googleLogin() }

watch(user, u => {
  if (u) router.push('/dashboard')
})
</script>
