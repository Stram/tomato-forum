module.exports = function(req, res) {
  if (req.user) {
    req.user.deepPopulate('profilePhoto').then((user) => {
      res.json({
        user: user.toObject()
      });
    });
  } else {
    res.json({
      user: null
    });
  }
};
