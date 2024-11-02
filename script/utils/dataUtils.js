// utils/dataUtils.js
const dayjs = require('dayjs');

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

module.exports = {
    getRandomNumber,
    generateDateArray,
    generateClassificationData,
    generateItemData,
    fillMissingDatesAndRandom
};
