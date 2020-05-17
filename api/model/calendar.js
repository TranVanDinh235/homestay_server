const db = require('../helpers/db_homestay').db;

module.exports.getCalendarByHouse = (house) => {
    const sql = "SELECT * FROM calendar WHERE house_id = ?";

    return new Promise((resolve, reject) => {
        db.query(sql, [house.id], function (err, calendar) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                delete calendar.house_id;
                house.calendar = calendar;
                resolve(house);
            }
        })
    });
};