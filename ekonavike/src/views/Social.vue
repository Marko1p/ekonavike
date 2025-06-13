<template>
  <div class="max-w-2xl mx-auto py-8 space-y-6">
    <h1 class="text-3xl font-bold">Social Hub</h1>

    <textarea
      v-model="newPost"
      placeholder="Što misliš?"
      class="w-full border rounded p-2"
      rows="3"
    />
    <button
      @click="publishPost"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Objavi
    </button>

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
        @click="likePost(post.id)"
        class="text-yellow-600 hover:underline"
      >
        👍 {{ post.likes.length }} Like
      </button>

      <div class="mt-3">
        <input
          v-model="comments[post.id]"
          placeholder="Komentiraj..."
          class="w-3/4 border rounded p-1"
        />
        <button
          @click="addComment(post.id)"
          class="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Pošalji
        </button>
      </div>

      <ul class="mt-2 space-y-1">
        <li
          v-for="(c,i) in sortedComments(post.comments)"
          :key="i"
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
import { ref, computed, onMounted } from 'vue'
import { useSocialStore }    from '@/stores/social'

const social = useSocialStore()
const newPost  = ref('')
const comments = ref({})

onMounted(() => {
  social.fetchPosts()
})

const posts = computed(() => social.posts)

function publishPost() {
  if (!newPost.value.trim()) return
  social.publishPost(newPost.value.trim())
  newPost.value = ''
}

function likePost(id) {
  social.likePost(id)
}

function addComment(postId) {
  const txt = comments.value[postId]
  if (!txt || !txt.trim()) return
  social.addComment(postId, txt.trim())
  comments.value[postId] = ''
}

function sortedComments(arr) {
  return [...arr]
    .filter(c => c.createdAt)
    .sort((a,b) => a.createdAt.seconds - b.createdAt.seconds)
}

function formatDate(d) {
  return d.toLocaleString()
}
</script>

<style scoped>
/* dodatna stilizacija po želji */
</style>
