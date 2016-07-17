import express from 'express';

import Category from '../models/category';

import handleError from '../services/handle-error';
import permissions from '../services/permissions';

const router = new express.Router();

// router.use(permissions.checkAuthentification);

/**
 * @api {post} /categories/ Create category
 * @apiName CreateCategory
 * @apiGroup Category
 *
 * @apiParam {String} name Categories unique name.
 *
 * @apiSuccess {String} name Name of the category.
 */
router.post('/', (req, res) => {
  const newCategory = new Category({
    name: req.body.name
  });

  newCategory.save((error) => {
    if (error) {
      handleError(error, res);
      return;
    }
    res.status(201);
    res.json({
      category: newCategory.toObject()
    });
  });
});

/**
 * @api {get} /categories/ Request all categories
 * @apiName RequestCategory
 * @apiGroup Category
 *
 * @apiSuccess {String} name Name of the category.
 */
router.get('/', (req, res) => {
  console.log(req.user);
  Category.find().deepPopulate('threads.owner.profilePhoto').then((categories) => {
    res.json(categories.map((category) => category.toObject()));
  });
});

module.exports = router;
