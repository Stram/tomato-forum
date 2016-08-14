import validator from 'validator';

export function validateEmail(value) {
  return validator.isEmail(value);
}

export function validateUsername(value) {
  return validator.isLength(value, {
    min: 3,
    max: 20
  });
}

export function validatePassword(value) {
  return validator.isLength(value, {
    min: 3,
    max: 8
  });
}
