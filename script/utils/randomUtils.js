// utils/randomUtils.js

/**
 * 生成從 min 到 max 的隨機整數
 */
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成1~lastNumber的隨機整數
 */
function random(lastNumber) {
    return Math.floor(Math.random() * lastNumber) + 1;
}

/**
 * 在指定的日期範圍內生成隨機日期
 */
function randomDate(startDate, endDate) {
    const date = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    date.setMinutes(0, 0, 0); // 將分鐘和秒都設置為0
    return date;
}

module.exports = { randomIntFromInterval, random, randomDate };
