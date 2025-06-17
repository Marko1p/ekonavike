// server.js
require('dotenv').config()
const express        = require('express')
const cors           = require('cors')
// ✅ Ispravan import HfInference klase
const { HfInference } = require('@huggingface/inference')

// Provjera env varijable
console.log('→ Loading .env, HF_TOKEN present? →', !!process.env.HF_TOKEN)
if (!process.env.HF_TOKEN) {
  console.error('❌ Missing HF_TOKEN in .env – please add it and restart')
  process.exit(1)
}

// Inicijaliziraj HF klijenta
const hf  = new HfInference(process.env.HF_TOKEN)
const app = express()

app.use(cors())
app.use(express.json())

// Endpoint za AI savjete
app.post('/api/tips', async (req, res) => {
  console.log('💬 [POST] /api/tips payload →', req.body)
  try {
    const result = await hf.textGeneration({
      model:  'google/flan-t5-small',
      inputs: `Give me 5 sustainability tips based on: ${req.body.habits}`
    })
    console.log('✅ HF response →', result.generated_text)
    const tips = (result.generated_text || '')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l)
    return res.json({ tips })
  } catch (err) {
    console.error('❌ Error in /api/tips handler →', err)
    return res.status(500).json({ error: err.message })
  }
})

// Pokreni server
const port = Number(process.env.PORT_API) || 3000
app.listen(port, () => {
  console.log(`🚀 HF server listening on http://localhost:${port}`)
})
