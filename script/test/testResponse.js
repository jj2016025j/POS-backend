// test/testResponse.js
exports.sendTestResponse = (res, message = 'api test work') => {
    if (process.env.ONLY_API_TEST === 'true') {
        res.status(200).json({ message: message });
        return true; // 表示測試模式已返回，終止後續操作
    }
    return false; // 非測試模式，繼續執行後續邏輯
};
