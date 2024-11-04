// database/init/createDatabase.js
const { getSequelizeInstance } = require('../../config/databaseConfig');

async function createDatabase() {
  // 建立無資料庫的連線，用於檢查或創建資料庫
  const sequelizeWithoutDb = getSequelizeInstance(false);

  try {
    await sequelizeWithoutDb.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`);
    console.log(`\n已創建或連接至資料庫: ${process.env.MYSQL_DATABASE}`);
  } catch (error) {
    console.error("資料庫創建失敗:", error);
  } finally {
    await sequelizeWithoutDb.close();
  }

  // 返回帶資料庫的 Sequelize 連線
  const sequelizeWithDb = getSequelizeInstance(true);
  return sequelizeWithDb;
}

module.exports = createDatabase;
