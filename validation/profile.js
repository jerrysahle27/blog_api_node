const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateProfileInput(data) {
  let errors = {};

  if (!isEmpty(data.Youtube)) {
    if (!validator.isURL(data.Youtube)) {
      errors.Youtube = "Youtube url is invalid";
    }
  }
  if (!isEmpty(data.Twitter)) {
    if (!validator.isURL(data.Twitter)) {
      errors.Twitter = "Twitter url is invalid";
    }
  }

  if (!isEmpty(data.Facebook)) {
    if (!validator.isURL(data.Facebook)) {
      errors.Facebook = "Facebook url is invalid";
    }
  }

  if (!isEmpty(data.LinkedIn)) {
    if (!validator.isURL(data.LinkedIn)) {
      errors.LinkedIn = "LinkedIn url is invalid";
    }
  }
  if (!isEmpty(data.Instagram)) {
    if (!validator.isURL(data.Instagram)) {
      errors.Instagram = "Instagram url is invalid";
    }
  }
  return {
    errors,
    isvalid: isEmpty(errors),
  };
};
