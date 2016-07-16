import express from 'express';

import Category from '../models/category';

const router = new express.Router();

// NEW CATEGORY

router.post('/', (req, res, next) => {
  const newCategory = new Category({
    name: req.body.name
  });

  newCategory.save((error) => {
    if (error) {
      next(error);
    }
    res.json({
      category: newCategory.toObject()
    });
  });
});

router.get('/', (req, res) => {
  Category.find().then((categories) => {
    res.json(categories.map((category) => category.toObject()));
  });
});

// router.get('/:categoryId', (req, res) => {
//   Category.findById(req.params.categoryId)
//     .populate({path: 'owner', populate: {path: 'profilePhoto'}})
//     .populate({path: 'comments', populate: {path: 'user', populate: {path: 'profilePhoto'}}})
//     .then((thread) => res.json(thread.toObject()));
// });

module.exports = router;
