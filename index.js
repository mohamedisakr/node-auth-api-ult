require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

const app = express()

const {NODE_ENV, CLIENT_URL, PORT, MONGODB_URI} = process.env

// connect to mongodb
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`MongoDB connected ${MONGODB_URI}`)
  })
  .catch((err) => console.log(`MongoDB connection error`))

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
app.use('/api', userRouter)

const port = PORT || 8000

app.listen(port, () => {
  console.log(`API running http://localhost:${port}/api`)
})
