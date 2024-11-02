// script/utils/sqlErrorHandler.js

/**
 * SQL 錯誤處理函數，用於精簡錯誤訊息
 * @param {Error} error - 原始 SQL 錯誤對象
 * @returns {Object} - 精簡後的錯誤資訊
 */
function sqlErrorHandler(error) {
    const simpleError = {
        message: '資料庫操作失敗',
        code: error.code || 'UNKNOWN_ERROR'
    };

    switch (error.code) {
        case 'ER_UNSUPPORTED_PS':
            simpleError.message = '不支援的操作：此命令無法在準備語句協議中執行';
            break;
        case 'ER_BAD_DB_ERROR':
            simpleError.message = '指定的資料庫不存在';
            break;
        case 'ER_ACCESS_DENIED_ERROR':
            simpleError.message = '資料庫訪問被拒絕，請檢查帳號和密碼';
            break;
        case 'ER_PARSE_ERROR':
            simpleError.message = 'SQL 語法錯誤';
            break;
        case 'ER_DUP_ENTRY':
            simpleError.message = '重複的數據，已存在相同的條目';
            break;
        default:
            simpleError.message = error.sqlMessage || '未知的資料庫錯誤';
    }

    // 可選：如果是開發環境，則顯示更多堆疊細節
    if (process.env.NODE_ENV === 'development') {
        simpleError.details = {
            sql: error.sql, 
            // sqlState: error.sqlState, 
            // stack: error.stack 
        };
    }

    return simpleError;
}

module.exports = sqlErrorHandler;
