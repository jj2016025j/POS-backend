const subOrderRepository = require('../repositories/subOrderRepository');
const { generateSubOrderId } = require('../utils');
const {
    createSubOrderSchema,
    editSubOrderSchema,
    getSubOrderInfoSchema,
    deleteSubOrderSchema
} = require('../validators/subOrderValidator');

module.exports = {
    async createSubOrder(data) {
        const { error, value } = createSubOrderSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const subOrderId = generateSubOrderId();
        return await subOrderRepository.createSubOrder(subOrderId, value.MainOrderId);
    },

    async getSubOrderInfo(data) {
        const { error, value } = getSubOrderInfoSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return await subOrderRepository.getSubOrderInfo(value);
    },
    
    async submitSubOrder(subOrderId) {
        // 查詢子訂單是否存在
        const subOrder = await subOrderRepository.findSubOrderById(subOrderId);
        if (!subOrder) {
            throw new Error(`子訂單 ${subOrderId} 不存在`);
        }

        // 更新訂單狀態為製作中
        subOrder.status = '製作中';
        await subOrder.save();

        return subOrder;
    },

    async editSubOrder(data) {
        const { error, value } = editSubOrderSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return await subOrderRepository.editSubOrder(value);
    },

    async deleteSubOrder(subOrderId) {
        const { error } = deleteSubOrderSchema.validate({ subOrderId });
        if (error) {
            throw new Error(error.details[0].message);
        }
        return await subOrderRepository.deleteSubOrder(subOrderId);
    },
    
    async cancelSubOrder(subOrderId) {
        // 查詢子訂單是否存在
        const subOrder = await subOrderRepository.findSubOrderById(subOrderId);
        if (!subOrder) {
            throw new Error(`子訂單 ${subOrderId} 不存在`);
        }

        // 更新訂單狀態為已取消
        subOrder.status = '已取消';
        await subOrder.save();

        return subOrder;
    },

    async getPendingOrders() {
        // 取得所有待處理的訂單
        return await Order.findAll({ where: { status: '製作中' } });
    },

    async updateOrderStatus(orderId, status) {
        const order = await Order.findOne({ where: { id: orderId } });
        if (!order) {
            throw new Error('找不到該訂單');
        }
        order.status = status;
        await order.save();
        return order;
    }
};
