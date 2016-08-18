module.exports = function(req, res) {
  res.json({
    user: req.user.toObject()
  });
};
