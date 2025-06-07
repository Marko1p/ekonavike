<template>
  <div id="app" class="min-h-screen bg-green-50 dark:bg-gray-900">
   
    <Navbar />

    
    <router-view />
  </div>
</template>

<script setup>

import Navbar from './components/Navbar.vue'
</script>

<style>

#app {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
}
</style>
