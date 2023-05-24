const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
const router = express.Router();
const validateregisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route GET api/users/test
// @desc Tests users route
// @access public
router.get("/test", (req, res) =>
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to test inuser' */
  res.json({ msg: "users work" })
);

// @route GET api/users/current
// @desc Return current user
// @access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to get current logged in user' */
    res.send({
      id: req.user.id,
      Name: req.user.name,
      Email: req.user.email,
    });
  }
);

// @route GET api/users/login
// @desc Login user / Returning jwt token
// @access public

router.post("/login", (req, res) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to login' */
  const { errors, isvalid } = validateLoginInput(req.body);
  if (!isvalid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "user not found" });
    }
    // check for users password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        jwt.sign(
          payload,
          keys.secretorkey,
          { expiresIn: 43200 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ msg: "password is incorrect" });
      }
    });
  });
});

// @route GET api/users/register
// @desc Register user
// @access public
router.post("/register", (req, res) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to register' */
  const { errors, isvalid } = validateregisterInput(req.body);
  if (!isvalid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        password2: req.body.password2,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});
router.post("/Users", (req, res) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to get all users' */
  res.send({
    id: req.user.id,
    Name: req.user.name,
    Email: req.user.email,
  });
});
module.exports = router;
