const express = require('express')
const protectedCommentRouter = express.Router()
const Comment = require('../models/comment.js')

// Post a new comment
protectedCommentRouter.post('/:issueId', (req, res, next) => {
  req.body.user = req.auth._id
  req.body.username = req.auth.username
  req.body.issue = req.params.issueId
  const newComment = new Comment(req.body)
  console.log(newComment)
  newComment.save((err, savedComment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedComment)
  })
})

protectedCommentRouter.delete('/:issueId/:commentId', (req, res, next) => {
  req.body.user = req.auth._id
  const issueId = req.params.issueId
  Comment.findOneAndDelete(
    ({ _id: req.params.commentId, user: req.body.user, issue: issueId }),
    (err, deletedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted comment: ${deletedComment.comment}`)
    }
  )
})



module.exports = protectedCommentRouter