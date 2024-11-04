// utils/errorHandler.js

/**
 * 全域錯誤處理中間件
 * @param {Error} err - 錯誤對象
 * @param {Object} req - 請求對象
 * @param {Object} res - 回應對象
 * @param {Function} next - 下一個中間件
 */
const errorHandler = (err, req, res, next) => {
  // 打印完整的錯誤堆疊訊息以便於調試
  console.error("Server Error:", err.stack);

  // 設定 HTTP 狀態碼和錯誤訊息
  const statusCode = err.statusCode || 500;
  const message = err.message || '伺服器錯誤';

  // 返回 JSON 格式的錯誤訊息
  res.status(statusCode).json({
      status: 'error',
      message: message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // 僅在開發環境返回錯誤堆疊訊息
  });
};

module.exports = errorHandler;
