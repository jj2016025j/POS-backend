// config/database.js
const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "fang_project",
});

// 將 pool.query 轉換為 Promise 形式
pool.query = util.promisify(pool.query);

module.exports = pool;
