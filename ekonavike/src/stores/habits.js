import { defineStore } from 'pinia'
import { db } from '../firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { useUserStore } from './user'

export const useHabitsStore = defineStore('habits', {
  state: () => ({ list: [] }),
  actions: {
    init() {
      const user = useUserStore().user
      if (!user) return
      const q = query(collection(db,'habits'), where('userId','==',user.uid))
      onSnapshot(q, snap => {
        this.list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      })
    }
  }
})
