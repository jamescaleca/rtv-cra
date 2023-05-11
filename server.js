const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt: jwt} = require('express-jwt')
const path = require("path")

// const port = process.env.PORT || 9000;

const secret = process.env.REACT_APP_SECRET 

const pw = process.env.REACT_APP_MONGODB_SECRET

const uri = `mongodb+srv://jacaleca2:${process.env.REACT_APP_MONGODB_SECRET}@rtv-render.5rltqvb.mongodb.net/?retryWrites=true&w=majority`

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}, () => console.log('connected to database'))

// mongoose.connect('mongodb://localhost:27017/rtv',
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// },
// () => console.log('Connected to the DB')
// )

app.use(express.static(path.join(__dirname, "client", "build")))

app.use(
  '/auth', 
  require('./routes/authRouter.js')
)

app.use(
  '/issues', 
  require('./routes/issueRouter.js')
)

app.use(
  '/comments',
  require('./routes/commentRouter.js')
)

app.use(
  '/issues',
  jwt({ secret: process.env.REACT_APP_SECRET, algorithms: ['HS256'] }),
  require('./routes/protectedIssueRouter.js')
)

app.use(
  '/comments',
  jwt({ secret: process.env.REACT_APP_SECRET, algorithms: ['HS256'] }),
  require('./routes/protectedCommentRouter.js')
)

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === 'UnauthorizedError'){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(9000, () => {
  console.log("Server is running on port 9000")
})