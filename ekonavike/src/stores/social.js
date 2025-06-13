// src/stores/social.js
import { defineStore } from 'pinia'
import { db } from '@/firebase'
import {
  collection, doc, onSnapshot, addDoc, updateDoc,
  arrayUnion, serverTimestamp, query, orderBy
} from 'firebase/firestore'
import { useUserStore } from './user'

export const useSocialStore = defineStore('social', {
  state: () => ({
    posts: []
  }),
  actions: {
    fetchPosts() {
      const q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc')
      )
      onSnapshot(q, snap => {
        this.posts = snap.docs.map(d => {
          const { text, likes, comments, createdAt } = d.data()
          return {
            id:        d.id,
            text,
            likes:     Array.isArray(likes)    ? likes    : [],
            comments:  Array.isArray(comments) ? comments : [],
            createdAt: createdAt || null
          }
        })
      })
    },

    async publishPost(text) {
      const { user } = useUserStore()
      if (!user) return
      await addDoc(collection(db, 'posts'), {
        text,
        likes:      [],
        comments:   [],
        createdBy:  user.uid,
        createdAt:  serverTimestamp()
      })
    },

    async likePost(postId) {
      const { user } = useUserStore()
      if (!user) return
      const ref = doc(db, 'posts', postId)
      await updateDoc(ref, {
        likes: arrayUnion(user.uid)
      })
    },

    async addComment(postId, text) {
      const { user } = useUserStore()
      if (!user) return
      const ref = doc(db, 'posts', postId)
      await updateDoc(ref, {
        comments: arrayUnion({
          text,
          author:    user.uid,
          createdAt: serverTimestamp()
        })
      })
    }
  }
})
