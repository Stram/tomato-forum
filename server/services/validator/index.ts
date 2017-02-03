import {isEmail, isLength} from 'validator';

export function isValidEmail(value: string): boolean {
  return isEmail(value);
}

export function isValidUsername(value: string): boolean {
  return isLength(value, {
    min: 3,
    max: 20
  });
}

export function isValidPassword(value: string): boolean {
  return isLength(value, {
    min: 3,
    max: 8
  });
}

export function isValidCategoryName(value: string): boolean {
  return isLength(value, {
    min: 3,
    max: 20
  });
}
