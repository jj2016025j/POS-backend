// data/tableData.js

/**
 * 生成桌子數據的函數
 * @param {number} count - 需要生成的桌子數量，默認為 30
 * @param {string} status - 每張桌子的初始狀態，默認為 '空桌'
 * @returns {Array} 桌子數據陣列
 */
const generateTables = (count = 30, status = '空桌') => {
    return Array.from({ length: count }, (_, i) => ({
        tableNumber: i + 1,
        tablesStatus: status
    }));
};

// 預設生成 30 張空桌
const tables = generateTables();

module.exports = { tables, generateTables };
