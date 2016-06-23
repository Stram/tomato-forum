import express from 'express';

import user from './user';

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.use('/user', user);

router.get('/', (req, res) => {
  res.send('Birds home page');
});

module.exports = router;
