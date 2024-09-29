const express = require('express');
const router = express.Router();
const dbOperations = require('../../pos_mysql');
const dayjs = require('dayjs');

router.use(express.json());

router.get('/all', async (req, res) => {
    // 後臺數據
    // http://localhost:8080/data/all
    const SellData = await dbOperations.getBackEndData('all', 'all', 'month')
    res.json(SellData);
})

router.get('/lastMonth', async (req, res) => {
    // 獲取後臺資料 V
    // http://localhost:8080/data/lastMonth
    const SellData = await dbOperations.getBackEndData('lastMonth', 'byItem')
    res.json(SellData);
});

router.post('/', (req, res) => {
    const { startTime, endTime, statisticalContent } = req.body;

    // Log the received parameters
    console.log('Received parameters:');
    console.log('startTime:', startTime);
    console.log('endTime:', endTime);
    console.log('statisticalContent:', statisticalContent);

    const completeData = fillMissingDatesAndRandom([], startTime, endTime, statisticalContent);

    // Validate parameters (optional)
    if (!startTime || !endTime || !statisticalContent) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Process the request and send a response
    res.json(completeData);
});

module.exports = router;

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateDateArray = (startDate, endDate) => {
    let dateArray = [];
    let currentDate = dayjs(startDate);

    while (currentDate.isBefore(dayjs(endDate)) || currentDate.isSame(dayjs(endDate))) {
        dateArray.push(currentDate.format('YYYY-MM-DD'));
        currentDate = currentDate.add(1, 'day');
    }

    return dateArray;
};

const generateClassificationData = () => {
    const categories = ['Meat', 'Vegetables', 'Seafood', 'Drinks', 'Desserts'];
    return categories.map(category => ({
        categoryName: category,
        TotalQuantity: getRandomNumber(0, 100).toString(),
        TotalSales: getRandomNumber(0, 5000).toString()
    }));
};

const generateItemData = () => {
    const items = ['Beef', 'Pork', 'Cabbage', 'Shrimp', 'Coke', 'Ice Cream'];
    return items.map(item => ({
        itemName: item,
        TotalQuantity: getRandomNumber(0, 100).toString(),
        TotalSales: getRandomNumber(0, 5000).toString()
    }));
};

const fillMissingDates = (data, startDate, endDate) => {
    const completeDates = generateDateArray(startDate, endDate);
    const dataMap = new Map(data.map(item => [item.OrderDate, item]));

    return completeDates.map(date => {
        if (dataMap.has(date)) {
            return dataMap.get(date);
        } else {
            return {
                OrderDate: date,
                TotalQuantity: "0",
                TotalSales: "0"
            };
        }
    });
};

const fillMissingDatesAndRandom = (data, startDate, endDate, statisticalContent) => {
    const completeDates = generateDateArray(startDate, endDate);
    const dataMap = new Map(data.map(item => [item.OrderDate, item]));

    return completeDates.map(date => {
        if (dataMap.has(date)) {
            return dataMap.get(date);
        } else {
            if (statisticalContent === 'classification') {
                return {
                    OrderDate: date,
                    classification: generateClassificationData()
                };
            } else if (statisticalContent === 'items') {
                return {
                    OrderDate: date,
                    items: generateItemData()
                };
            } else {
                return {
                    OrderDate: date,
                    TotalQuantity: getRandomNumber(0, 100).toString(),
                    TotalSales: getRandomNumber(0, 5000).toString()
                };
            }
        }
    });
};
