const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.skill = !isEmpty(data.skill) ? data.skill : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (validator.isEmpty(data.handle)) {
    errors.handle = "profile handle is required";
  }
  if (validator.isEmpty(data.skill)) {
    errors.skill = "skill is required";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "status is required";
  }
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "website url is invalid";
    }
  }
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
