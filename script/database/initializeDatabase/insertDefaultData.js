// database/init/insertDefaultData.js
async function insertDefaultData(sequelize) {
  const Category = sequelize.models.Category;
  const menuItem = sequelize.models.menuItem;
  const table = sequelize.models.table;

  const categories = [
    { categoryName: '鍋類', Description: '各式鍋類', sort: 1 },
    { categoryName: '肉類', Description: '肉類產品', sort: 2 },
    { categoryName: '蔬菜類', Description: '新鮮蔬菜', sort: 3 },
  ];

  const menuItems = [
    { menuItemName: '梅花豬肉', categoryId: 2, Price: 300 },
    { menuItemName: '五花牛', categoryId: 2, Price: 350 },
    { menuItemName: '大白菜', categoryId: 3, Price: 50 },
  ];

  const tables = Array.from({ length: 30 }, (_, i) => ({
    TableNumber: i + 1,
    TablesStatus: '空桌'
  }));

  await Category.bulkCreate(categories, { ignoreDuplicates: true });
  await menuItem.bulkCreate(menuItems, { ignoreDuplicates: true });
  await table.bulkCreate(tables, { ignoreDuplicates: true });

  console.log('預設資料已匯入');
}

module.exports = insertDefaultData;
