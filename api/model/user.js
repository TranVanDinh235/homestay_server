const db = require('../helpers/db_homestay').db;

module.exports.get = function(id){
    const sql = "SELECT * FROM guest WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, id, function (err, users) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(users[0]);
            }
        })
    })
};


module.exports.getByEmail = function(email){
    const sql = "SELECT * FROM guest WHERE email = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, email, function (err, users) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(users[0]);
            }
        })
    })
};

module.exports.getBySocialId = function(id){
    const sql = "SELECT * FROM guest WHERE social_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, id, function (err, users) {
            if(err){
                reject(err);
            } else {
                resolve(users[0]);
            }
        })
    })
};

module.exports.insert = function(user){
    const sql = "INSERT INTO guest(user_name, email, pic_url, social_id) VALUE (?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        db.query(sql, [user.name, user.email, user.pic, user.id], function (err, user) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
};

module.exports.update = function(user){
    const sql = "UPDATE guest SET user_name = ?, email = ?, phone = ?, facebook = ?, password = ?, pic_url = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [user.name, user.email, user.phone, user.facebook, user.password, user.pic_url, user.id], function (err, user) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
};

module.exports.delete = function(user){
    const sql = "DELETE FROM guest WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [user.id], function (err, user) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
};

