const menuRepository = require('../repositories/menuRepository');
const { validateCreateMenuItem, validateEditMenuItem, validateDeleteMenuItem } = require('../validators/menuItemValidator');

module.exports = {
    async getAllMenuItems(query) {
        const { limit = 10, order = 'ASC', categoryId } = query;
        return await menuRepository.getAllMenuItems(limit, order, categoryId);
    },

    async addNewMenuItem(data) {
        const { error, value } = validateCreateMenuItem(data);
        if (error) throw new Error(error.details[0].message);
        
        return await menuRepository.addNewMenuItem(value);
    },

    async editMenuItem(data) {
        const { error, value } = validateEditMenuItem(data);
        if (error) throw new Error(error.details[0].message);

        return await menuRepository.editMenuItem(value);
    },

    async deleteMenuItem(menuItemId) {
        const { error } = validateDeleteMenuItem({ menuItemId });
        if (error) throw new Error(error.details[0].message);

        const deletedRows = await menuRepository.deleteMenuItem(menuItemId);
        if (deletedRows === 0) throw new Error("未找到需要刪除的記錄");
    },

    async getAllCategories() {
        return await menuRepository.getAllCategories();
    }
};
