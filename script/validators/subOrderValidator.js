// validators/subOrderValidator.js
const Joi = require('joi');

const createSubOrderSchema = Joi.object({
    mainOrderId: Joi.string().required().messages({
        'string.base': 'mainOrderId 必須為字串',
        'any.required': '必須提供 mainOrderId'
    })
});

// 編輯子訂單驗證架構
const editSubOrderSchema = Joi.object({
    subOrderId: Joi.string().required().messages({
        'string.base': 'subOrderId 必須為字串',
        'any.required': '必須提供 subOrderId'
    }),
    orderStatus: Joi.string().valid('未製作', '製作中', '已完成', '已取消').optional(),
    menuItems: Joi.array().items(
        Joi.object({
            menuItemId: Joi.number().integer().required().messages({
                'number.base': 'menuItemId 必須為整數',
                'any.required': '必須提供 menuItemId'
            }),
            quantity: Joi.number().integer().min(0).allow(null).messages({
                'number.base': 'quantity 必須為整數',
                'number.min': 'quantity 不能為負數'
            })
        })
    ).required().messages({
        'array.base': 'menuItems 必須為陣列',
        'any.required': '必須提供 menuItems'
    })
});

// 查詢子訂單資訊驗證架構
const getSubOrderInfoSchema = Joi.object({
    mainOrderId: Joi.string().optional(), // 主訂單 ID 可選
    subOrderId: Joi.string().optional()    // 子訂單 ID 可選
}).or('mainOrderId', 'subOrderId')         // 至少有一個 ID 必須存在
    .messages({
        'object.missing': '必須提供 mainOrderId 或 subOrderId'
    });

// 刪除子訂單項目驗證架構
const deleteSubOrderSchema = Joi.object({
    subOrderId: Joi.string().required().messages({
        'string.base': 'subOrderId 必須為字串',
        'any.required': '必須提供 subOrderId'
    })
});

module.exports = {
    createSubOrderSchema,
    editSubOrderSchema,
    getSubOrderInfoSchema,
    deleteSubOrderSchema
};
