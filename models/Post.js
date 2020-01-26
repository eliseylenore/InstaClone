const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  postedBy: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  comments: {
    text: String,
    postedBy: {
      type: ObjectId,
      ref: "User"
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
