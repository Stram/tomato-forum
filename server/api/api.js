import express from 'express';

import user from './user';
import thread from './thread';
import comment from './comment';

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.use('/user', user);
router.use('/thread', thread);
router.use('/comment', comment);

router.get('/', (req, res) => {
  res.send('Birds home page');
});

module.exports = router;
