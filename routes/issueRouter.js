const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue.js')

issueRouter.route('/')
    // Get all issues
  .get((req, res, next) => {
    Issue.find((err, issues) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issues)
    })
  })
  // Add new issue
  .post((req, res, next) => {
    req.body.user = req.auth._id
    req.body.username = req.auth.username
    const newIssue = new Issue(req.body)
    newIssue.upvotes.push({ user: req.user })
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
issueRouter.put('/upvote/:issueId', (req, res, next) => {
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
      issue.upvotes.push({ user: req.user })
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
      issue.upvotes.push({user: req.user})
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
issueRouter.put('/downvote/:issueId', (req, res, next) => {
  // find the issue
  Issue.findById(req.params.issueId, (err, issue) =>{
    // append the upvote to the array
    const exists = Array.from(issue.downvotes).find(downvote => 
      String(downvote.user) === req.auth._id)
    const upvoteExist = Array.from(issue.upvotes).find(upvote => 
      String(upvote.user === req.auth._id))

    if(!exists && !upvoteExist) {
      issue.downvotes.push({user: req.user})
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
      issue.downvotes.push({user: req.user})
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

issueRouter.route('/:issueId')
  // Get single issue by ID
  .get((req, res, next) => {
    Issue.findById((req.params.issueId), (err, issue) => {
      if(err) {
        res.status(500)
        return next(err)
      }
      console.log(issue.comments)
      return res.status(200).send(issue)
    })
  })

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

module.exports = issueRouter