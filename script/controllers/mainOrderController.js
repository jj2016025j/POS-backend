const mainOrderService = require('../services/mainOrderService');

module.exports = {
    async createMainOrder(req, res, next) {
        try {
            const result = await mainOrderService.createMainOrder(req.body);
            
            if (result.status === 'error') {
                return res.status(404).json({ message: result.message });
            }
            
            if (result.status === 'unavailable') {
                return res.status(400).json({ message: result.message });
            }

            // 訂單成功建立
            res.status(200).json(result.data);
        } catch (error) {
            console.error("Error in createMainOrder:", error);
            next(error);
        }
    },
    async getMainOrderInfo(req, res, next) {
        try {
            const mainOrder = await mainOrderService.getMainOrderInfo(req.body.MainOrderId);
            res.status(200).json(mainOrder);
        } catch (error) {
            console.error("Error in getMainOrderInfo:", error);
            next(error);
        }
    },

    async editMainOrder(req, res, next) {
        try {
            const updatedOrder = await mainOrderService.editMainOrder(req.body);
            res.status(200).json(updatedOrder);
        } catch (error) {
            console.error("Error in editOrder:", error);
            next(error);
        }
    },

    async getRecentOrders(req, res, next) {
        try {
            const recentOrders = await mainOrderService.getRecentOrders();
            res.status(200).json(recentOrders);
        } catch (error) {
            console.error("Error in getRecentOrders:", error);
            next(error);
        }
    }
};
