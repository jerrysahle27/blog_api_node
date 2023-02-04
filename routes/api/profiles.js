const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const profile = require("../../models/Profile");
const user = require("../../models/User");
const jwt = require("jsonwebtoken");
const validateProfileInput = require("../../validation/profile");


// @route GET api/profile/test
// @desc Tests profile route
// @access public
router.get("/test", (req, res) => res.json({ msg: "profiles work" }));

// @route GET api/profile
// @desc Get current user profile
// @access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    profile
      .findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "user does not have profile";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);
///create new profile
router.get(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;

    const { errors, isvalid } = validateProfileInput(req.body);
    if (!isvalid) {
      return res.status(400).json(errors);
    }
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    profileFields.Education = {};
    if (req.body.title) profileFields.Education.title = req.body.title;
    if (req.body.school) profileFields.Education.School = req.body.school;
    if (req.body.degree) profileFields.Education.degree = req.body.degree;
    if (req.body.fieldofstudy)
      profileFields.Education.fieldofstudy = req.body.fieldofstudy;
    if (req.body.location) profileFields.Education.location = req.body.location;
    if (req.body.start_date) profileFields.Education.from = req.body.start_date;
    if (req.body.end_date) profileFields.Education.to = req.body.end_date;
    if (req.body.current) profileFields.Education.current = req.body.current;
    profileFields.Socialmedia = {};
    if (req.body.youtube) profileFields.Socialmedia.youtube = req.body.youtube;
    if (req.body.facebook)
      profileFields.Socialmedia.Facebook = req.body.facebook;
    if (req.body.twitter) profileFields.Socialmedia.Twitter = req.body.twitter;
    if (req.body.instagram)
      profileFields.Socialmedia.Instagram = req.body.instagram;
    if (req.body.linkedin)
      profileFields.Socialmedia.LinkedIn = req.body.linkedin;
    profileFields.experience = {};
    if (req.body.title) profileFields.experience.title = req.body.title;
    if (req.body.company) profileFields.experience.company = req.body.company;
    if (req.body.location)
      profileFields.experience.location = req.body.location;
    if (req.body.start_date)
      profileFields.experience.from = req.body.start_date;
    if (req.body.end_date) profileFields.experience.to = req.body.end_date;
    if (req.body.current) profileFields.experience.current = req.body.current;

    if (!typeof req.body.skills == undefined) {
      profileFields.skill = req.body.skills.split(",");
    }
    if (req.body.date) profileFields.date = req.body.date;
    ///check user profile
    profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        profile
          .findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
          .then((profile) => {
            if (profile) {
              res.json(profile);
            }
          });
      } else {
        const profiles = new profile(profileFields);
        profiles.save().then((profile) => {
          if (profile) {
            res.json(profile);
          }
        });
      }
    });
  }
);

module.exports = router;
