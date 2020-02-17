const express = require("express");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/test", (req, res) =>
  res.json({
    msg: "Users api works!"
  })
);

// @route   POST api/users/register
// @desc    Register user
// @access  public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: "Email already exists"
        });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            // if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @route   POST api/users/login
// @desc    login user / Return JWT token
// @access  public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "User not found" });
      }

      //Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // create payload
          // can choose different items, as long as isn't PW or PII
          const payload = { id: user.id, name: user.name, avatar: user.avatar };

          // sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            // can change amount of time. this is about an hour.
            { expiresIn: 3600 },
            (err, token) => {
              return res.json({
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ password: "Password incorrect!" });
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
