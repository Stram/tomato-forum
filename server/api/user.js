import express from 'express';
import passport from 'passport';
import randToken from 'rand-token';
import fs from 'fs';
import path from 'path';
import User from '../models/user';
import Photo from '../models/photo';
import validate from '../services/validate';
import mailer from '../services/mailer';
import applicationConfig from '../config/application';

const router = new express.Router();

// REGISTRATION

router.post('/register', (req, res, next) => {
  const errors = validate({
    email: req.body.email,
    password: req.body.password
  });
  if (errors.length) {
    res.status(400);
    res.json({errors});
    return;
  }

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

  User.findOneAndUpdate({_id: userId}, {username, token: null}, {new: true}, (error, user) => {
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

    res.json({user: user.toObject()});
  });
});

// LOGIN

router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (error, user, info) => {
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

    res.status(200);
    res.json({user: user.toObject()});
  })(req, res, next);
});

// LOGOUT

router.post('/logout', (req) => {
  req.logout();
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

router.post('/upload-photo', (req, res) => {
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
      res.send({
        err
      });
      return;
    }

    const newPhoto = new Photo({
      url: `/${uploadDirectory}/${newFileName}${extension}`,
      name: `${newFileName}${extension}`,
      user: req.user.id
    });

    res.send({
      photo: newPhoto.toObject()
    });
  });
});



router.patch('/:id', (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400);
    res.json({
      errors: [{
        message: 'No user id provided'
      }]
    });
    return;
  }

  const username = req.body.username;
  const errors = validate({
    username
  });

  if (errors.length) {
    res.status(400);
    res.json({errors});
    return;
  }

  User.findOneAndUpdate(
    {_id: userId},
    {username},
    {new: true},
    (error, user) => {
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

      res.json(user);
    }
  );
});



module.exports = router;
