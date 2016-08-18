import Category from '~/models/category';

module.exports = {
  createCategory(req, res, next) {
    const newCategory = new Category({
      name: req.body.name
    });

    newCategory.save((error) => {
      if (error) {
        next(error);
        return;
      }
      res.status(201);
      res.json({
        category: newCategory.toObject()
      });
    });
  },

  getCategories(req, res) {
    Category.find().deepPopulate('threads.owner.profilePhoto').then((categories) => {
      res.json(categories.map((category) => category.toObject()));
    });
  }

};
