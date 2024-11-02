// db/tables/TableOperationsLogTable.js
module.exports = `
  CREATE TABLE IF NOT EXISTS TableOperationsLog (
    Id BIGINT AUTO_INCREMENT PRIMARY KEY,
    TableName VARCHAR(64) NOT NULL,
    Operation ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    OperationTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    User VARCHAR(64) DEFAULT NULL,
    RecordId VARCHAR(255) DEFAULT NULL,
    BeforeValue TEXT,
    AfterValue TEXT
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
