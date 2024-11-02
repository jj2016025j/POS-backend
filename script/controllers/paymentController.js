// controllers/paymentController.js
const paymentService = require('../services/paymentService');
// const { printInvoice } = require('../utils/printUtils');
const { sendTestResponse } = require('../test/testResponse');

exports.cashCheckout = async (req, res) => {
    if (sendTestResponse(res, '結帳 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息
    
    try {
        const orderId = req.params.order_id;
        const result = await paymentService.processCashOrder(orderId);
        // await printInvoice(result.invoiceData);
        res.status(200).json(true);
    } catch (error) {
        console.error('Failed to process cash order:', error);
        res.status(400).json({ error });
    }
};

exports.initiateLinePay = async (req, res) => {
    if (sendTestResponse(res, '建立LINE PAY API測試成功')) return; // 若測試模式啟用，直接返回測試訊息
    
    try {
        const id = req.params.id;
        const paymentUrl = await paymentService.initiatePayment(id);
        res.json({ paymentUrl });
    } catch (error) {
        console.error('Failed to initiate LinePay:', error);
        res.status(500).send('Server Error');
    }
};

exports.confirmLinePay = async (req, res) => {
    if (sendTestResponse(res, '確認LINE PAY API測試成功')) return; // 若測試模式啟用，直接返回測試訊息
    
    try {
        const { transactionId, orderId } = req.query;
        await paymentService.confirmPayment(transactionId, orderId);
        res.redirect(`/pay/success/${orderId}`);
    } catch (error) {
        console.error('Failed to confirm LinePay:', error);
        res.status(500).send('Server Error');
    }
};

exports.successCheckout = async (req, res) => {
    if (sendTestResponse(res, '結帳? API測試成功')) return; // 若測試模式啟用，直接返回測試訊息
    
    try {
        const { orderId } = req.params;
        await paymentService.confirmPaymentByCash(orderId);
        res.redirect("/pos");
    } catch (error) {
        console.error('Failed to confirm payment by cash:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.creditCardCheckout = async (req, res) => {
    if (sendTestResponse(res, '信用卡 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息
    
    try {
        const orderId = req.params.order_id;
        await paymentService.confirmPaymentByCash(orderId);
        res.json({ orderId });
    } catch (error) {
        console.error('Failed to process credit card payment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.checkoutOrder = async (req, res) => {
    if (sendTestResponse(res, '莫名 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    try {
        const mainOrderId = req.params.mainOrderId;
        const result = await paymentService.checkoutMainOrder(mainOrderId);
        res.json(result);
    } catch (error) {
        console.error('Failed to checkout order:', error);
        res.status(500).json({ message: 'Failed to checkout order' });
    }
};

exports.cancelCheckout = async (req, res) => {
    if (sendTestResponse(res, '取消結帳 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    try {
        const mainOrderId = req.params.mainOrderId;
        const result = await paymentService.cancelCheckout(mainOrderId);
        res.json(result);
    } catch (error) {
        console.error('Failed to cancel checkout:', error);
        res.status(500).json({ message: 'Failed to cancel checkout' });
    }
};
