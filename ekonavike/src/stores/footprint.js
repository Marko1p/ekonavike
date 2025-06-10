import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFootprintStore = defineStore('footprint', () => {
 
  const kmDriven          = ref(0)
  const meatMealsPerWeek  = ref(0)
  const plasticKgPerWeek  = ref(0)

 
  const CO2_PER_KM_CAR    = 0.2   // kg CO₂ po km
  const CO2_PER_MEAL_MEAT = 5     // kg CO₂ po obroku mesa
  const CO2_PER_KG_PLASTIC= 6     // kg CO₂ po kg plastike

  
  const weeklyCO2 = computed(() => {
    return (
      kmDriven.value * CO2_PER_KM_CAR +
      meatMealsPerWeek.value * CO2_PER_MEAL_MEAT +
      plasticKgPerWeek.value * CO2_PER_KG_PLASTIC
    )
  })

  const monthlyCO2 = computed(() => weeklyCO2.value * 4)

  
  const yearlyCO2  = computed(() => weeklyCO2.value * 52)

  function reset() {
    kmDriven.value = 0
    meatMealsPerWeek.value = 0
    plasticKgPerWeek.value = 0
  }

  return {
    kmDriven,
    meatMealsPerWeek,
    plasticKgPerWeek,
    weeklyCO2,
    monthlyCO2,
    yearlyCO2,
    reset,
  }
})
