module.exports = function(req, res) {
  req.user.deepPopulate('profilePhoto').then((user) => {
    res.json({
      user: user.toObject()
    });
  });
};
