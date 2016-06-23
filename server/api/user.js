import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import {user} from '../models/models';

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/:id', (req, res) => {
  userId = req.params.id;
  if (!userId) {
    res.json({error: 'No id'});
  }

  user.findOne({id}, (error, user) => {
    if (error) {
      res.json({error});
    }
    res.json(user);
  });
});

router.post('/', (req, res, next) => {
  let userOptions = req.body;
  userOptions.password = bcrypt.hashSync(req.body.password);

  user.findOne({
    email: userOptions.email
  }, (error, user) => {
    if (error) {
      res.status(422);
      res.json({error});
      next();
    }
    if (user) {
      res.status(422);
      res.json({
        error: 'Email is already taken'
      })
      next();
    }
  });

  user.create(userOptions, (error, user) => {
    if (error) {
      res.status(422);
      res.json({error});
      next();
    }
    res.json(user);
    next();
  });
});

router.post('/login/:id', (req, res, next) => {

});

module.exports = router;
