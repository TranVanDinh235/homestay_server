import db from '../helpers/db_homestay';

const get = function(userId){
    const sql = "SELECT * FORM user WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.pool.query(sql, userId, function (err, user) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
};

export default {
    get,
}