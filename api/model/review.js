import db from '../helpers/db_homestay'

const get = (id) => {
    const sql = "SELECT * FROM review WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.pool.query(sql, id, function (err, reviews) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(reviews[0]);
            }
        })
    });
};

const getByHouse = (houseId) => {
    const sql = "SELECT * FROM review WHERE house_id = ?";
    return new Promise((resolve, reject) => {
        db.pool.query(sql, houseId, function (err, reviews) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(reviews);
            }
        })
    });
};

const insert = (review) => {
    const sql = "INSERT INTO review(house_id, guest_id, content, time) VALUE (?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        db.pool.query(sql, [review.house_id, review.guest_id, review.content, Date.now()/1000], function (err, review) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(review);
            }
        })
    });
};

const update = (review) => {
    const sql = "UPDATE review SET content = ?, time = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.pool.query(sql, [review.content, Date.now()/1000, review.id], function (err, review) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(review);
            }
        })
    });
};

const remove = (review) => {
    const sql = "DELETE FROM review WHERE id = ";
    return new Promise((resolve, reject) => {
        db.pool.query(sql, review.id, function (err, review) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(review);
            }
        })
    });
};


export default {
    get,
    getByHouse,
    insert,
    update,
    remove
}