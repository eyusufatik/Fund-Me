require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const fundingRequestRoutes = require('./routes/fundingRequests')
const userRoutes = require('./routes/users')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/fundingRequests', fundingRequestRoutes)
app.use('/api/users', userRoutes)

console.log('here')
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 