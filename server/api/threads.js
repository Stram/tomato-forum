import express from 'express';

import Thread from '../models/thread';
import Category from '../models/category';

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
  Category.findById(req.body.categoryId, (categoryError, category) => {
    if (categoryError) {
      handleError(categoryError, res);
      return;
    }

    if (!category) {
      res.status(400);
      res.json({
        error: 'Nema category'
      });
      return;
    }

    const newThread = new Thread({
      category,
      title: req.body.title,
      content: req.body.content,
      owner: req.user.id,
      createdAt: new Date()
    });

    newThread.save((newThreadError) => {
      if (newThreadError) {
        handleError(newThreadError, res);
        return;
      }

      category.threads.push(newThread);
      category.save((updatedCategoryError) => {
        if (updatedCategoryError) {
          handleError(updatedCategoryError, res);
          return;
        }

        res.status(201);
        res.json({
          thread: newThread.toObject()
        });
      });
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
    .then((thread) => {
      console.log(!!thread);
      if (thread) {
        res.json(thread.toObject());
      } else {
        res.status(404);
        res.send();
      }
    });
});

module.exports = router;
