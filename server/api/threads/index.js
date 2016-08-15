import express from 'express';

import permissions from '../../services/permissions';

import handlers from './handlers';

const router = new express.Router();

router.use(permissions.checkAuthentification);

/**
 * @api {post} /threads/ Create thread
 * @apiName CreateThread
 * @apiGroup Threads
 *
 * @apiParam {String} title Threads title.
 * @apiParam {String} content Threads content.
 * @apiParam {ObjectId} categoryId Threads parent category.
 */
router.post('/', handlers.createThread);

/**
 * @api {get} /threads/ Get all threads
 * @apiName GetThreads
 * @apiGroup Threads
 *
 * @apiParam {String} title Threads title.
 * @apiParam {String} content Threads content.
 * @apiParam {ObjectId} owner Threads owner.
 */
router.get('/', handlers.getThreads);

/**
 * @api {get} /threads/:id Get specific thread
 * @apiName GetThread
 * @apiGroup Threads
 *
 * @apiParam {String} title Threads title.
 * @apiParam {String} content Threads content.
 * @apiParam {ObjectId} owner Threads owner.
 */
router.get('/:threadId', handlers.getThread);

module.exports = router;
