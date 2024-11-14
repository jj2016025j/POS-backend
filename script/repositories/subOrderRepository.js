const { subOrder, menuItem, subOrderItems } = require('../database/models');

module.exports = {
    async createSubOrder(subOrderId, mainOrderId) {
        return await subOrder.create({
            subOrderId,
            mainOrderId
        });
    },

    async getSubOrderInfo({ mainOrderId, subOrderId }) {
        const queryOptions = {
            include: [
                {
                    model: menuItem,
                    attributes: ['menuItemName', 'price'],
                    through: {
                        model: subOrderItems,
                        attributes: ['quantity']
                    }
                }
            ]
        };

        if (mainOrderId) {
            queryOptions.where = { mainOrderId: mainOrderId };
            const subOrders = await subOrder.findAll(queryOptions);
            console.log(subOrders[0].toJSON().menuItems)
            return subOrders.map(subOrder => ({
                ...subOrder.toJSON(),
                menuItems: subOrder.menuItems.map(item => ({
                    menuItemName: item.menuItemName,
                    price: item.price,
                    quantity: item.subOrderItems.quantity 
                }))
            }));
        } else if (subOrderId) {
            queryOptions.where = { subOrderId: subOrderId };
            const subOrder = await subOrder.findOne(queryOptions);
            if (!subOrder) return null;

            return {
                ...subOrder.toJSON(),
                menuItems: subOrder.menuItems.map(item => ({
                    menuItemName: item.menuItemName,
                    price: item.price,
                    quantity: item.subOrderItems.quantity 
                }))
            };
        }

        return null;
    },

    async findSubOrderById(subOrderId) {
        return await subOrder.findByPk(subOrderId);
    },


    async findSubOrdersByMainOrderId(mainOrderId) {
        return await subOrder.findAll({ where: { mainOrderId: mainOrderId } });
    },

    async editSubOrder({ subOrderId, orderStatus, menuItems }) {
        // 更新子訂單的狀態（如果提供了 orderStatus）
        if (orderStatus) {
            await subOrder.update({ orderStatus }, { where: { subOrderId: subOrderId } });
        }

        for (const item of menuItems) {
            const { menuItemId, quantity } = item;

            if (quantity === 0 || quantity === null || quantity === undefined) {
                // 刪除項目
                await subOrderItems.destroy({
                    where: { subOrderId: subOrderId, menuItemId: menuItemId }
                });
            } else {
                // 檢查是否存在該子訂單項目
                const existingItem = await subOrderItems.findOne({
                    where: { subOrderId: subOrderId, menuItemId: menuItemId }
                });

                if (existingItem) {
                    // 如果已經存在，更新數量
                    await subOrderItems.update(
                        { quantity },
                        { where: { subOrderId: subOrderId, menuItemId: menuItemId } }
                    );
                } else {
                    // 如果不存在，則新增項目
                    await subOrderItems.create({
                        subOrderId: subOrderId,
                        menuItemId: menuItemId,
                        quantity
                    });
                }
            }
        }

        return { subOrderId, orderStatus, menuItems };
    },

    async deleteSubOrder(subOrderId) {
        const deletedRows = await subOrder.destroy({ where: { subOrderId: subOrderId } });
        return deletedRows ? { subOrderId } : null;
    },
    
    async calculateTotalAmount(subOrderId) {
        const items = await subOrderItems.findAll({
            where: { subOrderId: subOrderId },
            include: [
                {
                    model: menuItem,
                    as: 'menuItem', // 指定別名
                    attributes: ['price']
                }
            ]
        });
    
        return items.reduce((total, item) => {
            return total + (item.quantity * item.menuItem.price);
        }, 0);
    },
        
    async deleteSubOrder(subOrderId) {
        const deletedRows = await subOrder.destroy({ where: { subOrderId: subOrderId } });
        return deletedRows ? { subOrderId } : null;
    },

    async updateSubOrderTotal(subOrderId, totalAmount) {
        await subOrder.update({ totalAmount }, { where: { subOrderId: subOrderId } });
    },

    async getPendingOrders() {
        return await subOrder.findAll({ where: { status: '製作中' } });
    },

    async findOrderById(orderId) {
        return await subOrder.findOne({ where: { id: orderId } });
    }
};
