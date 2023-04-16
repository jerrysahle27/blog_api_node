const express = require("express");
const router = express.Router();
const passport = require("passport");
const PostCategory = require("../../models/PostCategory");
const validatePostCategoryInput = require("../../validation/postcategory");

// @route GET api/postcategorys/test
// @desc Tests postcategory route
// @access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "post category work",
  })
);
// @route GET api/postcategorys
// @desc Get postscategorys route
// @access Public
router.get("/", (req, res) =>
  PostCategory.find()
    .then((postcategorys) => res.json(postcategorys))
    .catch((err) => res.status(404))
);
// @route GET api/postcategorys/:id
// @desc Get postscategory by id route
// @access Public
router.get("/:id", (req, res) =>
  PostCategory.findById(req.params.id)
    .then((postcategory) => res.json(postcategory))
    .catch((err) =>
      res.status(404).json({
        nopostcategoryfound: "No post category found with that ID",
      })
    )
);
// @route POST api/postcategorys
// @desc Create postscategory route
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isvalid } = validatePostCategoryInput(req.body);
    if (!isvalid) {
      return res.status(400).json(errors);
    }
    const newCategory = new PostCategory({
      title: req.body.title,
    });
    newCategory.save().then((postcategory) => res.json(postcategory));
  }
);
module.exports = router;
