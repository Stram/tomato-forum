function generateCustomError(code) {
  const CustomError = function(options) {
    Error.captureStackTrace(this);

    this.statusCode = code;

    if (typeof options === 'string') {
      this.message = options;
    } else {
      this.message = options.message;
      this.field = options.field;
    }
  };

  CustomError.prototype = Object.create(Error.prototype);

  return CustomError;
}

module.exports = {
  BadRequest: generateCustomError(400),
  NotFound: generateCustomError(404)
};
