const express = require('express')
const commentRouter = express.Router()
const Issue = require('../models/issue.js')
const Comment = require('../models/comment.js')

commentRouter.route('/:issueId')
// Add new Comment
  .post((req, res, next) => {
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

  //Get all comments on a post
  .get((req, res, next) => {
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

// Delete comment by ID
  .delete((req, res, next) => {
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

module.exports = commentRouter