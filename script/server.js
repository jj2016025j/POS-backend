// server.js
const { getLocalIPAddress, getPublicIP } = require('./utils');
const net = require('net');

function checkPortAvailability(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`埠 ${port} 已被佔用`);
                resolve(false); // 埠被佔用
            } else {
                console.log(`埠 ${port} 出現錯誤:`, err);
                resolve(true); // 其他錯誤
            }
        });
        server.once('listening', () => {
            console.log(`埠 ${port} 可用`);
            server.close();
            resolve(true); // 埠可用
        });
        server.listen(port);
    });
}

module.exports = async (app, initialPort) => {

    console.log('伺服器啟動中...');

    try {
        console.log('開始檢查埠號...');
        let port = parseInt(initialPort, 10); // 將埠號字串轉換為數字
        if (isNaN(port)) {
            throw new Error(`無效的埠號: ${initialPort}`);
        }

        while (!(await checkPortAvailability(port))) {
            console.warn(`埠 ${port} 已被佔用，嘗試使用埠 ${port + 1}`);
            port += 1; // 埠被佔用，嘗試下一個埠
        }

        console.log(`最終選擇的埠號: ${port}`);

        const localIP = getLocalIPAddress();
        console.log(`本地 IP 獲取成功: ${localIP}`);
        const publicIP = await getPublicIP();
        console.log(`公網 IP 獲取成功: ${publicIP}\n`);

        app.listen(port, () => {
            console.log(`本地IP:            http://localhost:${port}`);
            console.log(`局域網 IPv4 地址:  http://${localIP}:${port}`);
            if (publicIP) {
                console.log(`公網 IPv4 地址:    http://${publicIP}:${port}`);
            }
        });
    } catch (error) {
        console.error('獲取 IP 地址時發生錯誤: ', error);
    }
};
