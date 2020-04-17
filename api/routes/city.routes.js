import express from 'express';
import cityCtrl from '../controllers/city.controller'

const router = express.Router();


router.route('/').get(cityCtrl.getAll);
router.route('/:id').get(cityCtrl.get);

export default router;