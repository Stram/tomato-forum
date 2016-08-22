import express from 'express';

import permissions from '~/services/permissions';

import register from './handlers/register';
import verify from './handlers/verify';
import login from './handlers/login';
import logout from './handlers/logout';
import currentUser from './handlers/current-user';
import uploadPhoto from './handlers/upload-photo';
import get from './handlers/get';

const router = new express.Router();

/**
 * @api {post} /users/register Register new user
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {String} email User's unique name.
 * @apiParam {String} password User's password.
 *
 */

router.post('/register', register);

// VERIFY EMAIL AND UPDATE ACCOUNT

router.post('/verify', verify);

// LOGIN

router.post('/login', login);

// LOGOUT

router.post('/logout', permissions.checkAuthentification, logout);

// CURRENT USER

router.get('/current', currentUser);

// PHOTO UPLOAD

router.post('/upload-photo', permissions.checkAuthentification, uploadPhoto);

// GET USER

router.get('/:userId', permissions.checkAuthentification, get);

module.exports = router;
