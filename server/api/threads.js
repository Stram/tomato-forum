import express from 'express';

import Thread from '../models/thread';
import Category from '../models/category';

import handleError from '../services/handle-error';
import permissions from '../services/permissions';

const router = new express.Router();

router.use(permissions.checkAuthentification);

/**
 * @api {post} /threads/ Create thread
 * @apiName CreateThread
 * @apiGroup Threads
 *
 * @apiParam {String} title Threads title.
 * @apiParam {String} content Threads content.
 * @apiParam {ObjectId} owner Threads owner.
 */
router.post('/', (req, res, next) => {
  Category.findById(req.body.categoryId, (categoryError, category) => {
    if (categoryError) {
      next(categoryError);
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
      owner: req.user.id
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

/**
 * @api {get} /threads/ Get all threads
 * @apiName GetThreads
 * @apiGroup Threads
 *
 * @apiParam {String} title Threads title.
 * @apiParam {String} content Threads content.
 * @apiParam {ObjectId} owner Threads owner.
 */
router.get('/', (req, res) => {
  Thread.find().then((threads) => {
    res.json(threads.map((thread) => thread.toObject()));
  });
});

/**
 * @api {get} /threads/:id Get specific thread
 * @apiName GetThread
 * @apiGroup Threads
 *
 * @apiParam {String} title Threads title.
 * @apiParam {String} content Threads content.
 * @apiParam {ObjectId} owner Threads owner.
 */
router.get('/:threadId', (req, res) => {
  Thread.findById(req.params.threadId)
    .populate({path: 'owner', populate: {path: 'profilePhoto'}})
    .populate({path: 'comments', populate: {path: 'user', populate: {path: 'profilePhoto'}}})
    .then((thread) => {
      if (thread) {
        res.json(thread.toObject());
      } else {
        res.status(404);
        res.send();
      }
    });
});

module.exports = router;
