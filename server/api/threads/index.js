import express from 'express';

import permissions from 'services/permissions';
import paginationMiddleware from 'middlewares/pagination';

import create from './handlers/create';
import get from './handlers/get';
import getAll from './handlers/get-all';
import getAllFilters from './handlers/get-all/filters';

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
router.post('/', create);

/**
 * @api {get} /threads/ Get all threads
 * @apiName GetThreads
 * @apiGroup Threads
 *
 * @apiParam {String} title Threads title.
 * @apiParam {String} content Threads content.
 * @apiParam {ObjectId} owner Threads owner.
 */
router.get('/', paginationMiddleware, getAllFilters, getAll);

/**
 * @api {get} /threads/:id Get specific thread
 * @apiName GetThread
 * @apiGroup Threads
 *
 * @apiParam {String} title Threads title.
 * @apiParam {String} content Threads content.
 * @apiParam {ObjectId} owner Threads owner.
 */
router.get('/:threadId', get);

module.exports = router;
