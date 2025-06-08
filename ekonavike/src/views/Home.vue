<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-4">EkoNavike</h1>

    <div v-if="!user">
      <input v-model="email"    placeholder="Email"    class="block w-full mb-2 p-2 border rounded" />
      <input v-model="password" type="password" placeholder="Lozinka" class="block w-full mb-2 p-2 border rounded" />
      <button @click="register"    class="bg-green-500 text-white px-4 py-2 rounded mr-2">Registriraj se</button>
      <button @click="login"       class="bg-blue-500  text-white px-4 py-2 rounded mr-2">Prijava</button>
      <button @click="googleLogin" class="bg-red-500   text-white px-4 py-2 rounded">Google</button>
    </div>
  </div>
</template>

<script setup>
import { ref }             from 'vue'
import { useUserStore }    from '../stores/user'
import { useRouter }       from 'vue-router'

const userStore   = useUserStore()
userStore.init()
const router      = useRouter()

const email       = ref('')
const password    = ref('')
const user        = userStore.user

const register    = async () => {
  await userStore.register(email.value, password.value)
  router.push({ name: 'Dashboard' })
}
const login       = async () => {
  await userStore.login(email.value, password.value)
  router.push({ name: 'Dashboard' })
}
const googleLogin = async () => {
  await userStore.googleLogin()
  router.push({ name: 'Dashboard' })
}
</script>
