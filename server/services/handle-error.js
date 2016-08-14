import _ from 'lodash';
import errors from './errors';

function saniteizeError(errorObject) {
  switch (errorObject.name) {
  case 'ValidationError':
    return _.keys(errorObject.errors).map((errorKey) => {
      if (errorObject.errors.hasOwnProperty(errorKey)) {
        return new errors.BadRequest({
          message: errorObject.errors[errorKey].message,
          field: errorObject.errors[errorKey].path
        });
      }
      return {};
    });
  default:
    console.warn('Unknown error type', errorObject);
    return null;
  }
}

module.exports = function(err, req, res, next) {
  let error = err;
  if (!error.statusCode) {
    error = saniteizeError(err);
  }

  let status;
  let message;

  if (_.isArray(error)) {
    status = _.maxBy(error, 'statusCode').statusCode;
    message = error.map((errorDesc) => _.omit(errorDesc, ['statusCode']));
  } else {
    status = error.statusCode;
    message = _.omit(error, ['statusCode']);
  }

  res.status(status || 500);
  res.send(message || 'An error occured!');
};
