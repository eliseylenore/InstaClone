const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },
  phone: {
    type: String,
    max: 10,
  },
  gender: {
    type: String
  }
});

module.exports = Profile = mongoose.model("profiles", UserSchema);
