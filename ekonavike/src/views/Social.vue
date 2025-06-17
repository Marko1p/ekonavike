<template>
  <div class="max-w-2xl mx-auto py-8 space-y-6">

    <!-- New post form -->
    <h1 class="text-3xl font-bold">Social Hub</h1>
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

    <!-- Loading / error -->
    <div v-if="loading" class="text-center">Učitavanje objava…</div>
    <div v-else-if="error" class="text-red-500">Greška: {{ error.message }}</div>

    <!-- Posts list -->
    <div v-else class="space-y-6">
      <div
        v-for="post in posts"
        :key="post.id"
        class="border rounded-lg p-4 shadow"
      >
        <p class="mb-2">{{ post.text }}</p>
        <small class="block mb-2">
          Objavljeno: 
          {{ post.createdAt?.toDate().toLocaleString() || '—' }}
        </small>

        <button
          @click="onLike(post.id)"
          class="mr-4 text-green-600"
        >
          👍 {{ post.likes.length }}
        </button>

        <!-- Comments -->
        <div class="mt-4 space-y-2">
          <div
            v-for="c in post.comments"
            :key="c.id"
            class="flex items-center space-x-2"
          >
            <span class="font-medium">User {{ c.author }}:</span>
            <span>{{ c.text }}</span>
          </div>

          <div class="flex space-x-2">
            <input
              v-model="comments[post.id]"
              placeholder="Dodaj komentar…"
              class="flex-1 border rounded p-1"
            />
            <button
              @click="onComment(post.id)"
              class="bg-green-500 text-white px-3 rounded"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs }       from 'pinia'
import { useSocialStore }    from '@/stores/social'

const store     = useSocialStore()
const { posts, loading, error } = storeToRefs(store)

const newPost   = ref('')
const comments  = reactive({})

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
  const txt = comments[postId]?.trim()
  if (!txt) return
  store.addComment(postId, txt)
  comments[postId] = ''
}
</script>
