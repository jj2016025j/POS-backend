const express = require('express');
const router = express.Router();
const axios = require("axios");
const hmacSHA256 = require("crypto-js/hmac-sha256");
const Base64 = require("crypto-js/enc-base64");
const dotenv = require("dotenv");
dotenv.config();

// console.log(LINEPAY_CHANNEL_ID, LINEPAY_RETURN_HOST, LINEPAY_SITE, LINEPAY_VERSION, LINEPAY_CHANNEL_SECRET_KEY, LINEPAY_RETURN_CONFIRM_URL, LINEPAY_RETURN_CANCEL_URL)
// 数据库连接配置
let pool
(async () => {
    pool = await dbOperations.getConnection()
})
const linePayService = require('../services/linePayService');
const dbOperations = require('../database/dbOperations');
const { printInvoice, convertToInvoiceFormat } = require('../printer');
const { TimeFormat } = require('../utils/timeFormatted.js');

// Cash checkout route
router.post('/cash/:order_id', async (req, res) => {
    try {
        const orderId = req.params['order_id'];
        const result = await dbOperations.processCashOrder(orderId);
        await printInvoice(result.invoiceData);
        res.status(200).send(true);
    } catch (error) {
        res.status(400).json({ error });
    }
});

// LinePay checkout route
router.post("/linepay/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const paymentUrl = await linePayService.initiatePayment(id);
        res.json({ paymentUrl });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Confirm LinePay payment
router.get("/lineConfirm", async (req, res) => {
    try {
        const { transactionId, orderId } = req.query;
        await linePayService.confirmPayment(transactionId, orderId);
        res.redirect(`/pay/success/${orderId}`);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});






router.get("/success/:orderId", async (req, res) => {
    const { orderId } = req.params;
    const [orders] = await pool.query(
        `SELECT id, trade_no, trade_amt FROM table_orders WHERE trade_no = ?`,
        [orderId]
    );

    await dbOperations.confirmPaymentByCash(orders[0].id);
    res.redirect("/pos");
});

// http://localhost:5000/pay/creditcard/:trade_no
router.post('/creditcard/:order_id', async (req, res) => {
    // const orderId = req.params['trade_no']
    const orderId = req.params['order_id']

    await dbOperations.confirmPaymentByCash(orderId)

    res.json(orderId);
})

router.post('/checkout/:mainOrderId', async (req, res) => {
    // 確認付款 UNDO 應該要改成function
    // http://localhost:8080/pay/checkout/ORD-1709679600000-3
    try {
        const MainOrderId = req.params['mainOrderId'];
        const MainOrderInfo = await dbOperations.getMainOrderInfoById(MainOrderId);
        console.log(MainOrderInfo)
        if (!MainOrderInfo) {
            return res.status(500).json({
                message: '此訂單不存在',
                MainOrderInfo: MainOrderInfo
            });

        } else if (MainOrderInfo.OrderStatus != "未結帳") {
            await dbOperations.editTableInfo(TableId, "清潔中", "")
            return res.status(200).json({
                message: `訂單 ${MainOrderId} 已結帳`,
                MainOrderInfo: MainOrderInfo
            });
        } else {
            const TableId = await dbOperations.getTableIdByMainOrderId(MainOrderId)
            console.log(TableId)
            await dbOperations.editTableInfo(TableId, "清潔中", "")
            const results = await dbOperations.editMainOrderStatus(MainOrderId, "已結帳")
            console.log(results)
            if (results) {
                return res.json({
                    message: `訂單 ${MainOrderId} 已完成結帳`
                });
            } else {
                return res.status(501).json({
                    message: `伺服器發生錯誤`
                });
            }
        }

    } catch {
        return res.status(501).json({
            message: `伺服器發生錯誤`
        });
    }
});

router.get('/cancelCheckout/:mainOrderId', async (req, res) => {
    // 取消付款
    // http://localhost:8080/pos/cancelCheckout/ORD-1709679600000-3
    const MainOrderId = req.params['mainOrderId'];
    const MainOrderInfo = await dbOperations.getMainOrderInfoById(MainOrderId);
    if (!MainOrderInfo || MainOrderInfo.OrderStatus != "已結帳") {
        return res.status(200).json({
            message: `此訂單 ${MainOrderId} 還未結帳！`,
            MainOrderInfo: MainOrderInfo
        });
    } else {
        const results = await dbOperations.editMainOrderStatus(MainOrderId, "未結帳")
        if (results) {
            return res.json({
                message: `訂單 ${MainOrderId} 已修改為未結帳`,
                MainOrderInfo: await dbOperations.getMainOrderInfoById(MainOrderId)
            });
        } else {
            return res.status(500).json({
                message: `伺服器發生錯誤`
            });
        }
    }
});

module.exports = router;
