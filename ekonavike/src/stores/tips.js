import { defineStore } from 'pinia'
import { db } from '../firebase'
import {
  collection,
  onSnapshot,
  query
} from 'firebase/firestore'

export const useTipsStore = defineStore('tips', {
  state: () => ({
    tips: [],
    unsubscribe: null
  }),
  actions: {
    init() {
      
      const q = query(collection(db, 'tips'))
      this.unsubscribe = onSnapshot(q, snapshot => {
        this.tips = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      })
    },
    cleanup() {
      if (this.unsubscribe) {
        this.unsubscribe()
        this.unsubscribe = null
      }
      this.tips = []
    }
  }
})
