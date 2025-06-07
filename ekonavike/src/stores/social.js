import { defineStore } from 'pinia'
import { db } from '../firebase'
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  increment
} from 'firebase/firestore'
import { useUserStore } from './user'

export const useSocialStore = defineStore('social', {
  state: () => ({
    posts: [],
    unsubscribePosts: null
  }),
  actions: {
  
    fetchPosts() {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
      this.unsubscribePosts = onSnapshot(q, snapshot => {
        this.posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      })
    },

    
    async createPost(content, imageUrl = '') {
      const userStore = useUserStore()
      if (!userStore.user) return

      await addDoc(collection(db, 'posts'), {
        userId: userStore.user.uid,
        content,
        imageUrl,
        createdAt: serverTimestamp(),
        likes: [],
        commentsCount: 0
      })
    },

    
    async toggleLike(postId) {
      const userStore = useUserStore()
      if (!userStore.user) return

      const post = this.posts.find(p => p.id === postId)
      if (!post) return

      const postRef = doc(db, 'posts', postId)
      const userId = userStore.user.uid
      if (post.likes.includes(userId)) {
        await updateDoc(postRef, { likes: arrayRemove(userId) })
      } else {
        await updateDoc(postRef, { likes: arrayUnion(userId) })
      }
    },

    async createComment(postId, content) {
      const userStore = useUserStore()
      if (!userStore.user) return

      await addDoc(collection(db, 'comments'), {
        postId,
        userId: userStore.user.uid,
        content,
        createdAt: serverTimestamp()
      })
      const postRef = doc(db, 'posts', postId)
      await updateDoc(postRef, { commentsCount: increment(1) })
    }
  }
})