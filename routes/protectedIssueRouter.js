const express = require('express')
const protectedIssueRouter = express.Router()
const Issue = require('../models/issue.js')

// Post new issue
protectedIssueRouter.post('/', (req, res, next) => {
  req.body.user = req.auth._id
  req.body.username = req.auth.username
  console.log(req.auth)
  const newIssue = new Issue(req.body)
  newIssue.upvotes.push({ user: req.body.user })
  newIssue.votesTotal = 1
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})

// Upvote an issue
protectedIssueRouter.put('/upvote/:issueId', (req, res, next) => {
  // find the issue
  Issue.findById(req.params.issueId, (err, issue) =>{
    // append the  upvote to the array
    const exists = Array.from(issue.upvotes).find(upvote => 
      String(upvote.user) === req.auth._id)
    const downvoteExist = Array.from(issue.downvotes).find(downvote => 
      String(downvote.user === req.auth._id)
    )
    // if(exists && downvoteExist) {
    //   return res.status(201).send(issue)
    // }
    if(!exists && !downvoteExist) {
      issue.upvotes.push({ user: req.auth._id })
      issue.votesTotal++
    // save the issue
      issue.save(err => {
        if(err){
          res.status(500)
          return next(err)
        }
          return res.status(201).send(issue)
      })
    //  send it back to the client
    } else if(downvoteExist){
      issue.downvotes.id(downvoteExist._id).remove()
      issue.upvotes.push({user: req.auth._id})
      issue.votesTotal += 2
      issue.save(err => {
        if(err){
          res.status(500)
          return next(err)
        }
          return res.status(201).send(issue)
      })
    } else if(exists){
      issue.upvotes.id(exists._id).remove()
      issue.votesTotal--
      issue.save(err => {
        if(err){
          res.status(500);
          return next(err);
        }
          return res.status(201).send(issue)
      })
    } else {
        return res.status(201).send(issue)
    }
  })
})

// Downvote an issue
protectedIssueRouter.put('/downvote/:issueId', (req, res, next) => {
  // find the issue
  Issue.findById(req.params.issueId, (err, issue) =>{
    // append the upvote to the array
    const exists = Array.from(issue.downvotes).find(downvote => 
      String(downvote.user) === req.auth._id)
    const upvoteExist = Array.from(issue.upvotes).find(upvote => 
      String(upvote.user === req.auth._id))

    if(!exists && !upvoteExist) {
      issue.downvotes.push({user: req.auth._id})
      issue.votesTotal--
    // save the issue
      issue.save(err => {
        if(err){
          res.status(500);
          return next(err);
        }
          return res.status(201).send(issue);
      })
    //  send it back to the client
    } else if(upvoteExist) {
      issue.upvotes.id(upvoteExist._id).remove()
      issue.downvotes.push({user: req.auth._id})
      issue.votesTotal -= 2
      issue.save(err => {
        if(err){
          res.status(500);
          return next(err);
        }
        return res.status(201).send(issue)
      })
    } else if(exists) {
      issue.downvotes.id(exists._id).remove()
      issue.votesTotal++
      issue.save(err => {
        if(err){
          res.status(500);
          return next(err);
        }
        return res.status(201).send(issue);
      }) 
    } else {
      return res.status(201).send(issue)
    }
  })
})

protectedIssueRouter.route('/:issueId')
  // Delete Issue
  .delete((req, res, next) => {
    Issue.findOneAndDelete(
      { _id: req.params.issueId, user: req.auth._id },
      (err, deletedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted issue: ${deletedIssue.title}`)
      }
    )
  })

  // Update Issue
  .put((req, res, next) => {
    Issue.findByIdAndUpdate(
      { _id: req.params.issueId, user: req.auth._id },
      req.body,
      { new: true },
      (err, updatedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedIssue)
      }
    )
  })

module.exports = protectedIssueRouter