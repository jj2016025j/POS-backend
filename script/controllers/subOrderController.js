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
    }
};
