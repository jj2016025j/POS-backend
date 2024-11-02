// controllers/orderController.js
const orderService = require('../services/orderService');
// const { printOrderWithQR, printOrder } = require('../utils/printUtils');
const getIp = require("../utils/getIPAddress");
const { sendTestResponse } = require('../test/testResponse');

const LocalIP = getIp.getLocalIPAddress();

exports.createNewOrder = async (req, res) => {
    if (sendTestResponse(res, '建立新訂單 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    const { TableNumber } = req.body;
    try {
        const MainOrderId = await orderService.generateMainOrderId();
        let tableInfo = await orderService.getTableInfoByTableNumber(TableNumber);

        if (tableInfo.TablesStatus !== "空桌") {
            return res.status(500).json({ message: "此桌目前已有訂單" });
        }

        await orderService.createMainOrder(MainOrderId, TableNumber);
        await orderService.updateTableInfo(TableNumber, "點餐中", MainOrderId);

        const fullUrl = `${req.protocol}://${LocalIP}:8080/pos/phone/${MainOrderId}`;
        console.log(`建立QRCODE: ${fullUrl}`);
        // await printOrderWithQR(fullUrl, MainOrderId, TableNumber);
        
        return res.status(200).json(await orderService.getTableInfoByMainOrderId(MainOrderId));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create new order" });
    }
};

exports.printQRCode = async (req, res) => {
    if (sendTestResponse(res, '列印QRCODE API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    const { MainOrderId, TableNumber } = req.body;
    const fullUrl = `${req.protocol}://${LocalIP}:3000/phoneorder/${MainOrderId}`;
    
    try {
        // await printOrderWithQR(fullUrl, MainOrderId, TableNumber);
        res.json({ message: "QR Code printed successfully" });
    } catch (error) {
        console.error("打印機未啟動或發生錯誤 :", error);
        res.status(500).json({ message: "打印失敗" });
    }
};

exports.getAllTableStatus = async (req, res) => {
    if (sendTestResponse(res, '取得各桌狀態 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    try {
        const allTableStatus = await orderService.getAllTableStatus();
        res.json(allTableStatus);
    } catch (error) {
        console.error("Failed to fetch table statuses:", error);
        res.status(500).json({ message: "取得所有桌號狀態失敗" });
    }
};

exports.getMainOrderInfo = async (req, res) => {
    if (sendTestResponse(res, '取得大訂單資訊 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    const mainOrderId = req.params.mainOrderId;
    try {
        const mainOrderInfo = await orderService.getMainOrderInfo(mainOrderId);
        res.json(mainOrderInfo);
    } catch (error) {
        console.error("Failed to fetch main order info:", error);
        res.status(500).json({ message: "Failed to fetch main order info" });
    }
};

exports.getRecentOrders = async (req, res) => {
    if (sendTestResponse(res, '取得近期訂單 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    try {
        const recentOrders = await orderService.getRecentOrders();
        res.json(recentOrders);
    } catch (error) {
        console.error("Failed to fetch recent orders:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.addSubOrder = async (req, res) => {
    if (sendTestResponse(res, '新增小訂單 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    const mainOrderId = req.params.mainOrderId;
    try {
        const subOrderId = await orderService.createSubOrder(mainOrderId);
        res.json({ subOrderId });
    } catch (error) {
        console.error("Failed to add sub order:", error);
        res.status(500).json({ message: "Failed to add sub order" });
    }
};

exports.submitSubOrder = async (req, res) => {
    if (sendTestResponse(res, '送出小訂單 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    const { SubOrder, SubOrderId } = req.body;

    try {
        await orderService.submitSubOrder(SubOrderId, SubOrder);

        const subOrderData = {
            SubOrderId,
            MenuItems: SubOrder.items.map(item => ({
                MenuItemName: item.menuItemName,
                quantity: item.quantity,
                unit_price: item.price,
                total_price: item.quantity * item.price
            })),
            subTotal: SubOrder.food_price,
            tax: SubOrder.service_fee,
            total: SubOrder.trade_amt,
        };

        // await printOrder(subOrderData);

        return res.status(200).json({ success: true, message: "SubOrder processed successfully." });
    } catch (error) {
        console.error("Failed to submit sub order:", error);
        return res.status(500).json({ error: "Failed to process SubOrder." });
    }
};

exports.cleanTable = async (req, res) => {
    if (sendTestResponse(res, '已清潔桌面 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    const { TableNumber, TablesStatus } = req.body;
    try {
        let tableInfo = await orderService.getTableInfoByTableNumber(TableNumber);

        if (!tableInfo) {
            return res.status(404).json({ message: "找不到指定桌號的資訊" });
        }

        await orderService.updateTableInfo(TableNumber, TablesStatus, "");

        tableInfo = await orderService.getTableInfoByTableNumber(TableNumber);
        return res.status(200).json(tableInfo);
    } catch (error) {
        console.error(`Failed to clean table ${TableNumber}:`, error);
        return res.status(500).json({ error: "服務器錯誤，更新桌子狀態失敗" });
    }
};

exports.deleteMenuItem = async (req, res) => {
    if (sendTestResponse(res, '移除訂單內品項 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    const { subOrderId, menuItemId } = req.body;
    try {
        await orderService.deleteMenuItemFromSubOrder(subOrderId, menuItemId);
        return res.status(200).json(true);
    } catch (error) {
        console.error("Failed to delete food item:", error);
        return res.status(400).json({ error });
    }
};

exports.getSubOrderInfo = async (req, res) => {
    if (sendTestResponse(res, '取得子訂單資訊 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    const subOrderId = req.params.subOrderId;
    try {
        const subOrderInfo = await orderService.getSubOrderInfo(subOrderId);
        res.json(subOrderInfo);
    } catch (error) {
        console.error("Failed to fetch sub order info:", error);
        res.status(400).json({ error });
    }
};

exports.editOrder = async (req, res) => {
    if (sendTestResponse(res, '編輯訂單 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    sendTestResponse(res, '沒有測試')
};

// exports.getMainAndSubOrder = async (req, res) => {
//     if (sendTestResponse(res, '取得所有訂單 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

//     const mainOrderId = req.params.mainOrderId;
//     try {
//         const result = await orderService.getMainAndSubOrder(mainOrderId);
//         res.json(result);
//     } catch (error) {
//         console.error("Failed to fetch main and sub order info:", error);
//         res.status(500).json({ message: "Failed to fetch main and sub order info" });
//     }
// };
