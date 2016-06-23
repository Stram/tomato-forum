import express from 'express';
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

router.post('/', (req, res) => {
  user.create({
    username: req.param('username'),
    email: req.param('email'),
    password: req.param('password')
  }, (error, user) => {
    if (error) {
      res.json({error});
    }

    res.json(user);
  });
});

module.exports = router;
