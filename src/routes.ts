import { Router } from 'express';
import multer from 'multer';

import OrphanagesController from './controller/OrphanagesController';
import uploadConfig from './config/upload';

const router = Router();
const upload = multer(uploadConfig);

router.get('/orphanages/:id', (request, response) => OrphanagesController.show(request, response));
router.get('/orphanages', (request, response) => OrphanagesController.index(request, response));
router.post('/orphanages', upload.array('images'), (request, response) => OrphanagesController.create(request, response));

export default router;