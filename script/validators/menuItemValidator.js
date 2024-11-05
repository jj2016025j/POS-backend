// validators/menuItemValidator.js
const Joi = require('joi');

// 創建菜單項目的驗證規則
const createMenuItemSchema = Joi.object({
    MenuItemName: Joi.string().required().messages({
        'string.empty': '菜單項目名稱不能為空',
        'any.required': '必須提供菜單項目名稱'
    }),
    CategoryId: Joi.number().integer().required().messages({
        'number.base': 'CategoryId 必須為整數',
        'any.required': '必須提供 CategoryId'
    }),
    Price: Joi.number().integer().min(0).required().messages({
        'number.base': '價格必須為整數',
        'number.min': '價格不能為負數',
        'any.required': '必須提供價格'
    }),
    image_url: Joi.string().uri().optional().allow(null),
    Insupply: Joi.boolean().optional()
});

// 編輯菜單項目的驗證規則
const editMenuItemSchema = Joi.object({
    Id: Joi.number().integer().required().messages({
        'number.base': 'Id 必須為整數',
        'any.required': '必須提供 Id'
    }),
    MenuItemName: Joi.string().optional().allow(null).messages({
        'string.base': '菜單項目名稱必須是字串'
    }),
    Price: Joi.number().integer().min(0).optional().allow(null).messages({
        'number.base': '價格必須為整數',
        'number.min': '價格不能為負數'
    }),
    CategoryId: Joi.number().integer().optional().allow(null).messages({
        'number.base': 'CategoryId 必須為整數'
    }),
    image_url: Joi.string().uri().optional().allow(null),
    Insupply: Joi.boolean().optional().allow(null)
});

const deleteMenuItemSchema = Joi.object({
    menuItemId: Joi.number().integer().required().messages({
        'number.base': 'menuItemId 必須為整數',
        'any.required': '必須提供 menuItemId'
    })
});

// 驗證函數
const validateCreateMenuItem = (data) => createMenuItemSchema.validate(data);
const validateEditMenuItem = (data) => editMenuItemSchema.validate(data);
const validateDeleteMenuItem = (data) => deleteMenuItemSchema.validate(data);

module.exports = { validateCreateMenuItem, validateEditMenuItem, validateDeleteMenuItem  };
