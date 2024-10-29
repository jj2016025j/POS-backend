const pool = require('./connection');
const fs = require('fs').promises;
const path = require('path');
const itemData = require('../data/fangsFoodData.js');

// 定義類別映射
const categoryMap = {
    "hotpot": 1,
    "meat": 2,
    "seafood": 3,
    "vegetable": 4,
    "dumplings": 5
};

// 插入分類資料
async function insertCategoryData() {
    const sql = `
        INSERT INTO foods_category (category, sort) VALUES 
        ('鍋類', 1), 
        ('肉類', 2), 
        ('海鮮類', 3), 
        ('蔬菜類', 4), 
        ('火鍋餃類', 5)
    `;
    await pool.query(sql);
    console.log('Category data inserted');
}

// 複製圖片並更新圖片路徑
async function copyImageAndUpdatePath(item) {
    const originalImagePath = path.join(__dirname, '..', item.img);
    const newImageName = path.basename(item.img);
    const newImagePath = path.join(__dirname, '..', 'public', 'images', newImageName);

    try {
        await fs.copyFile(originalImagePath, newImagePath);
        return '/images/' + newImageName;
    } catch (error) {
        console.error(`Error copying file: ${error}`);
        return '';
    }
}

// 處理項目資料並插入
async function processItemsAndInsert(items) {
    for (const item of items) {
        const newImgPath = await copyImageAndUpdatePath(item);
        item.img = newImgPath || item.img;
    }

    for (const item of items) {
        const categoryId = categoryMap[item.category];
        await pool.query(
            `INSERT INTO foods (name, category_id, price, image_url, sort) VALUES (?, ?, ?, ?, ?)`,
            [item.name, categoryId, item.price, item.img, item.sort || 0]
        );
    }

    console.log('Items data inserted');
}

(async function() {
    await insertCategoryData();
    await processItemsAndInsert(itemData);
})();
