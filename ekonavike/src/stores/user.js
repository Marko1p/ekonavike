import { defineStore } from 'pinia'
import { auth, provider } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    init() {
      onAuthStateChanged(auth, u => {
        this.user = u
      })
    },
    register(email, password) {
      return createUserWithEmailAndPassword(auth, email, password)
    },
    login(email, password) {
      return signInWithEmailAndPassword(auth, email, password)
    },
    googleLogin() {
      return signInWithPopup(auth, provider)
    },
    logout() {
      return signOut(auth)
    }
  }
})