const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Post");

router.get("/test", (req, res) =>
  res.json({
    msg: "Posts api works"
  })
);

// @route   GET api/posts/:user_id
// @desc    Grab all posts from a certain user
// @access  Public
router.get("/:user_id", (req, res) => {
  errors = {};

  Post.find({ postedBy: req.params.user_id })
    .sort({ date: -1 })
    .then(posts => {
      console.log(posts[0]);
      res.json(posts);

      // errors.noposts = "There are no posts for this user";
      // res.status(404).json(errors);
    });
});

// @route   POST api/post
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("entering post post!");
    //need to add validation later.
    // const errors = {};
    const postFields = { photo: req.body.photo, date: req.body.date };
    postFields.postedBy = req.user.id;
    if (req.body.text) postFields.text = req.body.text;
    console.log(postFields);

    new Post(postFields)
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/posts
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.postedBy.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

module.exports = router;
