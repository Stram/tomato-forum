import express from 'express';

import Category from '../models/category';

const router = new express.Router();

// FORUM

router.get('/', (req, res) => {
  Category.find().deepPopulate('threads').then((categories) => {
    res.json(categories.map((category) => category.toObject()));
  });
});

module.exports = router;
