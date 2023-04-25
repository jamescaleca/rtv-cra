const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue.js')

// Get all issues
issueRouter.get('/', (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// Get issues by user id
issueRouter.get('/user', (req, res, next) => {
  Issue.find({ user: req.auth._id }, (err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// Get single issue by ID
issueRouter.get('/:issueId',   (req, res, next) => {
  Issue.findById((req.params.issueId), (err, issue) => {
    if(err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issue)
  })
} )


module.exports = issueRouter