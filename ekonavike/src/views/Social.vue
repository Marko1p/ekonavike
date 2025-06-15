<template>
  <div class="max-w-2xl mx-auto py-8 space-y-6">
    <h1 class="text-3xl font-bold">Social Hub</h1>

    <!-- Nova objava -->
    <textarea
      v-model="newPost"
      placeholder="Što misliš?"
      class="w-full border rounded p-2"
      rows="3"
    />
    <button
      @click="onPublish"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Objavi
    </button>

    <!-- Lista postova -->
    <div
      v-for="post in posts"
      :key="post.id"
      class="border rounded p-4 space-y-3"
    >
      <p class="text-gray-800">{{ post.text }}</p>
      <p class="text-sm text-gray-500">
        Objavljeno:
        <span v-if="post.createdAt">
          {{ formatDate(post.createdAt.toDate()) }}
        </span>
        <span v-else>—</span>
      </p>

      <button
        @click="onLike(post.id)"
        class="text-yellow-600 hover:underline"
      >
        👍 {{ post.likes.length }} Like
      </button>

      <!-- Unos komentara -->
      <div class="mt-3 flex gap-2">
        <input
          v-model="comments[post.id]"
          placeholder="Komentiraj..."
          class="flex-1 border rounded p-1"
        />
        <button
          @click="onComment(post.id)"
          class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Pošalji
        </button>
      </div>

      <!-- Prikaz komentara -->
      <ul class="mt-2 space-y-1">
        <li
          v-for="c in post.comments"
          :key="c.id"
          class="text-sm text-gray-700"
        >
          <span class="block">{{ c.text }}</span>
          <span class="text-xs text-gray-500">
            — {{ formatDate(c.createdAt.toDate()) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useSocialStore }         from '@/stores/social'

const store    = useSocialStore()
const newPost  = ref('')
const comments = reactive({})

onMounted(() => {
  store.fetchPosts()
})

function onPublish() {
  if (!newPost.value.trim()) return
  store.publishPost(newPost.value.trim())
  newPost.value = ''
}

function onLike(postId) {
  store.likePost(postId)
}

function onComment(postId) {
  const txt = comments[postId] && comments[post.id]?.trim()
  if (!txt) return
  store.addComment(postId, txt)
  comments[postId] = ''
}

function formatDate(d) {
  return d.toLocaleString()
}

const posts = store.posts
</script>

<style scoped>
/* po potrebi dodatna stilizacija */
</style>
