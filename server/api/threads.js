import express from 'express';

import Thread from '../models/thread';

import handleError from '../services/handle-error';
import permissions from '../services/permissions';

const router = new express.Router();

// router.use(permissions.checkAuthentification);

/**
 * @api {post} /threads/ Create thread
 * @apiName CreateThread
 * @apiGroup Threads
 *
 * @apiParam {String} title Threads title.
 * @apiParam {String} content Threads content.
 * @apiParam {ObjectId} owner Threads owner.
 */
router.post('/', (req, res) => {
  const newThread = new Thread({
    title: req.body.title,
    content: req.body.content,
    owner: req.user.id,
    createdAt: new Date()
  });

  newThread.save((error) => {
    if (error) {
      handleError(error, res);
      return;
    }
    res.status(201);
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
