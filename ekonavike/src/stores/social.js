// stores/social.js
import { defineStore } from 'pinia'
import { 
  collection, addDoc, serverTimestamp, onSnapshot, 
  updateDoc, arrayUnion, doc 
} from 'firebase/firestore'
import { db, auth } from '@/firebase'

export const useSocialStore = defineStore('social', {
  state: () => ({
    posts: [],
    loading: false,
    error: null,
  }),
  actions: {
    fetchPosts() {
      this.loading = true
      onSnapshot(
        collection(db, 'posts'),
        snap => {
          this.posts = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          this.loading = false
        },
        err => {
          this.error = err
          this.loading = false
        }
      )
    },

    async publishPost(text) {
      if (!text.trim()) return
      console.log('⏫ publishPost()', { text, uid: auth.currentUser?.uid })
      this.error = null
      try {
        await addDoc(collection(db, 'posts'), {
          text,
          author: auth.currentUser.uid,
          likes: [],
          comments: [],
          createdAt: serverTimestamp(),
        })
        console.log('✅ publishPost succeeded')
      } catch (e) {
        console.error('❌ publishPost failed', e)
        this.error = e
      }
    },

    async likePost(postId) {
      const ref = doc(db, 'posts', postId)
      try {
        await updateDoc(ref, {
          likes: arrayUnion(auth.currentUser.uid)
        })
      } catch (e) {
        this.error = e
      }
    },

    async addComment(postId, text) {
      const ref = doc(db, 'posts', postId)
      const newComment = {
        id: Date.now().toString(),
        author: auth.currentUser.uid,
        text,
        createdAt: new Date(),
      }
      try {
        await updateDoc(ref, {
          comments: arrayUnion(newComment)
        })
      } catch (e) {
        this.error = e
      }
    }
  }
})
