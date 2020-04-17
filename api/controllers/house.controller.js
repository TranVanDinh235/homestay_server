import houseService from '../model/house';
import topicService from '../model/topic';
import cityService from '../model/city';
import rateService from '../model/rate';

const get = (req, res, next) => {
    houseService.get(req.params.id).then(house => {
        return res.json(house)
    }).catch(err => {
        return res.json(err)
    })
};

const getByTopicItem = (req, res, next) => {
    topicService.getTopicItemById(req.params.id)
        .then(topicItem => houseService.getByTopicItem(topicItem))
        .then(topicItem => {
            Promise.all(topicItem.houses.map(rateService.getRate))
                .then(houses => {
                    topicItem.houses = houses;
                    return res.json({
                        status_code: 200,
                        data: topicItem,
                        error: ""
                    })
                })
                .catch(err => {
                    return res.json({
                        status_code: 400,
                        error: err
                    })
                })
        })
        .catch(err => {
            return res.json({
                status_code: 400,
                error: err
            })
        })
};

const getByCollection = (req, res, next) => {
    houseService.getByCollection(req.params.id).then(houses => {
        return res.json(houses)
    }).catch(err => {
        return res.json(err)
    })
};

const getByCity = (req, res, next) => {
    cityService.get(req.params.id)
        .then(city => houseService.getByCity(city))
        .then(city => {
            Promise.all(city.houses.map(rateService.getRate))
                .then(houses => {
                    city.houses = houses;
                    return res.json({
                        status_code: 200,
                        data: city,
                        error: ""
                    })
                })
                .catch(err => {
                    return res.json({
                        status_code: 400,
                        error: err
                    })
                })
        })
        .catch(err => {
            return res.json({
                status_code: 400,
                error: err
            })
        })
};

export default {
    get,
    getByTopicItem,
    getByCollection,
    getByCity,
}