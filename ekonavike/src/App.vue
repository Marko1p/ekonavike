<template>
  <div class="bg-red-500 text-white p-4 text-xl">
    Ako ovo vidiš crveno → Tailwind radi!
  </div>
  <Navbar />
  <router-view />
  

</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>

</style>
