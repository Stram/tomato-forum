import validator from 'validator';
import mongoose from 'mongoose';

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

export function validateCategoryName(value) {
  return validator.isLength(value, {
    min: 3,
    max: 20
  });
}

export function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
