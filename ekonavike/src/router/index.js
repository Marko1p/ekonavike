
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore }                  from '../stores/user'

import Home       from '../views/Home.vue'
import Habits     from '../views/Habits.vue'
import Challenges from '../views/Challenges.vue'
import Tips       from '../views/Tips.vue'
import Social     from '../views/Social.vue'
import Profile    from '../views/Profile.vue'
import NotFound   from '../views/NotFound.vue'

const routes = [
  { path: '/',             name: 'Home',       component: Home,       meta: { requiresAuth: false } },
  { path: '/habits',       name: 'Habits',     component: Habits,     meta: { requiresAuth: true  } },
  { path: '/challenges',   name: 'Challenges', component: Challenges, meta: { requiresAuth: true  } },
  { path: '/tips',         name: 'Tips',       component: Tips,       meta: { requiresAuth: true  } },
  { path: '/social',       name: 'Social',     component: Social,     meta: { requiresAuth: true  } },
  { path: '/profile',      name: 'Profile',    component: Profile,    meta: { requiresAuth: true  } },
  { path: '/:pathMatch(.*)*', name: 'NotFound',component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = !!useUserStore().user
  if (to.meta.requiresAuth && !loggedIn) next({ name: 'Home' })
  else next()
})

export { router }
