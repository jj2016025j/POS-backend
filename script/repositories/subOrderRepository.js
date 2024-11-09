const { SubOrder, MenuItem, SubOrderItems } = require('../database/models');

module.exports = {
    async createSubOrder(SubOrderId, MainOrderId) {
        return await SubOrder.create({
            SubOrderId,
            MainOrderId
        });
    },

    async getSubOrderInfo({ mainOrderId, subOrderId }) {
        const queryOptions = {
            include: [
                {
                    model: MenuItem,
                    attributes: ['MenuItemName', 'price'],
                    through: {
                        model: SubOrderItems,
                        attributes: ['quantity']
                    }
                }
            ]
        };

        if (mainOrderId) {
            queryOptions.where = { MainOrderId: mainOrderId };
            const subOrders = await SubOrder.findAll(queryOptions);
            console.log(subOrders[0].toJSON().MenuItems)
            return subOrders.map(subOrder => ({
                ...subOrder.toJSON(),
                MenuItems: subOrder.MenuItems.map(item => ({
                    MenuItemName: item.MenuItemName,
                    price: item.price,
                    quantity: item.SubOrderItems.quantity 
                }))
            }));
        } else if (subOrderId) {
            queryOptions.where = { SubOrderId: subOrderId };
            const subOrder = await SubOrder.findOne(queryOptions);
            if (!subOrder) return null;

            return {
                ...subOrder.toJSON(),
                MenuItems: subOrder.MenuItems.map(item => ({
                    MenuItemName: item.MenuItemName,
                    price: item.price,
                    quantity: item.SubOrderItems.quantity 
                }))
            };
        }

        return null;
    },

    async findSubOrderById(subOrderId) {
        return await SubOrder.findByPk(subOrderId);
    },


    async findSubOrdersByMainOrderId(mainOrderId) {
        return await SubOrder.findAll({ where: { MainOrderId: mainOrderId } });
    },

    async editSubOrder({ subOrderId, OrderStatus, MenuItems }) {
        // 更新子訂單的狀態（如果提供了 OrderStatus）
        if (OrderStatus) {
            await SubOrder.update({ OrderStatus }, { where: { SubOrderId: subOrderId } });
        }

        for (const item of MenuItems) {
            const { menuItemId, quantity } = item;

            if (quantity === 0 || quantity === null || quantity === undefined) {
                // 刪除項目
                await SubOrderItems.destroy({
                    where: { SubOrderId: subOrderId, MenuItemId: menuItemId }
                });
            } else {
                // 檢查是否存在該子訂單項目
                const existingItem = await SubOrderItems.findOne({
                    where: { SubOrderId: subOrderId, MenuItemId: menuItemId }
                });

                if (existingItem) {
                    // 如果已經存在，更新數量
                    await SubOrderItems.update(
                        { quantity },
                        { where: { SubOrderId: subOrderId, MenuItemId: menuItemId } }
                    );
                } else {
                    // 如果不存在，則新增項目
                    await SubOrderItems.create({
                        SubOrderId: subOrderId,
                        MenuItemId: menuItemId,
                        quantity
                    });
                }
            }
        }

        return { subOrderId, OrderStatus, MenuItems };
    },

    async deleteSubOrder(subOrderId) {
        const deletedRows = await SubOrder.destroy({ where: { SubOrderId: subOrderId } });
        return deletedRows ? { subOrderId } : null;
    },
    
    async calculateTotalAmount(subOrderId) {
        const items = await SubOrderItems.findAll({
            where: { SubOrderId: subOrderId },
            include: [
                {
                    model: MenuItem,
                    as: 'MenuItem', // 指定別名
                    attributes: ['price']
                }
            ]
        });
    
        return items.reduce((total, item) => {
            return total + (item.quantity * item.MenuItem.price);
        }, 0);
    },
        
    async deleteSubOrder(subOrderId) {
        const deletedRows = await SubOrder.destroy({ where: { SubOrderId: subOrderId } });
        return deletedRows ? { subOrderId } : null;
    },

    async updateSubOrderTotal(subOrderId, totalAmount) {
        await SubOrder.update({ totalAmount }, { where: { SubOrderId: subOrderId } });
    },

    async getPendingOrders() {
        return await SubOrder.findAll({ where: { status: '製作中' } });
    },

    async findOrderById(orderId) {
        return await SubOrder.findOne({ where: { id: orderId } });
    }
};
