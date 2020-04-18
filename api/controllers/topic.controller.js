const topicService = require('../model/topic');

module.exports.getAll = (req, res, next) => {
    topicService.getAll().then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

module.exports.getTopicItemByTopic = (req, res, next) => {
    topicService.getTopicItemByTopic(req.params.id).then(topicItems => {
        return res.json(topicItems)
    }).catch(err => {
        return res.json(err)
    })
};

module.exports.getAllTopicItem = (req, res, next) => {
    topicService.getAll().then(topics => {
        let promises = [];
        topics.forEach(topic => {
            promises.push(topicService.getTopicItemByTopic(topic.id));
        });
        Promise.all(promises).then(data => {
            for(let i = 0; i < topics.length; i ++) {
                topics[i].topic_item = data[i];
            }
            return res.json({
                status_code: 200,
                data: topics,
                error: ""
            });
        });
    }).catch(err => {
        return res.json({
            status_code: 400,
            error: err
        })
    })
};