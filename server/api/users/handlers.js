import passport from 'passport';
import path from 'path';
import fs from 'fs';
import randToken from 'rand-token';
import mongoose from 'mongoose';

import mailer from '../../services/mailer';
import errors from '../../services/errors';

import User from '../../models/user';
import Photo from '../../models/photo';

import applicationConfig from '../../config/application';

module.exports = {
  register(req, res, next) {
    passport.authenticate('local-register', (error, user, info) => {
      if (error) {
        next(error);
        return;
      }
      if (!user) {
        next(new errors.BadRequest(info));
        return;
      }

      mailer.sendVerification(user);

      res.status(200);
      res.json({user: user.toObject()});
    })(req, res, next);
  },

  verify(req, res, next) {
    const userId = req.body.userId;
    const token = req.body.token;
    const username = req.body.username;

    User.findOne({_id: userId}, (error, user) => {
      if (error) {
        next(error);
        return;
      }

      if (!user) {
        next(new errors.NotFound('User not found'));
        return;
      }

      if (user.token !== token) {
        next(new errors.BadRequest('Token is not valid'));
        return;
      }

      User.findOne({username}, (sameUsernameError, sameUsernameUser) => {
        if (sameUsernameError) {
          next(sameUsernameError);
        }
        if (sameUsernameUser) {
          next(new errors.BadRequest('Username is already taken'));
          return;
        }

        user.username = username;
        user.token = null;

        user.save().then((changedUser) => {
          res.json({user: changedUser.toObject()});
        }, (err) => {
          next(err);
          return;
        });
      });
    });
  },

  login(req, res, next) {
    passport.authenticate('local-login', (error, user, info) => {
      if (error) {
        next(error);
        return;
      }
      if (!user) {
        next(new errors.BadRequest(info));
        return;
      }

      res.status(200);
      res.json({user: user.toObject()});
    })(req, res, next);
  },

  logout(req, res) {
    req.logout();
    res.status(200);
    res.send();
  },

  currentUser(req, res) {
    if (req.user) {
      res.json({
        user: req.user.toObject()
      });
      return;
    }
    res.json({
      user: null
    });
  },

  uploadPhoto(req, res, next) {
    if (!req.files) {
      next(new errors.BadRequest('No files were uploaded.'));
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

      const savingNewPhoto = newPhoto.save();
      const savingCurrentUser = currentUser.save();
      Promise.all([savingNewPhoto, savingCurrentUser]).then(([newSavedPhoto]) => {
        res.status(201);
        res.send({
          photo: newSavedPhoto.toObject()
        });
      });
    });
  },

  getUser(req, res, next) {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      next(new errors.BadRequest('Must provide a valid id'));
      return;
    }

    User.findById(userId).then((user) => {
      if (!user) {
        next(new errors.NotFound('User not found'));
      }

      res.json(user.toObject());
    }, (error) => {
      if (error) {
        next(error);
      }
    });
  }
};
