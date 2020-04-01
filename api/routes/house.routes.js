import express from 'express';
import houseCtrl from '../controllers/house.controller'

const router = express.Router();

router.route('/:id').get(houseCtrl.getById);
router.route('/get_by_topic/:id').get(houseCtrl.getByTopicItem);
router.route('/get_by_collection/:id').get(houseCtrl.getByCollection);

export default router;