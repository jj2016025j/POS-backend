// InitDB.js
const db = require('./db/operations');
const tableDefinitions = require('./db/tableDefinitions');
const initData = require('./data/initData');
const Category = require('./models/Category');
const MenuItems = require('./models/MenuItems');

async function initializeDatabase() {
  try {
    // 1. 建立所有資料表
    console.log("正在建立資料表...");
    for (const table in tableDefinitions) {
      await db.query(tableDefinitions[table]);
      console.log(`表格 ${table} 建立完成`);
    }

    // 2. 插入初始數據
    console.log("正在插入初始數據...");
    await Category.insertCategories(initData.categories);

    // 插入菜單資料
    const fangsFoodData = require('./data/fangsFoodData');
    for (const item of fangsFoodData) {
      await MenuItems.insertMenuItem(item);
    }

    console.log("資料庫初始化成功！");
  } catch (error) {
    console.error("資料庫初始化失敗:", error);
  } finally {
    db.close();  // 確保在操作完成後釋放連線
  }
}

module.exports = initializeDatabase;
