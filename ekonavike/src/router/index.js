import { createRouter, createWebHistory } from 'vue-router'
import Home       from '../views/Home.vue'
import Dashboard  from '../views/Dashboard.vue'
import Habits     from '../views/Habits.vue'
import Challenges from '../views/Challenges.vue'
import Tips       from '../views/Tips.vue'
import Social     from '../views/Social.vue'
import EcoSpots   from '../views/EcoSpots.vue'
import Profile    from '../views/Profile.vue'
import Footprint  from '../views/Footprint.vue'
import NotFound   from '../views/NotFound.vue'

const routes = [
  { path: '/',            name: 'Home',      component: Home },
  { path: '/dashboard',   name: 'Dashboard', component: Dashboard },
  { path: '/habits',      name: 'Habits',    component: Habits },
  { path: '/challenges',  name: 'Challenges',component: Challenges },
  { path: '/tips',        name: 'Tips',      component: Tips },
  { path: '/social',      name: 'Social',    component: Social },
  { path: '/ecospots',    name: 'EcoSpots',  component: EcoSpots },
  { path: '/footprint',   name: 'Footprint', component: Footprint },
  { path: '/profile',     name: 'Profile',   component: Profile },
  { path: '/:catchAll(.*)*', name: 'NotFound', component: NotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
