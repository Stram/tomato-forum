module.exports = function(error, response) {
  switch (error.name) {
  case 'ValidationError':
    response.json({
      error: {
        message: error.errors.name.message,
        field: error.errors.name.path
      }
    });
    break;
  default:
    response.json({
      error: {
        message: 'An error occured'
      }
    });
  }
};
