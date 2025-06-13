import { defineStore } from 'pinia'
import { db } from '../firebase'
import {
  collection,
  doc,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'
import { useUserStore } from './user'

export const useChallengesStore = defineStore('challenges', {
  state: () => ({
    allChallenges: [],
    userChallenges: []
  }),
  actions: {
    fetchAllChallenges() {
      const q = query(
        collection(db, 'challenges'),
        where('isActive', '==', true)
      )
      onSnapshot(q, snap => {
        this.allChallenges = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      })
    },
    fetchUserChallenges() {
      const user = useUserStore().user
      if (!user) return
      const q = query(
        collection(db, 'userChallenges'),
        where('userId', '==', user.uid)
      )
      onSnapshot(q, snap => {
        this.userChallenges = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      })
    },
    async joinChallenge(challengeId) {
      const user = useUserStore().user
      if (!user) return
      if (this.userChallenges.some(uc => uc.challengeId === challengeId)) return
      await addDoc(collection(db, 'userChallenges'), {
        userId:       user.uid,
        challengeId,
        joinedAt:     serverTimestamp(),
        isFinished:   false,
        finishedAt:   null
      })
    },
    async toggleFinishChallenge(challengeId) {
      // pronađi već spremljeni dokument
      const uc = this.userChallenges.find(uc => uc.challengeId === challengeId)
      if (!uc) return
      const ref = doc(db, 'userChallenges', uc.id)
      const noviStatus = !uc.isFinished
      await updateDoc(ref, {
        isFinished: noviStatus,
        finishedAt: noviStatus ? serverTimestamp() : null
      })
    }
  }
})
