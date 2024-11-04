const { SubOrder, MenuItem } = require('../database/models');

module.exports = {
    // 建立子訂單
    async createSubOrder(req, res) {
        try {
            const { mainOrderId } = req.body;
            const subOrder = await SubOrder.create({ MainOrderId: mainOrderId });
            res.status(200).json({ subOrderId: subOrder.id });
        } catch (error) {
            console.error("建立子訂單失敗:", error);
            res.status(500).json({ message: "建立子訂單失敗", error });
        }
    },

    // 編輯子訂單中的菜單項目
    async editSubOrder(req, res) {
        try {
            const { subOrderId, menuItemId, quantity } = req.body;

            // 如果數量為 0 或未提供數量，則刪除該菜單項目
            if (!quantity || quantity === 0) {
                const deletedRows = await MenuItem.destroy({
                    where: { SubOrderId: subOrderId, Id: menuItemId },
                });
                if (deletedRows === 0) {
                    return res.status(404).json({ message: "找不到需要刪除的菜單項目" });
                }
                return res.status(200).json({ message: "餐點項目已成功刪除" });
            }

            // 否則，更新該菜單項目的數量
            const [updatedRows] = await MenuItem.update(
                { quantity }, // 更新數量
                { where: { SubOrderId: subOrderId, Id: menuItemId } }
            );

            if (updatedRows === 0) {
                return res.status(404).json({ message: "找不到需要更新的菜單項目" });
            }

            res.status(200).json({ message: "子訂單中的菜單項目已成功更新", quantity });
        } catch (error) {
            console.error("更新子訂單失敗:", error);
            res.status(500).json({ message: "更新子訂單時出錯", error });
        }
    },

    // 根據子訂單 ID 查詢子訂單資訊
    async getSubOrderInfo(req, res) {
        try {
            const { subOrderId } = req.body;
            const subOrder = await SubOrder.findOne({
                where: { id: subOrderId },
                include: [MenuItem],
            });
            if (!subOrder) {
                return res.status(404).json({ message: "找不到該子訂單" });
            }
            res.status(200).json(subOrder);
        } catch (error) {
            console.error("取得子訂單資訊失敗:", error);
            res.status(500).json({ message: "取得子訂單資訊時出錯", error });
        }
    },

    // 刪除子訂單中的餐點項目
    async deleteSubOrderItem(req, res) {
        try {
            const { subOrderItemId } = req.body;
            const deleted = await MenuItem.destroy({
                where: { id: subOrderItemId }
            });
            if (deleted) {
                res.status(200).json({ message: '餐點項目已成功刪除' });
            } else {
                res.status(404).json({ message: '找不到該餐點項目' });
            }
        } catch (error) {
            console.error("刪除餐點項目失敗:", error);
            res.status(500).json({ message: '刪除餐點項目時出錯', error });
        }
    }
};
