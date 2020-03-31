import topicService from '../services/topic';

const get = (req, res, next) => {
    topicService.getAll(req).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

export default {
    get
}