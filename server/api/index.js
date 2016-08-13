import express from 'express';

import users from './users';
import threads from './threads';
import comments from './comments';
import categories from './categories';

const router = new express.Router();

router.use('/users', users);
router.use('/threads', threads);
router.use('/comments', comments);
router.use('/categories', categories);

router.get('/', (req, res) => {
  res.redirect('/doc');
});

module.exports = router;
