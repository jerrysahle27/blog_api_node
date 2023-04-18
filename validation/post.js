const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validatePostInput(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  if (!validator.isLength(data.description, { min: 30, max: 300 })) {
    errors.description = "Post Detail must be between 10 and 300 characters";
  }

  if (validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  return {
    errors,
    isvalid: isEmpty(errors),
  };
};
