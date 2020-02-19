const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  private
router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.website;
    if (req.body.phone) profileFields.phone = req.body.website;
    if (req.body.gender) profileFields.gender = req.body.website;

    Profile.findOne({ handle: profileFields.handle }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          // you should set the new option to true to return the document after update was applied
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create profile
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          // Save
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
