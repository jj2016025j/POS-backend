const dataUtils = require('./dataUtils');
const fileUtils = require('./fileUtils');
const reportUtils = require('./reportUtils');
const orderUtils = require('./orderUtils');
const ipUtils = require('./ipUtils');
const printUtils = require('./printUtils');
const randomUtils = require('./randomUtils');
const timeUtils = require('./timeUtils');
const sqlErrorHandler = require('./sqlErrorHandler');  // 新增

module.exports = {
  ...dataUtils,
  ...fileUtils,
  ...reportUtils,
  ...orderUtils,
  ...ipUtils,
  ...printUtils,
  ...randomUtils,
  ...timeUtils,
  sqlErrorHandler,  // 導出 sqlErrorHandler 函數
};
