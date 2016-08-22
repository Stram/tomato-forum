import _ from 'lodash';
import errors from './errors';

function saniteizeError(errorObject) {
  switch (errorObject.name) {
  case 'ValidationError':
    return _.keys(errorObject.errors).map((errorKey) => {
      if (errorObject.errors.hasOwnProperty(errorKey)) {
        const field = _.last(_.split(errorObject.errors[errorKey].path, '.'));
        return new errors.BadRequest({
          message: errorObject.errors[errorKey].message,
          field
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
  let response;

  if (_.isArray(error)) {
    status = _.maxBy(error, 'statusCode').statusCode;
    response = error.map((errorDesc) => _.omit(errorDesc, ['statusCode']));
  } else {
    status = error.statusCode;
    response = _.omit(error, ['statusCode']);
  }

  res.status(status || 500);
  res.send({
    errors: response || {message: 'An error occured!'}
  });
};
