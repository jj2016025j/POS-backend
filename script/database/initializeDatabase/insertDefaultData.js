// database/init/insertDefaultData.js
const { categories } = require('../data/categoryData');
const { menuItems } = require('../data/menuItemData');
const { tables } = require('../data/tableData');

async function insertDefaultData(sequelize) {
  const { Category, menuItem, table } = sequelize.models;

  await Category.bulkCreate(categories, { ignoreDuplicates: true });
  await menuItem.bulkCreate(menuItems, { ignoreDuplicates: true });
  await table.bulkCreate(tables, { ignoreDuplicates: true });

  console.log('預設資料已匯入');
}

module.exports = insertDefaultData;
