import { defineStore } from 'pinia'
import { db } from '../firebase'
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
  addDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp
} from 'firebase/firestore'
import { useUserStore } from './user'


export const useChallengesStore = defineStore('challenges', {
  state: () => ({
    allChallenges: [],      
    userChallenges: [],     
    unsubscribeAll: null,   
    unsubscribeUser: null   
  }),
  actions: {
    async fetchAllChallenges() {
      const q = query(collection(db, 'challenges'), where('isActive', '==', true))
      this.unsubscribeAll = onSnapshot(q, snapshot => {
        this.allChallenges = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      })
    },

    async fetchUserChallenges() {
      const userStore = useUserStore()
      if (!userStore.user) return

      const q = query(
        collection(db, 'userChallenges'),
        where('userId', '==', userStore.user.uid)
      )
      this.unsubscribeUser = onSnapshot(q, snapshot => {
        this.userChallenges = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      })
    },

    async joinChallenge(challengeId) {
      const userStore = useUserStore()
      if (!userStore.user) return

      const already = this.userChallenges.find(uc => uc.challengeId === challengeId)
      if (already) return

      await addDoc(collection(db, 'userChallenges'), {
        userId:       userStore.user.uid,
        challengeId:  challengeId,
        joinedAt:     serverTimestamp(),
        daysCompleted: [],
        isFinished:   false,
        finishedAt:   null
      })
    },

    async completeDay(challengeDocId, dateString) {
      const ucRef = doc(db, 'userChallenges', challengeDocId)
      await updateDoc(ucRef, {
        daysCompleted: arrayUnion(dateString)
      })
    },

    async checkFinish(challengeDocId) {
      
      const uc = this.userChallenges.find(x => x.id === challengeDocId)
      if (!uc) return

     
      const global = this.allChallenges.find(c => c.id === uc.challengeId)
      if (!global) return

      if (
        !uc.isFinished &&
        Array.isArray(uc.daysCompleted) &&
        uc.daysCompleted.length >= global.durationDays
      ) {
       
        const ucRef = doc(db, 'userChallenges', challengeDocId)
        await updateDoc(ucRef, {
          isFinished: true,
          finishedAt: serverTimestamp()
        })
        
      }
    }
  }
})
