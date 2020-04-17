import db from '../helpers/db_homestay';

const getAll = () => {
    const sql = "SELECT * FROM city";

    return new Promise((resolve, reject) => {
        db.pool.query(sql, [], function (err, cites) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(cites);
            }
        })
    });
};

const get = (cityId) => {
    const sql = "SELECT * FROM city WHERE id = ?";

    return new Promise((resolve, reject) => {
        db.pool.query(sql, cityId, function (err, cites) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(cites[0]);
            }
        })
    });
};

export default {
    getAll,
    get
}