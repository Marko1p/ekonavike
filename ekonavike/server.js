import express from 'express'
import axios from 'axios'
import { config } from 'dotenv'
config()

const { MODEL, API_KEY, PORT_API = 3001 } = process.env
if (!MODEL || !API_KEY) {
  console.error('❌ Missing MODEL or API_KEY in .env')
  process.exit(1)
}

// AI Studio (Generative Language API) endpoint – bez projects/locations
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`

const app = express()
app.use(express.json())

app.post('/api/tips', async (req, res) => {
  try {
    const { habits } = req.body
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `Here are my eco-habits:\n\n${habits}\n\nGive me three personalized sustainability tips.` }],
        },
      ],
    }

    const { data } = await axios.post(URL, payload)
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No tips generated.'
    res.json({ tips: text })
  } catch (err) {
    console.error('❌ GenAI error:', err.response?.data || err.message)
    res.status(err.response?.status || 500).json({ error: err.response?.data || err.message })
  }
})

app.listen(PORT_API, () => {
  console.log(`🚀 AI server listening on http://localhost:${PORT_API}/api/tips`)
})
