import { defineStore } from 'pinia'
import axios from 'axios'

export const useTipsStore = defineStore('tips', {
  state: () => ({
    tips: [],
    loading: false,
    error: null
  }),
  actions: {
    async generateTips(habits) {
      this.loading = true
      this.error   = null
      this.tips    = []
      try {
        const resp = await axios.post('/api/tips', { habits })
        const text = resp.data.tips || ''
        this.tips = text
          .split('\n')
          .map(line => line.trim())
          .filter(line => line)
      } catch (e) {
        this.error = e.response?.data?.error || e.message
      } finally {
        this.loading = false
      }
    }
  }
})
