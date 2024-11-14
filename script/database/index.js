// database/init/initializeDatabase.js
const createDatabase = require('./initializeDatabase/createDatabase');
const createTables = require('./initializeDatabase/createTables');
const insertDefaultData = require('./initializeDatabase/insertDefaultData');

async function initializeDatabase() {
  try {
    // 創建資料庫並建立 Sequelize 連線
    const sequelize = await createDatabase();

    // 同步表格
    await createTables(sequelize);

    // 插入預設資料
    await insertDefaultData(sequelize);

    console.log("資料庫初始化成功！");
    return sequelize;
  } catch (error) {
    console.error("資料庫初始化失敗:", error);
    throw error;
  }
}

module.exports = { initializeDatabase };
