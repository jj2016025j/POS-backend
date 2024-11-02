// db/tables/SubOrdersTable.js
module.exports = `
  CREATE TABLE IF NOT EXISTS SubOrders (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    SubOrderId VARCHAR(255) NOT NULL,
    MainOrderId VARCHAR(255) NOT NULL,
    SubTotal INT DEFAULT 0,
    TableId INT NOT NULL,
    OrderStatus ENUM('未製作', '製作中', '已完成', '已取消') NOT NULL DEFAULT '未製作',
    CreateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;
