import express from 'express';
import topic from '../controllers/topic.controller'

const router = express.Router();

router.route('/get_all_topic').post(topic.get);

export default router;