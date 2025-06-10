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
  { path: '/',            component: Home },
  { path: '/dashboard',   component: Dashboard },
  { path: '/habits',      component: Habits },
  { path: '/challenges',  component: Challenges },
  { path: '/tips',        component: Tips },
  { path: '/social',      component: Social },
  { path: '/ecospots',    component: EcoSpots },
  { path: '/profile',     component: Profile },
  { path: '/footprint',   component: Footprint }, 
  { path: '/:catchAll(.*)', component: NotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
