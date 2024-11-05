// utils/errorHandler.js

/**
 * 全域錯誤處理中間件
 * @param {Error} err - 錯誤對象
 * @param {Object} req - 請求對象
 * @param {Object} res - 回應對象
 * @param {Function} next - 下一個中間件
 */// utils/errorHandler.js

// 通用錯誤處理函數
const handleError = (res, error, defaultMessage = '伺服器錯誤') => {
  console.error("操作失敗:", error);

  let statusCode = 500;
  let message = defaultMessage;

  if (error.name === 'SequelizeUniqueConstraintError') {
      statusCode = 409;
      message = '該項目已存在';
  } else if (error.details) {
      statusCode = 400;
      message = error.details[0].message;
  } else if (error.statusCode) {
      statusCode = error.statusCode;
      message = error.message;
  }

  // 回應錯誤資訊
  res.status(statusCode).json({
      status: 'error',
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

// 全域錯誤處理中間件
const errorHandler = (err, req, res, next) => {
  handleError(res, err, '伺服器錯誤');
};

module.exports = { handleError, errorHandler };
