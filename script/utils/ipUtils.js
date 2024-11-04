// ipUtils.js
const http = require('http');
const https = require('https');
const os = require('os');

/**
 * 獲取區域網 IP 地址
 * @returns {string|null} 區域網 IP 地址或 null
 */
function getLocalIPAddress() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const networkInterface = networkInterfaces[interfaceName];
        for (const networkAddress of networkInterface) {
            if (networkAddress.family === 'IPv4' && !networkAddress.internal) {
                return networkAddress.address;
            }
        }
    }
    return null;
}

/**
 * 獲取公網 IP 地址 (通過 http://ipinfo.io/ip)
 * 注意：如果有防火牆，可能會被阻擋
 * @returns {Promise<string>} 公網 IP 地址
 */
function getNetIPAddress() {
    return new Promise((resolve, reject) => {
        http.get('http://ipinfo.io/ip', (resp) => {
            let data = '';
            resp.on('data', (chunk) => { data += chunk; });
            resp.on('end', () => { resolve(data.trim()); });
        }).on("error", (err) => { reject(err); });
    });
}

/**
 * 獲取公網 IP 地址 (通過 https://api.ipify.org)
 * @returns {Promise<string>} 公網 IP 地址
 */
function getPublicIP() {
    return new Promise((resolve, reject) => {
        https.get('https://api.ipify.org/?format=json', (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const ipInfo = JSON.parse(data);
                    resolve(ipInfo.ip);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (e) => { reject(e); });
    });
}

// 導出函數
module.exports = { getLocalIPAddress, getNetIPAddress, getPublicIP };
