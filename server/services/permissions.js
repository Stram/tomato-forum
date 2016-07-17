module.exports = {
  checkAuthentification(req, res, next) {
    if (req.user) {
      return next();
    }
    res.status(401);
    return res.json({
      errors: [{
        message: 'Not authenticated'
      }]
    });
  }
};
