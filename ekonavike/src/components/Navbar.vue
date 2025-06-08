<template>
  <nav class="bg-white dark:bg-gray-800 shadow p-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <router-link to="/" class="text-xl font-bold text-gray-800 dark:text-gray-100">
        EkoNavike
      </router-link>
      <div class="flex space-x-4">
        <router-link to="/dashboard" class="text-gray-700 hover:text-green-600">Dashboard</router-link>
        <router-link to="/habits"     class="text-gray-700 hover:text-green-600">Navike</router-link>
        <router-link to="/challenges" class="text-gray-700 hover:text-green-600">Izazovi</router-link>
        <router-link to="/tips"       class="text-gray-700 hover:text-green-600">Savjeti</router-link>
        <router-link to="/social"     class="text-gray-700 hover:text-green-600">Social</router-link>
        <router-link to="/ecospots"   class="text-gray-700 hover:text-green-600">Eco Spots</router-link>
      </div>
      <div class="flex items-center space-x-4">
        <template v-if="user">
          <span class="text-gray-700">👤 {{ user.email }}</span>
          <button @click="logout" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Odjava
          </button>
        </template>
        <template v-else>
          <router-link to="/" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Prijava
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed }    from 'vue'
import { useRouter }   from 'vue-router'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
userStore.init()

const user   = computed(() => userStore.user)
const router = useRouter()

const logout = async () => {
  await userStore.logout()
  router.push({ name: 'Home' })
}
</script>

<style scoped>

</style>
