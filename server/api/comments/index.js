import express from 'express';

import permissions from '~/services/permissions';

import create from './handlers/create';

const router = new express.Router();

router.use(permissions.checkAuthentification);

router.post('/', create);

module.exports = router;
