const { MenuItem, Category } = require('../database/models');

module.exports = {
    async getAllMenuItems(limit, order, categoryId) {
        const queryOptions = {
            include: {
                model: Category,
                attributes: ['Id'], // 只查詢 Category 的 ID
            },
            limit: parseInt(limit),
            order: [['MenuItemName', order.toUpperCase()]]
        };

        if (categoryId) {
            queryOptions.where = { CategoryId: categoryId };
        }

        const menuItems = await MenuItem.findAll(queryOptions);

        // 格式化返回的資料，將 Category 轉換為單一 ID
        return menuItems.map(item => {
            const itemData = item.toJSON(); // 轉為普通 JavaScript 對象
            itemData.Category = item.Category ? item.Category.Id : null; // 將 Category 對象轉換為 ID
            return itemData;
        });
    },

    async addNewMenuItem(data) {
        return await MenuItem.create(data);
    },

    async editMenuItem(data) {
        const { Id, ...updateData } = data;
        return await MenuItem.update(updateData, { where: { Id } });
    },

    async deleteMenuItem(menuItemId) {
        return await MenuItem.destroy({ where: { Id: menuItemId } });
    }
};
