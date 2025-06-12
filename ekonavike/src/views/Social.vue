<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Social Hub</h1>

    
    <div v-if="!user">
      <p class="text-gray-600 mb-2">Morate se prijaviti da vidite objave.</p>
      <router-link to="/" class="text-green-600 hover:underline">
        Povratak na prijavu
      </router-link>
    </div>

    
    <div v-else>
      <ul class="space-y-4">
        <li
          v-for="post in list"
          :key="post.id"
          class="p-4 bg-white rounded shadow"
        >
          <p class="text-gray-700">{{ post.message }}</p>
          <small class="text-gray-500">{{ formatDate(post.timestamp) }}</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed }           from 'vue'
import { useRouter }          from 'vue-router'
import { useUserStore }       from '../stores/user'
import { useSocialStore }     from '../stores/social'
import { format }             from 'date-fns'

const userStore   = useUserStore()
userStore.init()             

const socialStore = useSocialStore()
socialStore.init()           

const user = computed(() => userStore.user)
const list = computed(() => socialStore.list)
const router = useRouter()


function formatDate(ts) {
  if (!ts) return ''
  return format(ts.toDate(), 'PP p')
}
</script>
