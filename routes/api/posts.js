const express = require("express");
const { profile_url } = require("gravatar");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validatePostInput = require("../../validation/post");

// @route GET api/posts/test
// @desc Tests post route
// @access Public
router.get("/test", (req, res) =>
  /* 	#swagger.tags = ['Post']
#swagger.description = 'Endpoint to Tests post route' */ res.json({
    msg: "posts work",
  })
);

// @route GET api/posts
// @desc Get posts
// @access Public
router.get("/", (req, res) => {
  /* 	#swagger.tags = ['Post']
#swagger.description = 'Endpoint to get all posts' */
  Post.find()
    .sort({ date: -1 })
    .populate("user")
    .populate("category")
    .exec()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404));
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get("/:id", (req, res) => {
  /* 	#swagger.tags = ['Post']
#swagger.description = 'Endpoint to Get post by id */
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /* 	#swagger.tags = ['Post']
#swagger.description = 'Endpoint to create post' */
    const { errors, isvalid } = validatePostInput(req.body);
    console.log(isvalid);
    if (!isvalid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id,
      category: req.body.category,
    });
    newPost.save().then((post) => {
      Post.findById(post._id)
        .populate("user")
        .populate("category")
        .exec()
        .then((savedPost) => res.json(savedPost))
        .catch((err) => res.status(404));
    });
  }
);

// @route DELETE api/posts/:id
// @desc Delete post
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /* 	#swagger.tags = ['Post']
#swagger.description = 'Endpoint to delete post' */
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              notauthorized: "user not authorized",
            });
          }
          post.remove().then(() =>
            res.json({
              success: true,
            })
          );
        })
        .catch((err) =>
          res.status(404).json({
            postnotfound: "No post found",
          })
        );
    });
  }
);
// @route POST api/posts/like/:id
// @desc Like post
// @access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /* 	#swagger.tags = ['Post']
#swagger.description = 'Endpoint to like post' */
    Post.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            const removeIndex = post.likes
              .map((item) => item.user.toString())
              .indexOf(req.user.id);

            post.likes.splice(removeIndex, 1);
            post.save().then((post) => res.json(post));
          } else {
            post.likes.unshift({ user: req.user.id });
            post.save().then((post) => res.json(post));
          }
        })
        .catch((err) =>
          res.status(404).json({
            postnotfound: "No post found",
          })
        );
    });
  }
);

// @route POST api/posts/comment/:id
// @desc add comment post
// @access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /* 	#swagger.tags = ['Post']
#swagger.description = 'Endpoint to add comment' */
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };
        post.comments.unshift(newComment);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);
// @route DELETE api/posts/comment/:id/:comment_id
// @desc Remove comment from post
// @access Private
router.post(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /* 	#swagger.tags = ['Post']
#swagger.description = 'Endpoint to Tremove comment' */
    Post.findById(req.params.id)
      .then((post) => {
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        post.likes.splice(removeIndex, 1);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);
module.exports = router;
