// server.js
const express = require('express');
const { getLocalIPAddress, getPublicIP } = require('./script/getIPAddress.js');

// 啟動伺服器
module.exports = async (app, port) => {
    try {
        const localIP = getLocalIPAddress();
         // 等待公網 IP 地址的 Promise 解析
        const publicIP = await getPublicIP();

        app.listen(port, () => {
            console.log(`官方網站: http://localhost:${port}`);
            console.log(`局域網 IPv4 地址:  http://${localIP}:${port}`);
            if (publicIP) {
                console.log(`公網 IPv4 地址:  http://${publicIP}:${port}`);
            }
        });
    } catch (error) {
        console.error('獲取 IP 地址時發生錯誤: ', error);
    }
};
