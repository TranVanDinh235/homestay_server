const db = require('../helpers/db_homestay').db;

module.exports.get = (houseId) => {
    const sql = "SELECT * FROM houses WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [houseId], function (err, houses) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(houses[0]);
            }
        })
    });
};

module.exports.mapToCollection = (house, userId) => {
    const sql = "SELECT * FROM collection WHERE guest_id = ? AND house_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [userId, house.id], function (err, collection) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                if(collection.length > 0){
                    house.time = collection[0].time;
                }
                resolve(house);
            }
        })
    });
};

module.exports.getByTopicItem = (topicItem) => {
    const sql = "SELECT h.*, th.topic_item_id AS topic_item_id FROM topic_item_house th " +
        "INNER JOIN houses h ON th.house_id = h.id " +
        "WHERE th.topic_item_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, topicItem.id, function (err, houses) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                topicItem.houses = houses;
                resolve(topicItem)
            }
        })
    });
};

module.exports.getByCollection = (guestId) => {
    const sql = "SELECT h.*, c.guest_id, c.time FROM collection c INNER JOIN houses h ON c.house_id = h.id WHERE c.guest_id = ? ORDER BY time ADC";
    return new Promise((resolve, reject) => {
        db.query(sql, guestId, function (err, houses) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(houses);
            }
        })
    });
};

module.exports.getByCity = (city) => {
    const sql = "SELECT h.*, c.name AS city_name, c.photo AS city_photo FROM city c INNER JOIN houses h ON c.id = h.city_id WHERE c.id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, city.id, function (err, houses) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                city.houses = houses;
                resolve(city);
            }
        })
    });
};

module.exports.getFacilities = (houseId) =>{
    const sql = "SELECT * FROM facilities WHERE house_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [houseId], function (err, facilities){
            if(err){
                console.log(err);
                reject(err);
            } else {
                delete facilities[0].id;
                delete facilities[0].house_id;
                resolve(facilities[0]);
            }
        })
    })
};

module.exports.getEntertainment = (houseId) =>{
    const sql = "SELECT * FROM entertainment WHERE house_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [houseId], function (err, entertainments){
            if(err){
                console.log(err);
                reject(err);
            } else {
                delete entertainments[0].id;
                delete entertainments[0].house_id;
                resolve(entertainments[0]);
            }
        })
    })
};

module.exports.getFamilies = (houseId) =>{
    const sql = "SELECT * FROM families WHERE house_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [houseId], function (err, families){
            if(err){
                console.log(err);
                reject(err);
            } else {
                delete families[0].id;
                delete families[0].house_id;
                resolve(families[0]);
            }
        })
    })
};

module.exports.getRoomFacilities = (houseId) =>{
    const sql = "SELECT * FROM room_facilities WHERE house_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [houseId], function (err, facilities){
            if(err){
                console.log(err);
                reject(err);
            } else {
                delete facilities[0].id;
                delete facilities[0].house_id;
                resolve(facilities[0]);
            }
        })
    })
};

module.exports.getKitchenFacilities = (houseId) =>{
    const sql = "SELECT * FROM kitchen_facilities WHERE house_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [houseId], function (err, facilities){
            if(err){
                console.log(err);
                reject(err);
            } else {
                delete facilities[0].id;
                delete facilities[0].house_id;
                resolve(facilities[0]);
            }
        })
    })
};

module.exports.getSpecialFacilities = (houseId) =>{
    const sql = "SELECT * FROM special_facilities WHERE house_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [houseId], function (err, facilities){
            if(err){
                console.log(err);
                reject(err);
            } else {
                delete facilities[0].id;
                delete facilities[0].house_id;
                resolve(facilities[0]);
            }
        })
    })
};

