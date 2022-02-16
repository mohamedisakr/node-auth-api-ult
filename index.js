const express = require('express')

const app = express()

app.get('/api', (req, res) => {
  res.json({data: 'you hit home endpoint'})
})

app.get('/api/signup', (req, res) => {
  res.json({data: 'you hit signup endpoint'})
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}/api`)
})
