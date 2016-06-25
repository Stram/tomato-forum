import _ from 'lodash';

function checkBlank(errors, field, fieldName) {
  const messageFiledName = _.capitalize(fieldName);
  if (field === '') {
    errors.push({
      message: `${messageFiledName} cannot be blank`,
      field: fieldName
    });
    return true;
  }
  return false;
}

function checkLenght(errors, field, fieldName, options) {
  const messageFiledName = _.capitalize(fieldName);
  const fieldLength = field.length;
  if (options.min && options.max) {
    if (fieldLength < options.min || fieldLength > options.max) {
      errors.push({
        message: `${messageFiledName} must be between ${options.min} and ${options.max} characters`,
        field: fieldName
      });
      return true;
    }
    return false;
  } else if (options.min) {
    if (fieldLength < options.min) {
      errors.push({
        message: `${messageFiledName} cannot have less then ${options.min} characters`,
        field: fieldName
      });
      return true;
    }
    return false;
  } else if (options.max) {
    if (fieldLength > options.max) {
      errors.push({
        message: `${messageFiledName} cannot have more then ${options.max} characters`,
        field: fieldName
      });
      return true;
    }
    return false;
  }
  throw new Error('Must provide options for length');
}

function validateEmail(errors, email) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isBlank = checkBlank(errors, email, 'email');
  if (!emailRegex.test(email) && !isBlank) {
    errors.push({
      message: 'Use valid email address',
      field: 'email'
    });
  }
}

function validatePassword(errors, password) {
  const isBlank = checkBlank(errors, password, 'password');
  if (!isBlank) {
    checkLenght(errors, password, 'password', {
      min: 3,
      max: 10
    });
  }
}

module.exports = function(validateObject) {
  const errors = [];

  if (validateObject.email !== undefined) {
    validateEmail(errors, validateObject.email);
  }

  if (validateObject.password !== undefined) {
    validatePassword(errors, validateObject.password);
  }

  return errors;
};
