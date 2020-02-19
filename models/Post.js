const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  // instead of postedBy, make it name & avatar & userid?
  // what about likes?
  postedBy: {
    type: ObjectId,
    required: true,
    ref: "users"
  },
  comments: {
    text: String,
    postedBy: {
      type: ObjectId,
      ref: "user"
    }
  },
  text: String,
  photo: {
    type: String,
    required: true
  },
  //need to convert this to a moment time
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("posts", PostSchema);
