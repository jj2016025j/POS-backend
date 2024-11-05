// controllers/menuController.js
const { MenuItem, Category } = require('../database/models');
const { validateCreateMenuItem, validateEditMenuItem, validateDeleteMenuItem } = require('../validators/menuItemValidator');

const getAllMenuItems = async (req, res, next) => {
    try {
        // 支持可選的查詢參數
        const { limit = 10, order = 'ASC', categoryId } = req.query;

        // 構建查詢條件
        const queryOptions = {
            include: Category,
            limit: parseInt(limit), // 限制返回數量
            order: [['MenuItemName', order.toUpperCase()]], // 支持排序
        };

        // 如果有 categoryId，則添加篩選條件
        if (categoryId) {
            queryOptions.where = { CategoryId: categoryId };
        }

        const menuItems = await MenuItem.findAll(queryOptions);

        // 統一回應結構
        res.status(200).json(menuItems);
    } catch (error) {
        handleError(res, error, '取得菜單項目失敗');
    }
};

const addNewMenuItem = async (req, res, next) => {
    try {
        // 驗證請求數據
        const { error, value } = validateCreateMenuItem(req.body);
        if (error) {
            const validationError = new Error(error.details[0].message);
            validationError.statusCode = 400;
            return next(validationError);
        }

        // 創建菜單項目
        const menuItem = await MenuItem.create(value);

        // 檢查創建結果
        if (!menuItem) {
            const creationError = new Error('無法創建菜單項目，請重試');
            creationError.statusCode = 500;
            return next(creationError);
        }

        res.status(201).json(menuItem);
    } catch (error) {
        next(error);
    }
};

const editMenuItem = async (req, res, next) => {
    try {
        // 驗證請求數據
        const { error, value } = validateEditMenuItem(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { Id } = value;

        // 檢查是否存在該記錄
        const menuItem = await MenuItem.findByPk(Id);
        if (!menuItem) {
            return res.status(404).json({ error: "未找到需要更新的記錄" });
        }

        // 執行更新操作
        await MenuItem.update(value, { where: { Id } });

        res.status(200).json(value);
    } catch (error) {
        console.error("更新菜單項目失敗:", error);
        next(error); // 將錯誤傳遞給全域錯誤處理中間件
    }
};

const deleteMenuItem = async (req, res, next) => {
    try {
        // 驗證請求數據
        const { error, value } = validateDeleteMenuItem(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { menuItemId } = value;

        // 執行刪除操作
        const deletedRows = await MenuItem.destroy({
            where: { Id: menuItemId }
        });

        // 判斷刪除結果
        if (deletedRows === 0) {
            return res.status(404).json({ error: "未找到需要刪除的記錄" });
        }

        res.status(200).json({ message: "刪除成功" });
    } catch (error) {
        handleError(res, error, '刪除菜單項目失敗');
    }
};
// 導出為物件
module.exports = {
    getAllMenuItems,
    addNewMenuItem,
    editMenuItem,
    deleteMenuItem
};
