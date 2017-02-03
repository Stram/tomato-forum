import {Request, Response} from 'express';

namespace UtilController {
  export function authenticated(req: Request, res: Response, next: Function) {
    if (!req.user) {
      res.status(403).send();
    }
    next();
  }
}

export default UtilController
