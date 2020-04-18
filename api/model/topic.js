const db = require('../helpers/db_homestay').db;

module.exports.getAll = () => {
    const sql = 'SELECT * FROM topic';
    return new Promise((resolve, reject) => {
        db.query(sql,[], function (err, topics) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(topics);
            }
        })
    });
};

module.exports.getTopicItemByTopic = (topicId) => {
    const sql = "SELECT * FROM topic_item WHERE topic_id = ?";

    return new Promise((resolve, reject) => {
        db.query(sql, topicId, function (err, topicItems) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(topicItems);
            }
        })
    });
};

module.exports.getTopicItemById = (topicItemId) => {
    const sql = "SELECT * FROM topic_item WHERE id = ?";

    return new Promise((resolve, reject) => {
        db.query(sql, topicItemId, function (err, topicItems) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(topicItems[0]);
            }
        })
    });
};