<template>
  <div class="min-h-screen bg-green-50">
    
    <section class="py-12">
      <div class="max-w-4xl mx-auto bg-green-100 rounded-lg p-8 text-center shadow">
        <h1 class="text-4xl font-extrabold text-green-700">Welcome to EkoNavike!</h1>
        <p class="mt-4 text-lg text-green-800">
          Your companion for a sustainable lifestyle.
        </p>
        <router-link
          to="/habits"
          class="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
        >Start Tracking →</router-link>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-12">
      <FeatureCard title="Habit Tracker"        desc="Log your daily eco-friendly activities."   to="/habits" />
      <FeatureCard title="Eco-Challenges"       desc="Join challenges and earn badges."         to="/challenges" />
      <FeatureCard title="Sustainability Tips"  desc="Get personalized advice."                 to="/tips" />
      <FeatureCard title="Social Hub"           desc="Share achievements with community."       to="/social" />
      <FeatureCard title="Local Eco Spots"      desc="Find recycling centers and eco-shops."   to="/ecospots" />
      <FeatureCard title="Ecological Footprint" desc="Calculate and track your carbon footprint." to="/footprint" />
    </section>
  </div>
</template>

<script setup>
import Navbar      from '../components/Navbar.vue'
import FeatureCard from '../components/FeatureCard.vue'
</script>
