// test/testEnv.js
require('dotenv').config();

console.log("SESSION_SECRET:", process.env.SESSION_SECRET);
console.log("GOOGLE_CLIENT_ID:", process.e00000000000nv.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
console.log("LINE_CHANNEL_ID:", process.env.LINE_CHANNEL_ID);
console.log("LINE_CHANNEL_SECRET:", process.env.LINE_CHANNEL_SECRET);
console.log("PORT:", process.env.PORT);

console.log("MYSQL_HOST:", process.env.MYSQL_HOST);
console.log("MYSQL_USER:", process.env.MYSQL_USER);
console.log("MYSQL_PASSWORD:", process.env.MYSQL_PASSWORD);
console.log("MYSQL_DATABASE:", process.env.MYSQL_DATABASE);
console.log("TEST_MYSQL_DATABASE:", process.env.TEST_MYSQL_DATABASE);
console.log("USE_LOCAL_DB:", process.env.USE_LOCAL_DB);
console.log("ONLY_API_TEST:", process.env.ONLY_API_TEST);
