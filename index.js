require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const app = express()

// app middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.bodyParser())
process.env.NODE_ENV === 'development'
  ? app.use(cors({origin: `http://localhost:3000`}))
  : app.use(cors())

// middleware
app.use('/api', authRouter)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}/api`)
})
