const { menuItem, Category } = require('../database/models');

module.exports = {
    async getAllMenuItems(limit, order, categoryId) {
        const queryOptions = {
            include: {
                model: Category,
                attributes: ['id'], // 只查詢 Category 的 ID
            },
            limit: parseInt(limit),
            order: [['menuItemName', order.toUpperCase()]]
        };

        if (categoryId) {
            queryOptions.where = { categoryId: categoryId };
        }

        const menuItems = await menuItem.findAll(queryOptions);

        // 格式化返回的資料，將 Category 轉換為單一 ID
        return menuItems.map(item => {
            const itemData = item.toJSON(); // 轉為普通 JavaScript 對象
            itemData.Category = item.Category ? item.Category.id : null; // 將 Category 對象轉換為 ID
            return itemData;
        });
    },

    async addNewMenuItem(data) {
        return await menuItem.create(data);
    },

    async editMenuItem(data) {
        const { id, ...updateData } = data;
        return await menuItem.update(updateData, { where: { id } });
    },

    async deleteMenuItem(menuItemId) {
        return await menuItem.destroy({ where: { id: menuItemId } });
    },

    async getAllCategories() {
        return await Category.findAll({
            attributes: ['id', 'categoryName', 'Description'] // 僅選擇必要的欄位
        });
    },
};
