const db = require('../helpers/db_homestay').db;

module.exports.get = (id) => {
    const sql = "SELECT * FROM review WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, id, function (err, reviews) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(reviews[0]);
            }
        })
    });
};

module.exports.getByHouse = (houseId) => {
    const sql = "SELECT * FROM review WHERE house_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, houseId, function (err, reviews) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(reviews);
            }
        })
    });
};

module.exports.insert = (review) => {
    const sql = "INSERT INTO review(house_id, guest_id, content, time) VALUE (?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        db.query(sql, [review.house_id, review.guest_id, review.content, Date.now()/1000], function (err, review) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(review);
            }
        })
    });
};

module.exports.update = (review) => {
    const sql = "UPDATE review SET content = ?, time = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [review.content, Date.now()/1000, review.id], function (err, review) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(review);
            }
        })
    });
};

module.exports.remove = (review) => {
    const sql = "DELETE FROM review WHERE id = ";
    return new Promise((resolve, reject) => {
        db.query(sql, review.id, function (err, review) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(review);
            }
        })
    });
};