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
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  downvotes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
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
},
{timestamps: true}
)

module.exports = mongoose.model("Issue", issueSchema)