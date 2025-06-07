<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h2 class="text-3xl font-bold text-green-700 mb-6">Social Hub</h2>

    
    <div class="mb-8 bg-white dark:bg-green-800 p-4 rounded-lg shadow-sm">
      <textarea
        v-model="newContent"
        rows="3"
        class="w-full border border-gray-300 rounded p-2 mb-2"
        placeholder="Podijelite nešto sa zajednicom..."
      ></textarea>
      <div class="flex items-center justify-between">
        <input
          v-model="newImageUrl"
          type="text"
          placeholder="URL slike (opcionalno)"
          class="border border-gray-300 rounded p-2 w-3/4"
        />
        <button
          @click="publishPost"
          class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded ml-2"
        >
          Objavi
        </button>
      </div>
    </div>

    
    <div v-if="posts.length === 0" class="text-green-600">
      Nema postova za prikaz.
    </div>
    <div v-else class="space-y-6">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white dark:bg-green-800 rounded-lg shadow-sm p-4"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-2">
            <img
              :src="getUserAvatar(post.userId)"
              alt="Avatar"
              class="w-8 h-8 rounded-full object-cover"
            />
            <span class="font-semibold text-green-700 dark:text-green-100">{{ getUserEmail(post.userId) }}</span>
          </div>
          <span class="text-gray-500 dark:text-gray-300 text-sm">{{ formatDate(post.createdAt) }}</span>
        </div>
        <p class="text-green-600 dark:text-green-300 mb-3">{{ post.content }}</p>
        <img
          v-if="post.imageUrl"
          :src="post.imageUrl"
          alt="Post Image"
          class="w-full max-h-60 object-cover rounded mb-3"
        />
        <div class="flex items-center space-x-4">
          
          <button @click="toggleLike(post.id)" class="flex items-center space-x-1 text-green-600 dark:text-green-200">
            <svg
              v-if="!post.likes.includes(userId)"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
            <span>{{ post.likes.length }}</span>
          </button>
          
          <button @click="goToComments(post.id)" class="flex items-center space-x-1 text-green-600 dark:text-green-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 s4.03-9 9-9 9 4.03 9 9z" />
            </svg>
            <span>{{ post.commentsCount }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSocialStore } from '../stores/social'
import { useUserStore } from '../stores/user'
import { format } from 'date-fns'

const socialStore = useSocialStore()
const userStore   = useUserStore()
const newContent  = ref('')
const newImageUrl = ref('')

onMounted(() => {
  socialStore.fetchPosts()
})

async function publishPost() {
  if (!newContent.value.trim()) return
  await socialStore.createPost(newContent.value, newImageUrl.value)
  newContent.value = ''
  newImageUrl.value = ''
}

function toggleLike(postId) {
  socialStore.toggleLike(postId)
}

function goToComments(postId) {
  alert('Otvoriti komentare za post: ' + postId)
}

const userId = userStore.user ? userStore.user.uid : null

function getUserAvatar(uid) {
  return 'https://ui-avatars.com/api/?name=' + uid.slice(0, 2) + '&background=4caf50&color=fff'
}

function getUserEmail(uid) {
  if (uid === userStore.user.uid) return userStore.user.email
  return uid.substring(0, 5) + '...'
}

function formatDate(ts) {
  if (!ts) return '-'
  const dateObj = ts.toDate ? ts.toDate() : new Date(ts)
  return format(dateObj, 'dd.MM.yyyy HH:mm')
}
</script>

<style scoped>

</style>