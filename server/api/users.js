import express from 'express';
import passport from 'passport';
import randToken from 'rand-token';
import fs from 'fs';
import path from 'path';
import User from '../models/user';
import Photo from '../models/photo';
import mailer from '../services/mailer';
import applicationConfig from '../config/application';

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

router.post('/register', (req, res, next) => {
  passport.authenticate('local-register', (error, user, info) => {
    if (error) {
      next(error);
    }
    if (!user) {
      res.status(400);
      res.json({
        errors: [info.error]
      });
      return;
    }

    mailer.sendVerification(user);

    res.status(200);
    res.json({user: user.toObject()});
  })(req, res, next);
});

// VERIFY EMAIL AND UPDATE ACCOUNT

router.post('/verify', (req, res, next) => {
  const userId = req.body.userId;
  const token = req.body.token;
  const username = req.body.username;

  User.findOne({_id: userId}, (error, user) => {
    if (error) {
      next(error);
    }
    if (!user) {
      res.status(404);
      res.json({
        errors: [{
          message: 'User not found'
        }]
      });
      return;
    }
    if (user.token !== token) {
      res.status(400);
      res.json({
        errors: [{
          message: 'Token is not valid'
        }]
      });
      return;
    }
    User.findOne({username}, (sameUsernameError, sameUsernameUser) => {
      if (sameUsernameError) {
        next(sameUsernameError);
      }
      if (sameUsernameUser) {
        res.status(400);
        res.json({
          errors: [{
            message: 'Username is already taken'
          }]
        });
        return;
      }

      user.username = username;
      user.token = null;

      user.save().then((changedUser) => {
        res.json({user: changedUser.toObject()});
      });
    });
  });
});

// LOGIN

router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (error, user, info) => {
    if (error) {
      res.json({error});
      return;
    }
    if (!user) {
      res.status(400);
      res.json({
        errors: [info.error]
      });
      return;
    }

    res.status(200);
    res.json({user: user.toObject()});
  })(req, res, next);
});

// LOGOUT

router.post('/logout', (req, res) => {
  req.logout();
  res.status(200);
  res.send('loging out');
});

// CURRENT USER

router.get('/current', (req, res) => {
  if (req.user) {
    res.json({
      user: req.user.toObject()
    });
    return;
  }
  res.json({
    user: null
  });
});

// PHOTO UPLOAD

router.post('/upload-photo', (req, res, next) => {
  if (!req.user) {
    res.status('401');
    return;
  }

  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }

  const file = req.files.file;
  const newFileName = randToken.generate(32).toLowerCase();
  const uploadDirectory = applicationConfig.privateUploadDirectory;
  const extension = path.extname(file.name);

  const filePath = path.resolve(`${uploadDirectory}/${newFileName}${extension}`);

  fs.writeFile(filePath, file.data, (err) => {
    if (err) {
      next(err);
      return;
    }

    const currentUser = req.user;

    const newPhoto = new Photo({
      url: `/${uploadDirectory}/${newFileName}${extension}`,
      name: `${newFileName}${extension}`,
      user: currentUser.id
    });

    if (!currentUser.photos.length) {
      currentUser.profilePhoto = newPhoto;
    }

    currentUser.photos.push(newPhoto);

    newPhoto.save().then((newSavedPhoto) => {
      currentUser.save().then(() => {
        res.send({
          photo: newSavedPhoto.toObject()
        });
      });
    });

  });
});

// GET USER

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId, (error, user) => {
    if (error) {
      next(error);
    }

    if (!user) {
      res.status(404);
      return;
    }

    res.json(user.toObject());
  });
});

module.exports = router;
