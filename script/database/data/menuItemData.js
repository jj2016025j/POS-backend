// data/convertData.js

const projectDataList = [
  // 肉類 (meat)
  { Price: 300, menuItemName: "梅花豬肉", Category: "meat" },
  { Price: 250, menuItemName: "五花肉", Category: "meat" },
  { Price: 350, menuItemName: "梅花牛肉", Category: "meat" },
  { Price: 300, menuItemName: "五花牛", Category: "meat" },
  { Price: 450, menuItemName: "澳洲和牛", Category: "meat" },
  { Price: 100, menuItemName: "牛肉丸", Category: "meat" },
  { Price: 238, menuItemName: "美國牛梅花小100克", Category: "meat" },
  { Price: 450, menuItemName: "美國牛梅花大200克", Category: "meat" },
  { Price: 238, menuItemName: "美國牛板腱小100克", Category: "meat" },
  { Price: 450, menuItemName: "美國牛板腱大200克", Category: "meat" },
  { Price: 396, menuItemName: "美國安格斯黑牛肩小排小100克", Category: "meat" },
  { Price: 760, menuItemName: "美國安格斯黑牛肩小排大200克", Category: "meat" },
  { Price: 312, menuItemName: "美國牛五花100克", Category: "meat" },
  { Price: 590, menuItemName: "美國牛五花大200克", Category: "meat" },
  { Price: 336, menuItemName: "松板豬肉片100克", Category: "meat" },
  { Price: 638, menuItemName: "松板豬肉片大200克", Category: "meat" },
  { Price: 150, menuItemName: "豬梅花肉100克", Category: "meat" },
  { Price: 270, menuItemName: "豬梅花肉大200克", Category: "meat" },

  // 海鮮 (seafood)
  { Price: 250, menuItemName: "蝦", Category: "seafood" },
  { Price: 150, menuItemName: "蛤蜊", Category: "seafood" },
  { Price: 400, menuItemName: "石班魚肉", Category: "seafood" },
  { Price: 250, menuItemName: "鱸魚肉", Category: "seafood" },
  { Price: 350, menuItemName: "小卷", Category: "seafood" },
  { Price: 180, menuItemName: "牡蠣", Category: "seafood" },
  { Price: 350, menuItemName: "蟹腳肉", Category: "seafood" },
  { Price: 120, menuItemName: "魚冊", Category: "seafood" },
  { Price: 120, menuItemName: "魚餃", Category: "seafood" },
  { Price: 50, menuItemName: "北海章魚", Category: "seafood" },
  { Price: 80, menuItemName: "章魚條", Category: "seafood" },
  { Price: 85, menuItemName: "日本干貝", Category: "seafood" },
  { Price: 258, menuItemName: "龍膽石斑魚", Category: "seafood" },
  { Price: 300, menuItemName: "白蝦大隻5隻", Category: "seafood" },
  { Price: 350, menuItemName: "白蝦小隻", Category: "seafood" },
  { Price: 250, menuItemName: "干貝", Category: "seafood" },
  { Price: 600, menuItemName: "魚翅", Category: "seafood" },
  { Price: 158, menuItemName: "蟹肉", Category: "seafood" },

  // 鍋物 (hotpot)
  { Price: 750, menuItemName: "牛肉鍋", Category: "hotpot" },
  { Price: 650, menuItemName: "豬肉鍋", Category: "hotpot" },
  { Price: 900, menuItemName: "魚翅鍋", Category: "hotpot" },

  // 火鍋料 (hotpot_ingredients)
  { Price: 45, menuItemName: "鴨肉丸大顆", Category: "hotpot_ingredients" },
  { Price: 60, menuItemName: "蛋餃", Category: "hotpot_ingredients" },
  { Price: 110, menuItemName: "帝王蟹棒", Category: "hotpot_ingredients" },
  { Price: 45, menuItemName: "芋角貢丸", Category: "hotpot_ingredients" },
  { Price: 50, menuItemName: "花枝腸", Category: "hotpot_ingredients" },
  { Price: 60, menuItemName: "日本蝦球", Category: "hotpot_ingredients" },
  { Price: 50, menuItemName: "魚蛋腸", Category: "hotpot_ingredients" },
  { Price: 60, menuItemName: "魚卵蝦球", Category: "hotpot_ingredients" },
  { Price: 50, menuItemName: "蟹肉丸", Category: "hotpot_ingredients" },
  { Price: 50, menuItemName: "蔬菜豆腐正方形", Category: "hotpot_ingredients" },

  // 蔬菜 (vegetable)
  { Price: 40, menuItemName: "三角豆腐", Category: "vegetable" },
  { Price: 80, menuItemName: "蔬菜片", Category: "vegetable" },
  { Price: 80, menuItemName: "三角蔬菜豆腐", Category: "vegetable" },
  { Price: 40, menuItemName: "大甲芋頭", Category: "vegetable" }
];


const categoryMap = {
  hotpot: 1,
  meat: 2,
  seafood: 3,
  vegetable: 4,
  hotpot_ingredients: 5,
};

const menuItems = projectDataList.map(item => ({
  menuItemName: item.menuItemName,
  categoryId: categoryMap[item.Category],
  price: item.Price
}));

module.exports = { menuItems };
