const { randomDate, randomIntFromInterval } = require('./randomUtils');
const fileUtils = require('./fileUtils'); // 假設用於文件上傳的工具

const orderUtils = {
    /**
     * 生成唯一的訂單 ID
     * @returns {string} 訂單 ID
     */
    generateOrderId() {
        return 'ORD' + Date.now() + Math.random().toString(36).substring(2, 15);
    },

    /**
     * 生成交易編號
     * @returns {string} 交易編號
     */
    generateTradeNo() {
        return 'ORD' + Date.now() + Math.random().toString(36).substring(4);
    },

    /**
     * 隨機生成 1 到指定數字範圍的整數
     * @param {number} max - 數字範圍的最大值
     * @returns {number} 隨機生成的整數
     */
    random(max) {
        return Math.floor(Math.random() * max) + 1;
    },

    /**
     * 生成指定數量的隨機訂單數據
     * @param {string} startDateStr - 起始日期
     * @param {string} endDateStr - 結束日期
     * @param {number} tableCount - 桌位數量
     * @param {number} orderCount - 訂單數量
     * @param {Array} projectDataList - 菜單項目數據列表
     * @param {Object} itemQuantityRange - 菜單項目數量範圍
     * @param {Object} itemTypesRange - 訂單中菜單項目類型範圍
     * @returns {Array} 隨機生成的訂單數據
     */
    generateRandomOrders(startDateStr, endDateStr, tableCount, orderCount, projectDataList, itemQuantityRange, itemTypesRange) {
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        const orders = [];

        for (let i = 0; i < orderCount; i++) {
            const orderDate = randomDate(startDate, endDate);
            const tableId = randomIntFromInterval(1, tableCount);
            let subTotal = 0;

            const itemsCount = randomIntFromInterval(itemTypesRange.min, itemTypesRange.max);
            const orderMappings = [];

            for (let j = 0; j < itemsCount; j++) {
                const menuItem = projectDataList[Math.floor(Math.random() * projectDataList.length)];
                const quantity = randomIntFromInterval(itemQuantityRange.min, itemQuantityRange.max);
                const total_price = menuItem.Price * quantity;

                orderMappings.push({
                    MenuItemName: menuItem.MenuItemName,
                    Category: menuItem.Category,
                    MenuItemId: j + 1, // 假設 MenuItemId
                    quantity,
                    unit_price: menuItem.Price,
                    total_price,
                });

                subTotal += total_price;
            }

            const serviceFee = Math.round(subTotal * 0.1);
            const total = subTotal + serviceFee;
            const MainOrderId = `ORD-${orderDate.getTime()}-${i}`;

            orders.push({
                MainOrderId,
                TableId: tableId,
                SubTotal: subTotal,
                ServiceFee: serviceFee,
                Total: total,
                OrderStatus: "未結帳",
                CreateTime: orderDate.toISOString().replace('T', ' ').slice(0, 19),
                OrderMappings: orderMappings,
            });
        }

        return orders;
    },

    /**
     * 獲取生成的隨機訂單
     * @returns {Array} 隨機生成的訂單數據
     */
    getGeneratedOrders() {
        const menuItemsData = require("../data/fangsFoodData.js");
        const itemQuantityRange = { min: 1, max: 3 };
        const itemTypesRange = { min: 2, max: 10 };

        return this.generateRandomOrders(
            '2024-03-01', new Date(), 20, 100, menuItemsData, itemQuantityRange, itemTypesRange
        );
    },

    /**
     * 創建食品條目
     * @param {Object} formData - 表單數據
     * @param {Object} imageFile - 圖片文件
     * @param {Object} db - 數據庫對象
     * @returns {Promise} - 創建的食品條目數據
     */
    async createFoodEntry(formData, imageFile, db) {
        const imageName = await fileUtils.uploadImage(imageFile, './public/uploads/foods');
        const imagePath = '/uploads/foods/' + imageName;
        return db.query(
            'INSERT INTO foods (name, price, category_id, image_url) VALUES(?,?,?,?)',
            [formData['item-name'], formData['item-price'], formData['select-type'], imagePath]
        );
    },
};

module.exports = orderUtils;
