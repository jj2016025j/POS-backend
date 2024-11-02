// script/utils/errorHandler.js

/**
 * 錯誤處理中間件
 * @param {Error} err - 錯誤對象
 * @param {Object} req - 請求對象
 * @param {Object} res - 回應對象
 * @param {Function} next - 下一個中間件
 */
function errorHandler(err, req, res, next) {
    console.error("Server Error:", err.stack); // 打印完整的錯誤堆疊訊息，便於調試
  
    const statusCode = err.statusCode || 500; // 如果有指定的錯誤狀態碼，則使用它，否則預設為 500
    const message = err.message || '伺服器錯誤'; // 若無錯誤訊息，則使用預設錯誤訊息
  
    // 返回 JSON 格式的錯誤訊息
    res.status(statusCode).json({
      status: 'error',
      message: message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // 僅在開發環境返回錯誤堆疊訊息
    });
  }
  
  module.exports = errorHandler;
  