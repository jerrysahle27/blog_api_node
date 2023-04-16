const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validatePostCategoryInput(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  if (validator.isEmpty(data.title)) {
    errors.title = "Category title is required";
  }
  return {
    errors,
    isvalid: isEmpty(errors),
  };
};
