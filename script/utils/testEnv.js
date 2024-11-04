// test/testEnv.js
require('dotenv').config();

const envCheck = () => {
    const envVariables = {
        SESSION_SECRET: process.env.SESSION_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        LINE_CHANNEL_ID: process.env.LINE_CHANNEL_ID,
        LINE_CHANNEL_SECRET: process.env.LINE_CHANNEL_SECRET,
        PORT: process.env.PORT,
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        MYSQL_DATABASE: process.env.MYSQL_DATABASE,
        TEST_MYSQL_DATABASE: process.env.TEST_MYSQL_DATABASE,
        USE_AWS_DB: process.env.USE_AWS_DB,
        ONLY_API_TEST: process.env.ONLY_API_TEST,
    };

    // console.log("環境變數檢查:", envVariables);
    return envVariables;
};

module.exports = envCheck;

module.exports = {
    envCheck,
};
