// server.js
import express from 'express'
import cors from 'cors'
import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())          
app.use(express.json())  

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

app.post('/api/tips', async (req, res) => {
  try {
    const { habits } = req.body
    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful eco-sustainability assistant.' },
        { role: 'user',   content: `I have these habits: ${habits}. Give me 5 concise sustainability tips.` }
      ],
      temperature: 0.7,
      n: 1
    })
    const text = chat.choices[0].message.content
    
    res.json({ tips: text })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'OpenAI error' })
  }
})

const port = process.env.PORT_API || 3001
app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`)
})
