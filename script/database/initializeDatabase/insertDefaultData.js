// database/init/insertDefaultData.js
async function insertDefaultData(sequelize) {
  const Category = sequelize.models.Category;
  const MenuItem = sequelize.models.MenuItem;
  const Table = sequelize.models.Table;

  const categories = [
    { CategoryName: '鍋類', Description: '各式鍋類', sort: 1 },
    { CategoryName: '肉類', Description: '肉類產品', sort: 2 },
    { CategoryName: '蔬菜類', Description: '新鮮蔬菜', sort: 3 },
  ];

  const menuItems = [
    { MenuItemName: '梅花豬肉', CategoryId: 2, Price: 300 },
    { MenuItemName: '五花牛', CategoryId: 2, Price: 350 },
    { MenuItemName: '大白菜', CategoryId: 3, Price: 50 },
  ];

  const tables = Array.from({ length: 10 }, (_, i) => ({
    TableNumber: i + 1,
    TablesStatus: '空桌'
  }));

  await Category.bulkCreate(categories, { ignoreDuplicates: true });
  await MenuItem.bulkCreate(menuItems, { ignoreDuplicates: true });
  await Table.bulkCreate(tables, { ignoreDuplicates: true });

  console.log('\n預設資料已匯入');
}

module.exports = insertDefaultData;
