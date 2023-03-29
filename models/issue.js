const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  upvotes: [{
    user: {
      type: Schema.Types.ObjectId
    }
  }],
  downvotes: [{
    user: {
      type: Schema.Types.ObjectId
    }
  }],
  votesTotal: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  comments: [{
    type: Schema.Types.Object,
    ref: 'Comment'
  }]
})

module.exports = mongoose.model("Issue", issueSchema)