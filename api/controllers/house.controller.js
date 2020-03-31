import houseService from '../services/house';

const getByTopic = (req, res, next) => {
    houseService.getByTopic(req).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
}

export default {
    getByTopic,
}