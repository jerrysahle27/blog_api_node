const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const profile = require("../../models/Profile");
const user = require("../../models/User");
const jwt = require("jsonwebtoken");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

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
// @route get api/profile/all
// @desc get all profile
// @access public

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        res.status(400).json(errors);
      }
      res.json(profiles);
    })
    .catch((err) => res.status(400).json({ profile: "There are no profiles" }));
});
// @route get api/profile/handle/:handle
// @desc get profile by handle
// @access public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(400).json(err));
});
// @route get api/profile/user/:user_id
// @desc get profile by user ID
// @access public
router.get("/user /:user_id ", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(400).json(err));
});
// @route post api/profile
// @desc create or edit user profile
// @access private
router.get(
  "/",
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
    ///social
    profileFields.Socialmedia = {};
    if (req.body.youtube) profileFields.Socialmedia.youtube = req.body.youtube;
    if (req.body.facebook)
      profileFields.Socialmedia.Facebook = req.body.facebook;
    if (req.body.twitter) profileFields.Socialmedia.Twitter = req.body.twitter;
    if (req.body.instagram)
      profileFields.Socialmedia.Instagram = req.body.instagram;
    if (req.body.linkedin)
      profileFields.Socialmedia.LinkedIn = req.body.linkedin;

    if (!typeof req.body.skills == undefined) {
      profileFields.skill = req.body.skills.split(",");
    }
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
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);
// @route post api/profile/experience
// @desc add eperience to profile
// @access private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isvalid } = validateExperienceInput(req.body);
    if (!isvalid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      profile.experience.unshift(newExp);
      profile.save().then((profile) => res.json(profile));
    });
  }
);
// @route post api/profile/education
// @desc add education to profile
// @access private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isvalid } = validateEducationInput(req.body);
    if (!isvalid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      profile.education.unshift(newEdu);
      profile.save().then((profile) => res.json(profile));
    });
  }
);
// @route DELETE api/profile/experiece/:exp_id
// @desc Delete experience from profile
// @access private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        const removeIndex = profile.experience
          .map((item) => item.id)
          .indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);
// @route DELETE api/profile/education/:edu_id
// @desc Delete education from profile
// @access private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        const removeIndex = profile.education
          .map((item) => item.id)
          .indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);
// @route DELETE api/profile
// @desc Delete user and profile
// @access private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({
          _id: req.user.id,
        }).then(() => res.json({ success: true }));
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
