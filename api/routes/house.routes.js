import express from 'express';
import houseController from '../controllers/house.controller'

const router = express.Router();

router.route('/get_by_topic').post(houseController.getByTopic);

export default router;