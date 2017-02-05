import {Router} from 'express';

import authentication from 'router/authentication';
import threads from 'router/threads';

const router: Router = Router();

router.use(authentication);
router.use('/threads', threads);

export default router;
