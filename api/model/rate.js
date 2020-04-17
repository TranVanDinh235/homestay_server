import db from '../helpers/db_homestay';
import util from '../helpers/utils'

const getRateByWeek = (house) => {
    const sql = "SELECT * FROM rate_by_week WHERE house_id = ? AND from_day <= ? AND to_day >= ?";
    return new Promise((resolve, reject) => {
        db.pool.query(sql, [house.id, util.getDayOfWeek(), util.getDayOfWeek()], function (err, rates) {
            if(err){
                reject(err);
            } else {
                if(house.rate == null) {
                    house.rate = rates[0].rate;
                }
                resolve(house);
            }
        })
    });
};

const getRateSpecialDay = (house) => {
    const sql = "SELECT * FROM rate_special_day WHERE house_id = ? AND date = ?";
    return new Promise((resolve, reject) => {
        db.pool.query(sql, [house.id, util.getTimeStartDay()], function (err, rates) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                if(rates.length > 0) {
                    house.rate = rates[0].rate;
                }
                resolve(house);
            }
        })
    });
};

const getRate = (house) => {
    return new Promise((resolve, reject) => {
        getRateSpecialDay(house)
            .then(house => getRateByWeek(house))
            .then(house => resolve(house))
            .catch(err => reject(err))
    })
};

export default {
    getRateByWeek,
    getRateSpecialDay,
    getRate
}