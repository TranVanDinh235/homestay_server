import db from '../helpers/operations';

const getByTopic = (request) => {
    const table = 'topic';
    return new Promise((resolve, reject) => {
        db.exec_query(db.build_select_query(table)).then(res => {
            if(res.success && res.rowCount > 0){
                resolve({
                    status: true,
                    code: 'API-00000',
                    data: {
                        topics: res.data.rows
                    }
                })
            }
        }).catch(() => {
            reject({
                status: false,
                code: 'API-00402',
                data: "Error on find topic"
            })
        })
    });
};

export default {
    getByTopic,
}