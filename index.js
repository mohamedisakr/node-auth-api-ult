require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const app = express()

const {NODE_ENV, CLIENT_URL, PORT} = process.env

// app middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.bodyParser())
NODE_ENV === 'development'
  ? app.use(cors({origin: CLIENT_URL}))
  : app.use(cors())

// middleware
app.use('/api', authRouter)

const port = PORT || 8000

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}/api`)
})
