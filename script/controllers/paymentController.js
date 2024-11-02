// services/paymentController.js
const { MainOrder, Table, Order } = require('../models');
const { initiateLinePayTransaction, confirmLinePayTransaction } = require('../utils/linePayUtils');

module.exports = {
    // 現金結帳處理，生成發票
    async processCashOrder(orderId) {
        const mainOrder = await MainOrder.findByPk(orderId);
        if (!mainOrder) {
            throw new Error(`Order ${orderId} does not exist`);
        }
        mainOrder.OrderStatus = "已結帳";
        await mainOrder.save();
        return { invoiceData: mainOrder };
    },

    // 發起 Line Pay 支付
    async initiatePayment(id) {
        return await initiateLinePayTransaction(id);
    },

    // 確認 Line Pay 支付
    async confirmPayment(transactionId, orderId) {
        await confirmLinePayTransaction(transactionId, orderId);
        const order = await MainOrder.findByPk(orderId);
        if (order) {
            order.OrderStatus = "已結帳";
            await order.save();
        }
    },

    // 確認現金支付
    async confirmPaymentByCash(orderId) {
        const mainOrder = await MainOrder.findByPk(orderId);
        if (!mainOrder) {
            throw new Error(`Order ${orderId} does not exist`);
        }
        mainOrder.OrderStatus = "已結帳";
        await mainOrder.save();
        return mainOrder;
    },

    // 主訂單結帳
    async checkoutMainOrder(mainOrderId) {
        const mainOrder = await MainOrder.findByPk(mainOrderId, { include: Table });
        if (!mainOrder) {
            throw new Error(`Order ${mainOrderId} does not exist`);
        }

        if (mainOrder.OrderStatus === "已結帳") {
            await Table.update({ TablesStatus: "清潔中", MainOrderId: null }, { where: { Id: mainOrder.TableId } });
            return { message: `訂單 ${mainOrderId} 已結帳`, mainOrder };
        }

        await Table.update({ TablesStatus: "清潔中", MainOrderId: null }, { where: { Id: mainOrder.TableId } });
        mainOrder.OrderStatus = "已結帳";
        await mainOrder.save();

        return { message: `訂單 ${mainOrderId} 已完成結帳`, mainOrder };
    },

    // 取消結帳
    async cancelCheckout(mainOrderId) {
        const mainOrder = await MainOrder.findByPk(mainOrderId);
        if (!mainOrder || mainOrder.OrderStatus !== "已結帳") {
            return { message: `此訂單 ${mainOrderId} 還未結帳！` };
        }

        mainOrder.OrderStatus = "未結帳";
        await mainOrder.save();

        return { message: `訂單 ${mainOrderId} 已修改為未結帳`, mainOrder };
    },

    // Controller 用於現金結帳的 API 實現
    async cashCheckout(req, res) {
        try {
            const order = await Order.findByPk(req.params.order_id);
            if (!order) return res.status(404).json({ error: 'Order not found' });
            order.status = "已結帳";
            await order.save();
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: 'Failed to process cash order' });
        }
    },

    // Controller 用於發起 Line Pay 支付的 API 實現
    async initiateLinePay(req, res) {
        try {
            const paymentUrl = await this.initiatePayment(req.params.id);
            res.json({ paymentUrl });
        } catch (error) {
            res.status(500).send('Server Error');
        }
    }
};
