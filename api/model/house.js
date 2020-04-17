import db from '../helpers/db_homestay';

const get = (houseId) => {
    const sql = "SELECT * FROM houses WHERE id = ? ";
    return new Promise((resolve, reject) => {
        db.pool.query(sql, houseId, function (err, houses) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(houses[0]);
            }
        })
    });
};

const getByTopicItem = (topicItem) => {
    const sql = "SELECT h.*, th.topic_item_id AS topic_item_id FROM topic_item_house th INNER JOIN houses h ON th.house_id = h.id WHERE th.topic_item_id = ?";
    return new Promise((resolve, reject) => {
        db.pool.query(sql, topicItem.id, function (err, houses) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                houses.forEach(house => {
                    delete house.minimum_stay;
                    delete house.check_in_start;
                    delete house.check_in_end;
                    delete house.check_out;
                    delete house.instant_booking;
                    delete house.cancellation_policy;
                    delete house.description;
                    delete house.house_rules;
                    delete house.facilities;
                    delete house.kitchen_facilities;
                    delete house.room_facilities;
                    delete house.entertainment;
                    delete house.special_facilities;
                    delete house.families;
                    delete house.house_manual;
                });
                topicItem.houses = houses;
                resolve(topicItem)
            }
        })
    });
};

const getByCollection = (guestId) => {
    const sql = "SELECT h.*, c.guest_id FROM collection c INNER JOIN houses h ON c.house_id = h.id WHERE c.guest_id = ?";
    return new Promise((resolve, reject) => {
        db.pool.query(sql, guestId, function (err, houses) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(houses);
            }
        })
    });
};

const getByCity = (city) => {
    const sql = "SELECT h.*, c.name AS city_name, c.photo AS city_photo FROM city c INNER JOIN houses h ON c.id = h.city_id WHERE c.id = ?";
    return new Promise((resolve, reject) => {
        db.pool.query(sql, city.id, function (err, houses) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                houses.forEach(house => {
                    delete house.minimum_stay;
                    delete house.check_in_start;
                    delete house.check_in_end;
                    delete house.check_out;
                    delete house.instant_booking;
                    delete house.cancellation_policy;
                    delete house.description;
                    delete house.house_rules;
                    delete house.facilities;
                    delete house.kitchen_facilities;
                    delete house.room_facilities;
                    delete house.entertainment;
                    delete house.special_facilities;
                    delete house.families;
                    delete house.house_manual;
                });
                city.houses = houses;
                resolve(city);
            }
        })
    });
};

export default {
    get,
    getByTopicItem,
    getByCollection,
    getByCity,
}