import express from 'express';

import Category from '../models/category';

const router = new express.Router();

// FORUM

router.get('/', (req, res) => {
  Category.find().deepPopulate('threads').then((categories) => {
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
