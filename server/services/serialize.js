module.exports = {
  user(userObj) {
    delete userObj.local.password;
    userObj.id = userObj._id;
    return userObj.toObject({ getters: false, virtuals: false });
  }
};
