const db = require('../helpers/db_homestay').db;

module.exports.getAll = () => {
    const sql = "SELECT * FROM city";

    return new Promise((resolve, reject) => {
        db.query(sql, [], function (err, cites) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(cites);
            }
        })
    });
};

module.exports.get = (cityId) => {
    const sql = "SELECT * FROM city WHERE id = ?";

    return new Promise((resolve, reject) => {
        db.query(sql, cityId, function (err, cites) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(cites[0]);
            }
        })
    });
};