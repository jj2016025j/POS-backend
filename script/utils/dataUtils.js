// utils/dataUtils.js
const dayjs = require('dayjs');

const dataUtils = {
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  },

  generateDateArray(startDate, endDate) {
    let dateArray = [];
    let currentDate = dayjs(startDate);
    while (currentDate.isBefore(dayjs(endDate)) || currentDate.isSame(dayjs(endDate))) {
      dateArray.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }
    return dateArray;
  },

  generateClassificationData() {
    const categories = ['Meat', 'Vegetables', 'Seafood', 'Drinks', 'Desserts'];
    return categories.map(category => ({
      categoryName: category,
      TotalQuantity: this.getRandomNumber(0, 100).toString(),
      TotalSales: this.getRandomNumber(0, 5000).toString(),
    }));
  },

  generateItemData() {
    const items = ['Beef', 'Pork', 'Cabbage', 'Shrimp', 'Coke', 'Ice Cream'];
    return items.map(item => ({
      itemName: item,
      TotalQuantity: this.getRandomNumber(0, 100).toString(),
      TotalSales: this.getRandomNumber(0, 5000).toString(),
    }));
  },

  fillMissingDatesAndRandom(data, startDate, endDate, statisticalContent) {
    const completeDates = this.generateDateArray(startDate, endDate);
    const dataMap = new Map(data.map(item => [item.OrderDate, item]));
    return completeDates.map(date => {
      if (dataMap.has(date)) {
        return dataMap.get(date);
      } else {
        if (statisticalContent === 'classification') {
          return { OrderDate: date, classification: this.generateClassificationData() };
        } else if (statisticalContent === 'items') {
          return { OrderDate: date, items: this.generateItemData() };
        } else {
          return {
            OrderDate: date,
            TotalQuantity: this.getRandomNumber(0, 100).toString(),
            TotalSales: this.getRandomNumber(0, 5000).toString(),
          };
        }
      }
    });
  },
};

module.exports = dataUtils;
