const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostCategorySchema = new Schema({
  title: {
    type: String,
  },
});
module.exports = PostCategory = mongoose.model(
  "postcategory",
  PostCategorySchema
);
