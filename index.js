const express = require('express')
const authRouter = require('./routes/auth')
const app = express()

app.use('/api', authRouter)

app.get('/api', (req, res) => {
  res.json({data: 'you hit home endpoint'})
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}/api`)
})
