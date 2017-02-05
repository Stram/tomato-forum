import {Router} from 'express';
import * as AuthenticationController from 'controllers/authentication';

const router: Router = Router();

router.post('/login', [
  AuthenticationController.login
]);

router.post('/logout', [
  AuthenticationController.logout
]);

router.post('/register', [
  AuthenticationController.register
]);

export default router;
