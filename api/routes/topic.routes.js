const express = require('express');
const topicCtrl = require('../controllers/topic.controller');

const router = express.Router();

router.route('/').get(topicCtrl.getAll);
router.route('/:id/topic-item').get(topicCtrl.getTopicItemByTopic);
router.route('/topic-item').get(topicCtrl.getAllTopicItem);

module.exports.router = router;