import { defineStore } from 'pinia'
import { db } from '../firebase'
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  onSnapshot,
  doc
} from 'firebase/firestore'
import { useUserStore } from './user'
import { useHabitsStore } from './habits'

export const useBadgesStore = defineStore('badges', {
  state: () => ({
    available: [],  
    earned: []      
    
  }),
  actions: {
    async init() {
      // bedževi iz globalne kolekcije badges
      const snapshotBadges = await getDocs(collection(db, 'badges'))
      this.available = snapshotBadges.docs.map(d => ({ id: d.id, ...d.data() }))

      //real-time korisnički bedževi
      const uid = useUserStore().user.uid
      const q      = query(collection(db, 'userBadges', uid, 'earned'))
      onSnapshot(q, snap => {
        this.earned = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      })

      // provjera novih bedževa
      const habitsStore = useHabitsStore()
      onSnapshot(query(collection(db, 'habits'), where('userId', '==', uid)), async snapHabits => {
        const count = snapHabits.size
        const today = new Date().toISOString().slice(0, 10)
        // count_habits
        this.available.forEach(async badge => {
          const alreadyEarned = this.earned.find(b => b.id === badge.id)
          if (!alreadyEarned) {
            if (badge.condition.type === 'count_habits' && count >= badge.condition.value) {
              //userBadges
              await addDoc(collection(db, 'userBadges', uid, 'earned'), {
                earnedAt: new Date(),
                badgeId:  badge.id
              })
            }
            
          }
        })
      })
    }
  }
})
