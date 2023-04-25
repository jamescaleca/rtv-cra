const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment.js')

//Get all comments on a post
commentRouter.get('/:issueId', (req, res, next) => {
  const issueId = req.params.issueId
  Comment.find({ issue: issueId }, (err, comments) => {
    if(err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})

commentRouter.route('/:issueId/:commentId')
// Get comment by ID
  .get((req, res, next) => {
    const issueId = req.params.issueId
    const commentId = req.params.commentId
    Comment.findById({ issue: issueId, _id: commentId }, (err, comment) => {
      console.log(comment)
      if(err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comment)
    })
  })

module.exports = commentRouter