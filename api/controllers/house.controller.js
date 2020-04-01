import houseService from '../services/house';

const getByTopicItem = (req, res, next) => {
    houseService.getByTopicItem(req).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

const getByCollection = (req, res, next) => {
    houseService.getByCollection(req).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

const getById = (req, res, next) => {
    houseService.getById(req).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

export default {
    getByTopicItem,
    getByCollection,
    getById
}