import express from 'express';
import topicCtrl from '../controllers/topic.controller'

const router = express.Router();

router.route('/get_all_topic').get(topicCtrl.getAll);
router.route('/get_topic_item/:id').get(topicCtrl.getTopicItemByTopic);
// router.route('/topic_item/:id').get(topicCtrl.getTopicItemById);

export default router;