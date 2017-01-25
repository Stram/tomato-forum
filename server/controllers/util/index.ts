export default class UtilController {
  static authenticated(req, res, next) {
    if (!req.user) {
      res.status(403).send();
    }
    next();
  }
}
