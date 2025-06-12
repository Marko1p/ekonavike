<template>
  <nav class="bg-green-100">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
      
      
      <router-link
        to="/"
        class="flex items-center space-x-2 text-green-700 font-bold text-xl"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8 6 4 8 4 12s4 6 8 10 8-4 8-8-4-6-8-10z"/>
        </svg>
        <span>EkoNavike</span>
      </router-link>
      
      <ul class="hidden md:flex items-center space-x-6 text-green-700">
        <li>
          <router-link
            to="/dashboard"
            class="flex items-center hover:text-green-900"
          >
            <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3zM13 3h8v4h-8zM13 9h8v12h-8zM3 13h8v8H3z"/>
            </svg>
            Dashboard
          </router-link>
        </li>
        <li><router-link to="/habits"     class="hover:text-green-900">Navike</router-link></li>
        <li><router-link to="/challenges" class="hover:text-green-900">Izazovi</router-link></li>
        <li><router-link to="/tips"       class="hover:text-green-900">Savjeti</router-link></li>
        <li><router-link to="/social"     class="hover:text-green-900">Social</router-link></li>
        <li><router-link to="/ecospots"   class="hover:text-green-900">Eco Spots</router-link></li>
        <li><router-link to="/footprint"  class="hover:text-green-900">Ekološki otisak</router-link></li>
      </ul>
      
      
      <div class="flex items-center space-x-4">
        <template v-if="user">
          <span class="text-green-900">👤 {{ user.email }}</span>
          <button
            @click="onLogout"
            class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition"
          >
            Odjava
          </button>
        </template>
        <template v-else>
          <router-link
            to="/"
            class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition"
          >
            Prijava
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter }  from 'vue-router'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
userStore.init()

const user   = computed(() => userStore.user)
const router = useRouter()

function onLogout() {
  userStore.logout()
  router.push({ name: 'Home' })
}
</script>

<style scoped>

</style>
