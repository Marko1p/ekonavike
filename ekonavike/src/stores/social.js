// src/stores/social.js
import { defineStore } from 'pinia'
import { db } from '@/firebase'
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  query,
  orderBy,
  getDocs
} from 'firebase/firestore'
import { useUserStore } from './user'

export const useSocialStore = defineStore('social', {
  state: () => ({
    posts: []    // svaki post s pripadajućim komentarima
  }),
  actions: {
    fetchPosts() {
      const qPosts = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc')
      )
      onSnapshot(qPosts, async snap => {
        const loaded = []
        for (const d of snap.docs) {
          const data = d.data()
          const post = {
            id: d.id,
            text: data.text,
            likes: Array.isArray(data.likes) ? data.likes : [],
            createdAt: data.createdAt || null,
            comments: []
          }

          // dohvati komentare iz podkolekcije
          const qCom = query(
            collection(db, 'posts', d.id, 'comments'),
            orderBy('createdAt', 'asc')
          )
          const comSnap = await getDocs(qCom)
          post.comments = comSnap.docs.map(c => ({
            id: c.id,
            ...c.data()
          }))

          loaded.push(post)
        }
        this.posts = loaded
      })
    },

    async publishPost(text) {
      const { user } = useUserStore()
      if (!user) return
      await addDoc(collection(db, 'posts'), {
        text,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        likes: []
      })
    },

    async likePost(postId) {
      const { user } = useUserStore()
      if (!user) return
      const ref = doc(db, 'posts', postId)
      await updateDoc(ref, {
        likes: arrayUnion({ userId: user.uid, at: serverTimestamp() })
      })
    },

    async addComment(postId, text) {
      const { user } = useUserStore()
      if (!user) return
      await addDoc(collection(db, 'posts', postId, 'comments'), {
        text,
        author: user.uid,
        createdAt: serverTimestamp()
      })
    }
  }
})
