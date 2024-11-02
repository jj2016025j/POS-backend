// db/tables/MainOrdersTable.js
module.exports = `
  CREATE TABLE IF NOT EXISTS MainOrders (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    MainOrderId VARCHAR(255) NOT NULL,
    SubTotal INT DEFAULT 0,
    ServiceFee INT DEFAULT 0,
    Total INT DEFAULT 0,
    TableId INT NOT NULL,
    OrderStatus ENUM('未結帳', '已結帳', '已取消') NOT NULL DEFAULT '未結帳',
    CreateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UserId INT,
    FOREIGN KEY (TableId) REFERENCES Tables(Id)
  );
`;
