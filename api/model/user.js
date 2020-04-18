const db = require('../helpers/db_homestay').db;

module.exports.get = function(userId){
    const sql = "SELECT * FORM user WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, userId, function (err, user) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
};