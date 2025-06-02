<template>
  <div>
    <h1>EkoNavike</h1>
    <!-- Link profil -->
    <router-link to="/profile">Profil</router-link>

    <!-- Prikaz login/registraciju ako nije prijavljen -->
    <div v-if="!user">
      <input v-model="email"    placeholder="Email" />
      <input v-model="password" type="password" placeholder="Lozinka" />
      <button @click="register">Registriraj se</button>
      <button @click="login">Prijava</button>
      <button @click="googleLogin">Google prijava</button>
    </div>

    <!-- korisnik-->
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
import { useUserStore }   from '../stores/user'
import { useHabitsStore } from '../stores/habits'

// Inicijaliziraj store-ove
const userStore   = useUserStore()
const habitsStore = useHabitsStore()

userStore.init()
habitsStore.init()

// Reaktivne varijable
const email      = ref('')
const password   = ref('')
const newHabit   = ref('')
const user       = userStore.user
const habits     = habitsStore.list

// aut
const register    = () => userStore.register(email.value, password.value)
const login       = () => userStore.login(email.value, password.value)
const googleLogin = () => userStore.googleLogin()
const logout      = () => {
  userStore.logout()
  habitsStore.list = []
}

//navike metode
const addHabit    = () => {
  habitsStore.add(newHabit.value)
  newHabit.value = ''
}
const deleteHabit = id => habitsStore.remove(id)
</script>

<style scoped>
input {
  display: block;
  width: 100%;
  margin-bottom: 0.5em;
  padding: 0.5em;
}
button {
  margin: 0.25em 0;
}
ul { list-style: none; padding: 0; }
li {
  background: #eef;
  padding: 0.5em;
  margin-bottom: 0.5em;
  border-radius: 4px;
}
</style>
