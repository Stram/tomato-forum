import express from 'express';

import permissions from '../../services/permissions';

import handlers from './handlers';

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

router.post('/register', handlers.register);

// VERIFY EMAIL AND UPDATE ACCOUNT

router.post('/verify', handlers.verify);

// LOGIN

router.post('/login', handlers.login);

// LOGOUT

router.post('/logout', permissions.checkAuthentification, handlers.logout);

// CURRENT USER

router.get('/current', permissions.checkAuthentification, handlers.currentUser);

// PHOTO UPLOAD

router.post('/upload-photo', permissions.checkAuthentification, handlers.uploadPhoto);

// GET USER

router.get('/:userId', permissions.checkAuthentification, handlers.getUser);

module.exports = router;
