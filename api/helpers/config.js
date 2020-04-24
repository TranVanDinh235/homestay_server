module.exports.config = {
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
    },
    web: {
        client_id : "233136474065-5s76pvccvu8l1ahujm9jt36h0ogh8t0k.apps.googleusercontent.com",
        project_id: "homestay160420",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: "lf0lJJwz0NRm3nRFhl3HR6mh"
    },
    facebook: {
        client_id: "1116456172023199",
        client_secret: "79000525f5f319b9145c79a93bac594d"
    }
};


