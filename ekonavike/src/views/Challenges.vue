<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Eco‐Challenges</h1>

    <div v-if="!user">
      <p class="text-gray-600 mb-2">Morate se prijaviti da vidite izazove.</p>
      <router-link to="/" class="text-green-600 hover:underline">
        Povratak na prijavu
      </router-link>
    </div>

    <div v-else>
      <ul class="space-y-4">
        <li
          v-for="c in list"
          :key="c.id"
          class="p-4 bg-white rounded shadow"
        >
          <h2 class="font-semibold text-green-700">{{ c.title }}</h2>
          <p class="text-gray-700">{{ c.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed }          from 'vue'
import { useRouter }         from 'vue-router'
import { useUserStore }      from '../stores/user'
import { useChallengesStore }from '../stores/challenges'

const userStore      = useUserStore()
userStore.init()

const challengesStore = useChallengesStore()
challengesStore.init()

const user = computed(() => userStore.user)
const list = computed(() => challengesStore.list)
const router = useRouter()
</script>
