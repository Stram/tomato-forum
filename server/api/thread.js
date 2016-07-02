import express from 'express';

import Thread from '../models/thread';

const router = new express.Router();

// NEW THREAD

router.post('/', (req, res, next) => {
  const newThread = new Thread({
    title: req.body.title,
    content: req.body.content,
    owner: req.user.id,
    createdAt: new Date()
  });

  newThread.save((error) => {
    if (error) {
      next(error);
    }
    res.json({
      thread: newThread.toObject()
    });
  });
});

router.get('/', (req, res) => {
  Thread.find().then((threads) => {
    res.json(threads.map((thread) => thread.toObject()));
  });
});

router.get('/:threadId', (req, res) => {
  Thread.findById(req.params.threadId)
    .populate({path: 'owner', populate: {path: 'profilePhoto'}})
    .populate({path: 'comments', populate: {path: 'user', populate: {path: 'profilePhoto'}}})
    .then((thread) => res.json(thread.toObject()));
});

module.exports = router;
