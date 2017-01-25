import {Types} from 'mongoose';
import {isEmail, isLength} from 'validator';

export function validateEmail(value: string) {
  return isEmail(value);
}

export function validateUsername(value: string) {
  return isLength(value, {
    min: 3,
    max: 20
  });
}

export function validatePassword(value: string) {
  return isLength(value, {
    min: 3,
    max: 8
  });
}

export function validateCategoryName(value: string) {
  return isLength(value, {
    min: 3,
    max: 20
  });
}

export function validateObjectId(id: any) {
  return Types.ObjectId.isValid(id);
}
