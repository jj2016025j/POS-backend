// database/init/insertInitialData.js
const { insert, query } = require('../baseOperations');
const categoryData = require('../data/categoryData').categoryData;
const menuItemsData = require('../data/projectDataList');

async function insertInitialData() {
  try {
    await insertCategories();
    await insertMenuItems();
  } catch (error) {
    console.error("插入初始數據失敗:", error);
    throw error;
  }
}

// 插入分類數據
async function insertCategories() {
  for (const category of categoryData) {
    await insert('Category', {
      CategoryName: category.category,
      sort: category.sort
    });
    console.log(`插入分類數據: ${category.category}`);
  }
}

// 插入菜單項目數據
async function insertMenuItems() {
  for (const item of menuItemsData) {
    const categoryId = await getCategoryIdByName(item.Category);
    await insert('MenuItems', {
      MenuItemName: item.MenuItemName,
      CategoryId: categoryId,
      Price: item.Price,
      Insupply: true
    });
    console.log(`插入菜單項目數據: ${item.MenuItemName}`);
  }
}

// 根據分類名稱取得分類 ID
async function getCategoryIdByName(categoryName) {
  const results = await query('SELECT Id FROM Category WHERE CategoryName = ?', [categoryName]);
  return results.length > 0 ? results[0].Id : null;
}

module.exports = insertInitialData;
