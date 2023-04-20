const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt: jwt} = require('express-jwt')

// const port = process.env.PORT || 9000;

const secret = process.env.SECRET 

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect("mongodb://localhost:27017/rtv", 
  () => console.log('connected to database')
)

app.use(
  '/auth', 
  require('./routes/authRouter.js')
)

app.use(
  '/issues', 
  require('./routes/issueRouter.js')
)

// app.use('/api/issues', require('./routes/issueRouter.js'))

app.use(
  '/comments',
  require('./routes/commentRouter.js')
)

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === 'UnauthorizedError'){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.listen(9000, () => {
  console.log("Server is running on port 9000")
})