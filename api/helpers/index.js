import mysql from 'mysql'
import config from '../helpers/config'

const pool = mysql.createConnection({
    host: config.mysql_db.host,
    user: config.mysql_db.user,
    password: config.mysql_db.password,
    database: config.mysql_db.database,
    port: config.mysql_db.port,
    multipleStatements: true
});

pool.connect(error => {
    if (error) {
        throw "Can't connect to MySQL: " + error;
    } else {
        console.log('MySQL Connected!');
    }
});

export default {
    pool,
};