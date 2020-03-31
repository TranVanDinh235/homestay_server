const config = {
    server_host: process.env.SERVER_HOST || 'localhost',
    server_port: process.env.SERVER_PORT || 3030,
    prefix_api: process.env.PREFIX_API || '/homestay/v1/api',

    secret_key: process.env.SECRET_KEY || 'HOMESTAY-RESTfulAPI-110320QW@',
    access_token_key: 'nekoTessecca',
    reset_password_token_expiry: '1h',

    mysql_db: {
        host: process.env.MYSQL_DB_HOST || process.env.MYSQL_DB_STAGING_HOST || 'localhost',
        user: process.env.MYSQL_DB_USER || process.env.MYSQL_DB_STAGING_USER || 'root',
        password: process.env.MYSQL_DB_PASSWORD || process.env.MYSQL_DB_STAGING_PASSWORD || '',
        database: process.env.MYSQL_DB_NAME || process.env.MYSQL_DB_STAGING_NAME || 'homestay',
        port: 3308,
        ssl: false
    }
};


export default config