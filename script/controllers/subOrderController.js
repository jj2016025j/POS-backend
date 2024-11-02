// services/subOrderController.js
const { SubOrder, MenuItem } = require('../database/models');

module.exports = {
    // 建立子訂單
    async createSubOrder(mainOrderId) {
        const subOrder = await SubOrder.create({ MainOrderId: mainOrderId });
        return subOrder.id;
    },

    // 提交子訂單
    async submitSubOrder(subOrderId, subOrder) {
        await SubOrder.update(subOrder, { where: { id: subOrderId } });
    },

    // 子訂單中的菜單項目
    async editSubOrder(subOrderId, menuItemId) {
        return await MenuItem.destroy({
            where: { SubOrderId: subOrderId, Id: menuItemId },
        });
    },

    // 根據子訂單 ID 查詢子訂單資訊
    async getSubOrderInfo(subOrderId) {
        return await SubOrder.findOne({
            where: { id: subOrderId },
            include: [MenuItem],
        });
    }
};
