const houseService = require('../model/house');
const topicService = require('../model/topic');
const cityService = require('../model/city');
const rateService = require('../model/rate');
const calendarService = require('../model/calendar');
const reviewService = require('../model/review');

module.exports.get = async (req, res, next) => {
    try{
        let house = await houseService.get(req.params.id);
        house = await houseService.mapToCollection(house, req.query.user_id);
        house = await rateService.getRate(house);
        house.facilities = await houseService.getFacilities(house.id);
        house.entertainment = await houseService.getEntertainment(house.id);
        house.families = await houseService.getFamilies(house.id);
        house.room_facilities = await houseService.getRoomFacilities(house.id);
        house.kitchen_facilities = await houseService.getKitchenFacilities(house.id);
        house.special_facilities = await houseService.getSpecialFacilities(house.id);
        house = await reviewService.getNumOfReview(house);
        house = await calendarService.getCalendarByHouse(house);
        return res.status(200).json({
            status_code: 200,
            house,
            error: ""
        })
    } catch (err) {
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    }
    houseService.get(req.params.id, req.params.user_id).then(house => {
        return res.json(house)
    }).catch(err => {
        return res.json(err)
    })
};

module.exports.getByTopicItem = async (req, res, next) => {
    try {
        let topicItem = await topicService.getTopicItemById(req.params.id);
        topicItem = await houseService.getByTopicItem(topicItem);
        for (let house of topicItem.houses) {
            house = await rateService.getRate(house);
            house.facilities = await houseService.getFacilities(house.id);
            house.entertainment = await houseService.getEntertainment(house.id);
            house.families = await houseService.getFamilies(house.id);
            house.room_facilities = await houseService.getRoomFacilities(house.id);
            house.kitchen_facilities = await houseService.getKitchenFacilities(house.id);
            house.special_facilities = await houseService.getSpecialFacilities(house.id);
            house = await reviewService.getNumOfReview(house);
            house = await calendarService.getCalendarByHouse(house);
        }
        return res.status(200).json({
            status_code: 200,
            house_list: topicItem,
            error: ""
        })

    } catch (err) {
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    }


};

module.exports.getByCollection = async (req, res, next) => {
    try {
        let houses =  await houseService.getByCollection(req.params.id);
        for (let house of houses) {
            house = await rateService.getRate(house);
            delete house.description;
            delete house.house_rules;
            delete house.house_manual;
            delete house.address;
            delete house.minimum_stay;
            delete house.guests;
            // house.facilities = await houseService.getFacilities(house.id);
            // house.entertainment = await houseService.getEntertainment(house.id);
            // house.families = await houseService.getFamilies(house.id);
            // house.room_facilities = await houseService.getRoomFacilities(house.id);
            // house.kitchen_facilities = await houseService.getKitchenFacilities(house.id);
            // house.special_facilities = await houseService.getSpecialFacilities(house.id);
            house = await reviewService.getNumOfReview(house);
            // house = await calendarService.getCalendarByHouse(house);
        }
        return res.status(200).json({
            status_code: 200,
            house_list: {
                houses: houses
            },
            error: ""
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    }
};

module.exports.getByCity = async (req, res, next) => {
    try {
        let city = await cityService.get(req.params.id);
        city = await houseService.getByCity(city);
        for (let house of city.houses) {
            house = await rateService.getRate(house);
            house.facilities = await houseService.getFacilities(house.id);
            house.entertainment = await houseService.getEntertainment(house.id);
            house.families = await houseService.getFamilies(house.id);
            house.room_facilities = await houseService.getRoomFacilities(house.id);
            house.kitchen_facilities = await houseService.getKitchenFacilities(house.id);
            house.special_facilities = await houseService.getSpecialFacilities(house.id);
            house = await reviewService.getNumOfReview(house);
            house = await calendarService.getCalendarByHouse(house);
        }
        return res.status(200).json({
            status_code: 200,
            city: city,
            error: ""
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    }
};