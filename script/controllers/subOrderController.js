const subOrderService = require('../services/subOrderService');
const { handleError } = require('../utils/errorHandler');

module.exports = {
    async createSubOrder(req, res, next) {
        try {
            const result = await subOrderService.createSubOrder(req.body);
            res.status(201).json(result);
        } catch (error) {
            handleError(res, error, '建立子訂單失敗');
        }
    },

    async getSubOrderInfo(req, res, next) {
        try {
            const result = await subOrderService.getSubOrderInfo(req.body);
            res.status(200).json(result);
        } catch (error) {
            handleError(res, error, '取得子訂單資訊失敗');
        }
    },

    // 送出子訂單（將狀態改為製作中）
    async submitSubOrder(req, res, next) {
        try {
            const { subOrderId } = req.body;
            const updatedSubOrder = await subOrderService.submitSubOrder(subOrderId);
            res.status(200).json({ message: '訂單已送出，狀態已更新為製作中', updatedSubOrder });
        } catch (error) {
            console.error("送出訂單失敗:", error);
            handleError(res, error, '送出訂單失敗');
        }
    },

    async editSubOrder(req, res, next) {
        try {
            const result = await subOrderService.editSubOrder(req.body);
            res.status(200).json(result);
        } catch (error) {
            handleError(res, error, '更新子訂單失敗');
        }
    },

    async deleteSubOrder(req, res, next) {
        try {
            const result = await subOrderService.deleteSubOrder(req.body.subOrderId);
            res.status(200).json(result);
        } catch (error) {
            handleError(res, error, '刪除子訂單失敗');
        }
    },
    
    // 取消子訂單（將狀態改為已取消）
    async cancelSubOrder(req, res, next) {
        try {
            const { subOrderId } = req.body;
            const canceledSubOrder = await subOrderService.cancelSubOrder(subOrderId);
            res.status(200).json({ message: '子訂單已取消', canceledSubOrder });
        } catch (error) {
            console.error("取消子訂單失敗:", error);
            handleError(res, error, '取消子訂單失敗');
        }
    },
};
