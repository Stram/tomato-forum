import {Router} from 'express';

import threads from 'router/threads';

const router: Router = Router();

router.use('/threads', threads);

export default router;
