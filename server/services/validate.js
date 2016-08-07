function checkLenght(value, options) {
  const fieldLength = value.length;

  return !(options.min && fieldLength < options.min || options.max && fieldLength > options.max);
}

function validateEmail(value) {
  const emailRegex = new RegExp(`^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.
    [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`);

  return emailRegex.test(value);
}

function validatePassword(value) {
  return checkLenght(value, {
    min: 3,
    max: 10
  });
}

module.exports = {
  validateEmail,
  validatePassword
};
