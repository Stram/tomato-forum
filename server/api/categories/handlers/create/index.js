import Category from '~/models/category';

module.exports = function(req, res, next) {
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
};
