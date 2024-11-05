// controllers/subOrderController.js
const { SubOrder, MenuItem, SubOrderItems } = require('../database/models');
const {
    createSubOrderSchema,
    editSubOrderSchema,
    getSubOrderInfoSchema,
    deleteSubOrderSchema
} = require('../validators/subOrderValidator');
const { handleError } = require('../utils/errorHandler');
const { generateSubOrderId } = require('../utils');

module.exports = {
    // 建立子訂單
    async createSubOrder(req, res, next) {
        try {
            // 驗證請求參數
            const { error, value } = createSubOrderSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ status: 'error', message: error.details[0].message });
            }

            const subOrderId = generateSubOrderId();
            const { MainOrderId } = value;

            // 創建子訂單
            const subOrder = await SubOrder.create({
                SubOrderId: subOrderId,
                MainOrderId: MainOrderId
            });

            res.status(201).json(subOrder);
        } catch (error) {
            handleError(res, error, '建立子訂單失敗');
        }
    },

    // 根據子訂單 ID 查詢子訂單資訊
    async getSubOrderInfo(req, res, next) {
        try {
            const { error, value } = getSubOrderInfoSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ status: 'error', message: error.details[0].message });
            }

            const { mainOrderId, subOrderId } = value;

            let subOrders;

            if (mainOrderId) {
                // 查詢所有屬於該主訂單的子訂單
                subOrders = await SubOrder.findAll({
                    where: { MainOrderId: mainOrderId },
                    include: [MenuItem]
                });
            } else if (subOrderId) {
                // 查詢特定子訂單
                subOrders = await SubOrder.findOne({
                    where: { SubOrderId: subOrderId },
                    include: [MenuItem]
                });
                if (!subOrders) {
                    return res.status(404).json({ status: 'error', message: "找不到該子訂單" });
                }
            }

            if (!subOrders || (Array.isArray(subOrders) && subOrders.length === 0)) {
                return res.status(404).json({ status: 'error', message: "找不到相關訂單" });
            }

            res.status(200).json(subOrders);
        } catch (error) {
            handleError(res, error, '取得子訂單資訊失敗');
        }
    },

    // 編輯子訂單中的菜單項目
    async editSubOrder(req, res, next) {
        try {
            const { error, value } = editSubOrderSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { subOrderId, OrderStatus, MenuItems } = value;

            // 更新子訂單狀態（如果提供了 OrderStatus）
            if (OrderStatus) {
                await SubOrder.update(
                    { OrderStatus },
                    { where: { SubOrderId: subOrderId } }
                );
            }

            // 處理 MenuItems 陣列中的每一個項目
            for (const item of MenuItems) {
                const { menuItemId, quantity } = item;

                if (quantity === 0 || quantity === null || quantity === undefined) {
                    // 從 SubOrderItems 表中刪除該項目
                    await SubOrderItems.destroy({
                        where: { SubOrderId: subOrderId, MenuItemId: menuItemId }
                    });
                } else {
                    // 更新數量到 SubOrderItems 表
                    await SubOrderItems.update(
                        { quantity },
                        { where: { SubOrderId: subOrderId, MenuItemId: menuItemId } }
                    );
                }
            }

            res.status(200).json(value);
        } catch (error) {
            handleError(res, error, '更新子訂單失敗');
        }
    },

    // 刪除子訂單
    async deleteSubOrder(req, res, next) {
        try {
            const { error, value } = deleteSubOrderSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const deleted = await SubOrder.destroy({
                where: { SubOrderId: value.subOrderId } // 使用 SubOrderId 刪除子訂單
            });

            if (deleted) {
                res.status(200).json(value);
            } else {
                res.status(404).json({ message: '找不到該子訂單' });
            }
        } catch (error) {
            handleError(res, error, '刪除子訂單失敗');
        }
    }

};
