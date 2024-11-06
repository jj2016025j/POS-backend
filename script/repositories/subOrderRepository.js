const { SubOrder, MenuItem, SubOrderItems } = require('../database/models');

module.exports = {
    async createSubOrder(SubOrderId, MainOrderId) {
        return await SubOrder.create({
            SubOrderId,
            MainOrderId
        });
    },

    async getSubOrderInfo({ mainOrderId, subOrderId }) {
        if (mainOrderId) {
            return await SubOrder.findAll({
                where: { MainOrderId: mainOrderId },
                include: [MenuItem]
            });
        } else if (subOrderId) {
            return await SubOrder.findOne({
                where: { SubOrderId: subOrderId },
                include: [MenuItem]
            });
        }
        return null;
    },

    async findSubOrderById(subOrderId) {
        return await SubOrder.findByPk(subOrderId);
    },

    async editSubOrder({ subOrderId, OrderStatus, MenuItems }) {
        if (OrderStatus) {
            await SubOrder.update({ OrderStatus }, { where: { SubOrderId: subOrderId } });
        }

        for (const item of MenuItems) {
            const { menuItemId, quantity } = item;
            if (quantity === 0 || quantity === null || quantity === undefined) {
                await SubOrderItems.destroy({ where: { SubOrderId: subOrderId, MenuItemId: menuItemId } });
            } else {
                await SubOrderItems.update({ quantity }, { where: { SubOrderId: subOrderId, MenuItemId: menuItemId } });
            }
        }

        return { subOrderId, OrderStatus, MenuItems };
    },

    async deleteSubOrder(subOrderId) {
        const deletedRows = await SubOrder.destroy({ where: { SubOrderId: subOrderId } });
        return deletedRows ? { subOrderId } : null;
    }
};
