function NotFound(message) {
  Error.captureStackTrace(this);

  this.statusCode = 404;
  this.message = message;
}

NotFound.prototype = Object.create(Error.prototype);

module.export = {
  NotFound
};
