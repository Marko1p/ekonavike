
import { defineStore } from 'pinia'
import { db } from '../firebase'
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc
} from 'firebase/firestore'
import { useUserStore } from './user'

export const useHabitsStore = defineStore('habits', {
  state: () => ({
    list: []
  }),
  actions: {
    init() {
      const user = useUserStore().user
      if (!user) return

      const q = query(
        collection(db, 'habits'),
        where('userId', '==', user.uid)
      )
      onSnapshot(q, snap => {
        this.list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      })
    },
    add(name) {
      if (!name.trim()) return
      return addDoc(collection(db, 'habits'), {
        name:   name.trim(),
        userId: useUserStore().user.uid
      })
    },
    remove(id) {
      return deleteDoc(doc(db, 'habits', id))
    },
    // ažuriranje naziva navike
    update(id, newName) {
      const habitRef = doc(db, 'habits', id)
      return updateDoc(habitRef, { name: newName })
    }
  }
})
