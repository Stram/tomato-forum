import {Request, Response} from 'express';
import * as passport from 'passport';

import User from 'models/user';
import ResponseStatus from 'enums/response-status';

export function login(req: Request, res: Response, next: (error?: any) => void) {
  passport.authenticate('local-login', (error: any, user: User | null, info?: any) => {
    if (error) {
      next(error);
      return;
    }

    if (!user) {
      // return BadRequest
      // next(new errors.BadRequest(info));
      return;
    }

    res.status(200).json({
      user: user.serialize()
    });
  })(req, res, next);
}

export function logout(req: Request, res: Response, next: (error?: any) => void) {
  req.logout();
  res.sendStatus(ResponseStatus.OK);
}
