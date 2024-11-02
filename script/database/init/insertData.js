// database/init/insertInitialData.js
const { insert, query } = require('../basic/dbBasicOperations');
const categoryData = require('../data/categoryData').categoryData;
const menuItemsData = require('../data/fangsFoodData');
const sqlErrorHandler = require('../../utils/sqlErrorHandler');

async function insertInitialData() {
  try {
    await insertCategories();
    await insertMenuItems();
  } catch (error) {
    const simpleError = sqlErrorHandler(error);
    console.error("插入初始數據失敗:", simpleError.message);
    throw simpleError; // 將錯誤重新拋出給上層處理
  }
}

// 插入分類數據
async function insertCategories() {
  try {
    for (const category of categoryData) {
      await insert('Category', {
        CategoryName: category.category,
        sort: category.sort
      });
      console.log(`插入分類數據: ${category.category}`);
    }
  } catch (error) {
    const simpleError = sqlErrorHandler(error);
    console.error("插入分類數據失敗:", simpleError.message);
    throw simpleError; // 將錯誤重新拋出
  }
}

// 插入菜單項目數據
async function insertMenuItems() {
  try {
    for (const item of menuItemsData) {
      const categoryId = await getCategoryIdByName(item.Category);
      if (!categoryId) {
        console.warn(`分類 ${item.Category} 未找到，跳過插入 ${item.MenuItemName}`);
        continue; // 如果分類不存在，則跳過該菜單項目
      }
      await insert('MenuItems', {
        MenuItemName: item.MenuItemName,
        CategoryId: categoryId,
        Price: item.Price,
        Insupply: true
      });
      console.log(`插入菜單項目數據: ${item.MenuItemName}`);
    }
  } catch (error) {
    const simpleError = sqlErrorHandler(error);
    console.error("插入菜單項目數據失敗:", simpleError.message);
    throw simpleError; // 將錯誤重新拋出
  }
}

// 根據分類名稱取得分類 ID
async function getCategoryIdByName(categoryName) {
  try {
    const results = await query('SELECT Id FROM Category WHERE CategoryName = ?', [categoryName]);
    return results.length > 0 ? results[0].Id : null;
  } catch (error) {
    const simpleError = sqlErrorHandler(error);
    console.error(`取得分類 ID 失敗: ${categoryName}`, simpleError.message);
    throw simpleError; // 將錯誤重新拋出
  }
}

module.exports = insertInitialData;
