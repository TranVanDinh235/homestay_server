import topicService from '../services/topic';

const getAll = (req, res, next) => {
    topicService.getAll(req).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

const getTopicItemByTopic = (req, res, next) => {
    topicService.getTopicItemByTopic(req).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

export default {
    getAll,
    getTopicItemByTopic
}