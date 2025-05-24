<template>
  <div id="app">
    <h1>EkoNavike</h1>

    
    <div v-if="!user">
      <input v-model="email"    placeholder="Email" />
      <input v-model="password" type="password" placeholder="Lozinka" />
      <button @click="register">Registriraj se</button>
      <button @click="login">Prijava</button>
      <button @click="googleLogin">Google prijava</button>
    </div>

    
    <div v-else>
      <p>Dobrodošao, <strong>{{ user.email }}</strong></p>
      <button @click="logout">Odjava</button>

      <section>
        <h2>Dodaj naviku</h2>
        <input v-model="newHabit" placeholder="Nova navika" />
        <button @click="addHabit">Spremi</button>
      </section>

      <section>
        <h3>Tvoje navike</h3>
        <ul>
          <li v-for="h in habits" :key="h.id">
            {{ h.name }}
            <button @click="deleteHabit(h.id)">Obriši</button>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { auth, db, provider } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc
} from 'firebase/firestore'

const email    = ref('')
const password = ref('')
const user     = ref(null)
const newHabit = ref('')
const habits   = ref([])
let unsubscribe = null


onAuthStateChanged(auth, u => {
  user.value = u
  if (unsubscribe) unsubscribe()
  habits.value = []

  if (u) {
    const q = query(collection(db, 'habits'), where('userId', '==', u.uid))
    unsubscribe = onSnapshot(q, snap => {
      habits.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    })
  }
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

const register    = () => createUserWithEmailAndPassword(auth, email.value, password.value)
const login       = () => signInWithEmailAndPassword(auth, email.value, password.value)
const googleLogin = () => signInWithPopup(auth, provider)
const logout      = () => signOut(auth)

const addHabit = async () => {
  if (!newHabit.value.trim()) return
  await addDoc(collection(db, 'habits'), {
    name:   newHabit.value.trim(),
    userId: user.value.uid
  })
  newHabit.value = ''
}

const deleteHabit = async id => {
  await deleteDoc(doc(db, 'habits', id))
}
</script>

<style scoped>
#app { max-width: 600px; margin: 2rem auto; text-align: left; }
input { display: block; width: 100%; padding: 0.5em; margin-bottom: 0.5em; }
button { margin: 0.25em 0; }
ul { list-style: none; padding: 0; }
li { background: #eef; padding: 0.5em; margin-bottom: 0.5em; border-radius: 4px; }
</style>
