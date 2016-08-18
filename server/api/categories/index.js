import express from 'express';

import permissions from '~/services/permissions';

import handlers from './handlers';

const router = new express.Router();

router.use(permissions.checkAuthentification);

/**
 * @api {post} /categories/ Create category
 * @apiName CreateCategory
 * @apiGroup Category
 *
 * @apiParam {String} name Category's unique name.
 *
 * @apiSuccess {String} name Name of the category.
 * @apiSuccess {Date} createdAt Date of creation.
 * @apiSuccess {Boolean} allowNewThreads if new threads are allowed to be added to this category.
 * @apiSuccess {Object[]} threads Id's of threads belonging to selected category.
 */
router.post('/', handlers.createCategory);

/**
 * @api {get} /categories/ Get all categories
 * @apiName RequestCategory
 * @apiGroup Category
 *
 * @apiSuccess {String} name Name of the category.
 */
router.get('/', handlers.getCategories);

module.exports = router;
