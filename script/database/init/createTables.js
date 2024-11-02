// database/init/createTables.js
const { createTable } = require('../dbTableManagement');
const tableDefinitions = require('../data/tableDefinitions');

async function createTables() {
  for (const [tableName, tableDefinition] of Object.entries(tableDefinitions)) {
    await createTable(tableName, tableDefinition);
    console.log(`表格 ${tableName} 建立完成`);
  }
}

module.exports = createTables;
